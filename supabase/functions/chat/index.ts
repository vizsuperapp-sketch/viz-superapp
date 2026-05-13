import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Sanitize user-supplied text before injecting into LLM prompts.
// Strips control chars/newlines, removes obvious prompt-injection markers, and enforces length cap.
function sanitizePromptInput(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  let s = value
    // Remove control chars and excessive whitespace (incl. newlines)
    .replace(/[\u0000-\u001F\u007F]+/g, " ")
    // Neutralize role/system markers commonly used in injection
    .replace(/<\|.*?\|>/g, " ")
    .replace(/\b(system|assistant|developer)\s*:/gi, " ")
    .replace(/ignore\s+(all\s+)?previous\s+instructions?/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (s.length > maxLen) s = s.slice(0, maxLen);
  return s;
}

function buildSystemPrompt(name: string, interest: string) {
  return `Tu és o assistente virtual da VIZ — o SuperApp Imobiliário português.

PERSONALIDADE:
- Fala como um amigo que percebe bué de imobiliário. Informal, simpático, direto.
- Trata o utilizador por "tu". Usa emojis com moderação (1-2 por mensagem no máximo).
- Respostas CURTAS: 2-3 frases no máximo. Vai direto ao ponto.
- Faz UMA pergunta de cada vez, nunca várias.

CONTEXTO DO UTILIZADOR:
- Nome: ${name}
- Interesse principal: ${interest}

ÁRVORE DE QUALIFICAÇÃO (segue esta lógica na conversa):

Se o interesse é COMPRAR:
1. Pergunta que tipo de imóvel procura (apartamento, moradia, terreno...) e zona
2. Pergunta se já tem algum imóvel para vender → se sim, apresenta a plataforma de venda da VIZ ("Sabias que podes vender diretamente na VIZ sem pagar comissões? 🏠")
3. Pergunta se já tem financiamento bancário aprovado → se não, apresenta o serviço de financiamento ("A VIZ ajuda-te com o crédito habitação, sem complicações!")

Se o interesse é VENDER:
1. Pergunta detalhes do imóvel (tipo, zona, estado)
2. Pergunta se já tem certificado energético → se não, apresenta o serviço ("A VIZ trata do certificado energético por ti! Queres saber mais?")
3. Pergunta se precisa de ajuda com documentação (CPU, certidão permanente, etc.)
4. Sugere o destaque para o anúncio ficar mais visível

Se o interesse é ARRENDAR:
1. Pergunta se quer arrendar como proprietário ou inquilino
2. Apresenta as ferramentas da VIZ para gestão de arrendamento

Se o interesse é FINANCIAMENTO / CERTIFICADO ENERGÉTICO / DESTAQUE:
1. Dá info rápida sobre o serviço
2. Pergunta detalhes para personalizar a ajuda

EM QUALQUER CASO:
- Se o utilizador parece precisar de ajuda mais especializada, pergunta se quer falar com um consultor ou advogado ("Queres que te ponha em contacto com um dos nossos consultores? Sem compromisso! 💪")

O QUE A VIZ OFERECE:
- Compra/venda/arrendamento de imóveis sem comissões
- Processo 100% digital e transparente
- Financiamento / crédito habitação
- Certificados energéticos
- Destaques para anúncios
- Documentação (CPU, certidão permanente, etc.)
- Consultoria e apoio jurídico

REGRAS:
- NÃO inventes preços, imóveis específicos ou dados que não tens.
- Se não souberes algo, sugere preencher o formulário de contacto ou ligar para a equipa VIZ.
- Nunca faças blocos longos de texto. Sê conciso.
- Responde SEMPRE em português de Portugal.`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const raw = await req.json();
    const messages = Array.isArray(raw?.messages) ? raw.messages : [];
    const session_id = typeof raw?.session_id === "string" ? raw.session_id : "";
    const name = sanitizePromptInput(raw?.name, 100);
    const interest = sanitizePromptInput(raw?.interest, 80);

    // Validate session_id is a UUID
    const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!session_id || !uuidRe.test(session_id) || !name || !interest) {
      return new Response(
        JSON.stringify({ error: "Dados da sessão em falta." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize message contents — tighter cap to limit per-request cost
    const safeMessages = messages
      .filter((m: any) => m && (m.role === "user" || m.role === "assistant"))
      .map((m: any) => ({
        role: m.role,
        content: sanitizePromptInput(m.content, 1000),
      }))
      .filter((m: any) => m.content.length > 0)
      .slice(-20);

    if (safeMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Mensagens em falta." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Bind requests to a real pre-form session and cap per-session usage
    // to prevent anonymous cost abuse on the AI gateway.
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: sessionRow, error: sessionErr } = await supabaseAdmin
      .from("chat_sessions")
      .select("id, created_at")
      .eq("id", session_id)
      .maybeSingle();

    if (sessionErr || !sessionRow) {
      return new Response(
        JSON.stringify({ error: "Sessão inválida." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Reject sessions older than 24h to bound long-lived abuse
    const sessionAgeMs = Date.now() - new Date(sessionRow.created_at).getTime();
    if (sessionAgeMs > 24 * 60 * 60 * 1000) {
      return new Response(
        JSON.stringify({ error: "Sessão expirada. Inicia uma nova conversa." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Cap total messages per session to prevent unbounded credit drain
    const { count: msgCount } = await supabaseAdmin
      .from("chat_messages")
      .select("id", { count: "exact", head: true })
      .eq("session_id", session_id);

    const MAX_MESSAGES_PER_SESSION = 60;
    if ((msgCount ?? 0) >= MAX_MESSAGES_PER_SESSION) {
      return new Response(
        JSON.stringify({ error: "Limite de mensagens atingido para esta sessão." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }


    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: buildSystemPrompt(name, interest) },
          ...safeMessages.slice(-20),
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Demasiados pedidos. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Serviço temporariamente indisponível." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Erro no serviço de IA." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: "Erro interno. Tente novamente." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
