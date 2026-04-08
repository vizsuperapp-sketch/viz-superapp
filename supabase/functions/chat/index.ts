import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Tu és o assistente virtual da VIZ — o SuperApp Imobiliário português. Responde sempre em português de Portugal, com tom profissional mas acessível.

Aqui está o que sabes sobre a VIZ:

**O que é a VIZ:**
- É um SuperApp imobiliário que liga diretamente compradores e vendedores de imóveis em Portugal.
- NÃO é uma imobiliária tradicional nem uma agência. É uma plataforma tecnológica.
- Elimina intermediários e comissões — zero comissões para o utilizador.

**Como funciona:**
- Vendedores publicam os seus imóveis diretamente na plataforma.
- Compradores pesquisam e contactam diretamente os proprietários.
- A VIZ fornece ferramentas digitais para todo o processo: publicação de anúncios, gestão de visitas, documentação e financiamento.

**Serviços disponíveis:**
- Comprar imóvel
- Vender imóvel
- Arrendar imóvel
- Financiamento / crédito habitação
- Gestão de imóveis
- Serviços complementares (avaliações, documentação, etc.)

**Vantagens:**
- Sem comissões — o utilizador poupa milhares de euros
- Processo 100% digital e transparente
- Controlo total do proprietário sobre o processo de venda
- Ferramentas inteligentes com IA para otimizar anúncios

**Regras de comportamento:**
- Se não souberes a resposta, sugere ao utilizador que preencha o formulário de contacto no site ou ligue para a equipa VIZ.
- Não inventes informações sobre preços, imóveis específicos ou dados que não tens.
- Sê conciso nas respostas. Usa parágrafos curtos e listas quando fizer sentido.
- Se o utilizador perguntar algo fora do contexto imobiliário, redireciona educadamente para temas relacionados com a VIZ.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Mensagens em falta." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-20), // keep last 20 messages for context window
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
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
