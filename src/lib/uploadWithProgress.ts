import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

/**
 * Upload a file via the `secure-upload` edge function, which performs
 * server-side magic-byte validation and uses the service role to write
 * to storage. Reports real progress via XHR.
 */
export async function uploadWithProgress(
  bucket: string,
  path: string,
  file: File,
  onProgress: (pct: number) => void,
  opts: { upsert?: boolean } = {},
): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Sessão expirada. Faz login novamente.");

  const url = `${SUPABASE_URL}/functions/v1/secure-upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", `Bearer ${session.access_token}`);
    xhr.setRequestHeader("apikey", SUPABASE_PUBLISHABLE_KEY);
    xhr.setRequestHeader("x-bucket", bucket);
    // URL-encode to keep header ASCII-safe (HTTP headers are Latin-1 only) —
    // filenames may contain spaces/accents/emoji that would break setRequestHeader.
    xhr.setRequestHeader("x-path", encodeURIComponent(path));
    xhr.setRequestHeader("x-upsert", opts.upsert ? "true" : "false");
    xhr.setRequestHeader("Content-Type", "application/octet-stream");

    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable) {
        onProgress(Math.round((evt.loaded / evt.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);
        resolve();
      } else {
        let msg = `Upload falhou (${xhr.status})`;
        try {
          const body = JSON.parse(xhr.responseText);
          if (body?.error) msg = body.error;
        } catch {
          /* ignore */
        }
        reject(new Error(msg));
      }
    };

    xhr.onerror = () => reject(new Error("Erro de rede durante o upload."));
    xhr.ontimeout = () => reject(new Error("O upload demorou demasiado."));
    xhr.send(file);
  });
}
