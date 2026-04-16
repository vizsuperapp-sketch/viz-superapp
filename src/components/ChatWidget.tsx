import { useState, useCallback } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { properties } from "@/data/properties";
import ChatPreForm, { type ChatLead } from "@/components/chat/ChatPreForm";
import ChatMessages, { type Msg } from "@/components/chat/ChatMessages";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

// 🏠 FUNÇÕES PARA BUSCAR IMÓVEIS
function searchProperties(query: string) {
  const q = query.toLowerCase();
  return properties.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.typology.toLowerCase().includes(q),
  );
}

function getPropertyMessage(userMessage: string): string | null {
  const lower = userMessage.toLowerCase();

  // Pergunta sobre Machado Santos
  if (lower.includes("machado") || (lower.includes("montijo") && !lower.includes("horizon"))) {
    const prop = properties[0]; // Machado Santos
    return `📍 **${prop.name}** - ${prop.region}\n\n💰 Preço: ${prop.priceRange}\n📏 Área: ${prop.areaRange}\n🏠 Tipo: ${prop.typology}\n📅 Conclusão: ${prop.completion}\n\n${prop.description}\n\n🖼️ Tenho ${prop.images.length} fotos para mostrar! Quer ver?`;
  }

  // Pergunta sobre Horizon
  if (lower.includes("horizon") || (lower.includes("lourinhã") && !lower.includes("machado"))) {
    const prop = properties[1]; // Horizon
    return `📍 **${prop.name}** - ${prop.region}\n\n💰 Preço: ${prop.priceRange}\n📏 Área: ${prop.areaRange}\n🏠 Tipo: ${prop.typology}\n📅 Conclusão: ${prop.completion}\n\n✨ Destaques:\n${prop.highlights?.map((h) => `• ${h}`).join("\n")}\n\n${prop.description}\n\n🖼️ Tenho ${prop.images.length} fotos fantásticas para mostrar!`;
  }

  // Pergunta sobre Lisboa
  if (lower.includes("lisboa")) {
    return `Em Lisboa, temos o **Horizon** na Lourinhã! 🏖️\n\n💰 €1.450.000 - €2.300.000\n🏠 T3 - T4\n📏 283m² - 501m²\n\nMoradias exclusivas junto à Praia da Peralta com piscina privativa!\n\nQuer mais detalhes?`;
  }

  // Pergunta sobre preços
  if (lower.includes("preço") || lower.includes("quanto") || lower.includes("custa")) {
    return `Tenho imóveis em 2 gamas de preço:\n\n💰 **Machado Santos** - €285.000 - €395.000\n💰 **Horizon** - €1.450.000 - €2.300.000\n\nQual faixa de preço te interessa?`;
  }

  // Pergunta sobre T0, T1, T2, T3, T4
  if (
    lower.includes("t0") ||
    lower.includes("t1") ||
    lower.includes("t2") ||
    lower.includes("t3") ||
    lower.includes("t4")
  ) {
    const result = searchProperties(lower);
    if (result.length > 0) {
      return `Encontrei imóveis desse tipo:\n\n${result.map((p) => `• **${p.name}** (${p.region}) - ${p.typology}\n  Preço: ${p.priceRange}`).join("\n")}\n\nQual te interessa saber mais?`;
    }
  }

  // Pergunta geral sobre imóveis
  if (
    lower.includes("imóvel") ||
    lower.includes("casa") ||
    lower.includes("apartamento") ||
    lower.includes("moradia") ||
    lower.includes("propriedade")
  ) {
    return `Temos 2 empreendimentos fantásticos:\n\n🏢 **Machado Santos** (Montijo) - €285k-€395k\n   Apartamentos T0-T2, conclusão 2027\n\n🏖️ **Horizon** (Lourinhã) - €1.45M-€2.3M\n   Moradias T3-T4 junto à praia\n\nQual te interessa? 🔍`;
  }

  return null;
}

