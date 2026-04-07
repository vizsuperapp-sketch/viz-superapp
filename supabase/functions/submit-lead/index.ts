import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.49.4/cors";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+\d\s\-().]{7,20}$/;
const validServices = ["comprar", "vender", "arrendar", "financiar", "servicos", "gerir"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const service = typeof body.service === "string" ? body.service.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    const errors: Record<string, string> = {};

    if (!name || name.length > 200) {
      errors.name = "Nome é obrigatório (máx. 200 caracteres).";
    }
    if (!emailRegex.test(email) || email.length > 255) {
      errors.email = "Email inválido.";
    }
    if (!phoneRegex.test(phone)) {
      errors.phone = "Telefone inválido.";
    }
    if (!validServices.includes(service)) {
      errors.service = "Tipo de serviço inválido.";
    }
    if (message.length > 2000) {
      errors.message = "Mensagem demasiado longa (máx. 2000 caracteres).";
    }

    if (Object.keys(errors).length > 0) {
      return new Response(JSON.stringify({ error: "Dados inválidos.", fields: errors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: insertError } = await supabase.from("leads").insert({
      name,
      email,
      phone,
      user_type: service,
      goal: service,
      message: message || null,
    });

    if (insertError) {
      console.error("Insert error:", insertError.message);
      return new Response(JSON.stringify({ error: "Erro ao guardar. Tente novamente." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Pedido inválido." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
