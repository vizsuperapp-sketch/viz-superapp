// Server-side validated upload proxy.
// Sniffs magic bytes, enforces per-bucket allowlist and size limits,
// then uploads via service role. Client never talks to storage directly.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-bucket, x-path, x-upsert",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BUCKET_RULES: Record<string, { mimes: string[]; maxBytes: number }> = {
  documents: {
    mimes: ["application/pdf", "image/jpeg", "image/png"],
    maxBytes: 5 * 1024 * 1024,
  },
  "property-files": {
    mimes: ["application/pdf", "image/jpeg", "image/png", "image/webp"],
    maxBytes: 15 * 1024 * 1024,
  },
};

// Returns canonical mime by inspecting first bytes, or null if unknown/unsafe.
function sniffMime(bytes: Uint8Array): string | null {
  if (bytes.length < 4) return null;
  // PDF: 25 50 44 46
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) return "application/pdf";
  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a
  ) return "image/png";
  // WEBP: "RIFF"...."WEBP"
  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) return "image/webp";
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const jwt = authHeader.replace(/^Bearer\s+/i, "");
    if (!jwt) {
      return new Response(JSON.stringify({ error: "Missing auth token" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Validate user
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = userData.user.id;

    const bucket = req.headers.get("x-bucket") ?? "";
    const rawPath = req.headers.get("x-path") ?? "";
    let path = rawPath;
    try {
      // Client encodes x-path with encodeURIComponent to keep the header Latin-1 safe.
      path = decodeURIComponent(rawPath);
    } catch {
      /* keep raw */
    }
    const upsert = (req.headers.get("x-upsert") ?? "false") === "true";
    const rules = BUCKET_RULES[bucket];
    if (!rules) {
      return new Response(JSON.stringify({ error: "Invalid bucket" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!path || path.includes("..")) {
      return new Response(JSON.stringify({ error: "Invalid path" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    // Path must be scoped to the authenticated user
    if (!path.startsWith(`${userId}/`)) {
      return new Response(JSON.stringify({ error: "Path not allowed for this user" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const buf = new Uint8Array(await req.arrayBuffer());
    if (buf.byteLength === 0) {
      return new Response(JSON.stringify({ error: "Empty file" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (buf.byteLength > rules.maxBytes) {
      return new Response(JSON.stringify({ error: `File too large (max ${rules.maxBytes} bytes)` }), {
        status: 413, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sniffed = sniffMime(buf);
    if (!sniffed || !rules.mimes.includes(sniffed)) {
      return new Response(
        JSON.stringify({ error: "File type not allowed. Permitted: " + rules.mimes.join(", ") }),
        { status: 415, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
    const { error: upErr } = await admin.storage.from(bucket).upload(path, buf, {
      contentType: sniffed,
      upsert,
    });
    if (upErr) {
      return new Response(JSON.stringify({ error: upErr.message }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, path, contentType: sniffed }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("secure-upload error", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