async function streamChat({
  messages,
  sessionId,
  name,
  interest,
  onDelta,
}: {
  messages: Msg[];
  sessionId: string;
  name: string;
  interest: string;
  onDelta: (t: string) => void;
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages, session_id: sessionId, name, interest }),
      signal: controller.signal,
    });

    if (resp.status === 429) throw new Error("Demasiados pedidos. Aguarda um momento.");
    if (resp.status === 402) throw new Error("Serviço temporariamente indisponível.");
    if (!resp.ok || !resp.body) throw new Error("Erro ao contactar o assistente.");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";

    while (true) {
      const { done: rd, value } = await reader.read();
      if (rd) break;
      buf += decoder.decode(value, { stream: true });

      let idx: number;
      while ((idx = buf.indexOf("\n")) !== -1) {
        let line = buf.slice(0, idx);
        buf = buf.slice(idx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") return;
        try {
          const p = JSON.parse(json);
          const c = p.choices?.[0]?.delta?.content as string | undefined;
          if (c) onDelta(c);
        } catch {
          buf = line + "\n" + buf;
          break;
        }
      }
    }

    for (let raw of buf.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (!raw.startsWith("data: ")) continue;
      const json = raw.slice(6).trim();
      if (json === "[DONE]") continue;
      try {
        const p = JSON.parse(json);
        const c = p.choices?.[0]?.delta?.content as string | undefined;
        if (c) onDelta(c);
      } catch {
        /* skip */
      }
    }
  } finally {
    clearTimeout(timeout);
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [lead, setLead] = useState<ChatLead | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const saveMessage = async (sid: string, role: string, content: string) => {
    await supabase.from("chat_messages").insert({ session_id: sid, role, content });
  };

  const handleFormSubmit = async (data: ChatLead) => {
    setFormLoading(true);
    try {
      const newId = crypto.randomUUID();
      const { error } = await supabase
        .from("chat_sessions")
        .insert({ id: newId, name: data.name, email: data.email, phone: data.phone, interest: data.interest });

      if (error) throw error;

      setSessionId(newId);
      setLead(data);

      // ✨ MENSAGEM DE BOAS-VINDAS COM IMÓVEIS
      const welcome: Msg = {
        role: "assistant",
        content: `Olá ${data.name}! 👋 Bem-vindo à VIZ!\n\nTenho 2 empreendimentos incríveis para te mostrar:\n\n🏢 **Machado Santos** (Montijo) - €285k-€395k\n   Apartamentos modernos, conclusão 1º Semestre 2027\n\n🏖️ **Horizon** (Lourinhã) - €1.45M-€2.3M\n   Moradias exclusivas junto à Praia da Peralta\n\nPergunta-me sobre qualquer um deles! "Quero saber sobre Machado", "Mostra Horizon", etc. 🔍`,
      };
      setMessages([welcome]);
      await saveMessage(newId, "assistant", welcome.content);
    } catch {
      console.error("Failed to create chat session");
    } finally {
      setFormLoading(false);
    }
  };

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading || !sessionId || !lead) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    await saveMessage(sessionId, "user", text);

    // 🔍 VERIFICA SE É PERGUNTA SOBRE IMÓVEIS
    const propertyAnswer = getPropertyMessage(text);
    if (propertyAnswer) {
      const botReply: Msg = { role: "assistant", content: propertyAnswer };
      setMessages((prev) => [...prev, botReply]);
      await saveMessage(sessionId, "assistant", propertyAnswer);
      setLoading(false);
      return;
    }

    // Se não for sobre imóveis, usa a IA normal
    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        sessionId,
        name: lead.name,
        interest: lead.interest,
        onDelta: upsert,
      });
    } catch (err) {
      const errMsg =
        err instanceof Error && err.name === "AbortError"
          ? "A resposta demorou demasiado. Tenta novamente."
          : err instanceof Error
            ? err.message
            : "Ocorreu um erro. Tenta novamente.";

      if (!assistantSoFar) {
        setMessages((prev) => [...prev, { role: "assistant", content: errMsg }]);
        assistantSoFar = errMsg;
      }
    } finally {
      setLoading(false);
      if (assistantSoFar) {
        await saveMessage(sessionId, "assistant", assistantSoFar);
      }
    }
  }, [input, loading, messages, sessionId, lead]);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-viz text-white shadow-lg shadow-primary/25 transition-transform hover:scale-105 active:scale-95"
          aria-label="Abrir chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[370px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          <div className="flex items-center justify-between bg-gradient-viz px-4 py-3 text-white">
            <span className="font-semibold text-sm">Assistente VIZ</span>
            <button onClick={() => setOpen(false)} aria-label="Fechar chat">
              <X className="h-5 w-5" />
            </button>
          </div>

          {!sessionId ? (
            <ChatPreForm onSubmit={handleFormSubmit} loading={formLoading} />
          ) : (
            <>
              <ChatMessages messages={messages} loading={loading} />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-center gap-2 border-t border-border px-3 py-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escreve a tua pergunta..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  disabled={loading || !input.trim()}
                  className="h-8 w-8 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
