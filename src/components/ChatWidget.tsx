import { useState, useCallback } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import ChatPreForm, { type ChatLead } from "@/components/chat/ChatPreForm";
import ChatMessages, { type Msg } from "@/components/chat/ChatMessages";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

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

    // Process remaining buffer
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
      } catch { /* skip */ }
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

      const welcome: Msg = {
        role: "assistant",
        content: `Olá ${data.name}! 👋 Vi que tens interesse em **${data.interest.toLowerCase()}**. Em que posso ajudar-te?`,
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
      const errMsg = err instanceof Error && err.name === "AbortError"
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
                onSubmit={(e) => { e.preventDefault(); send(); }}
                className="flex items-center gap-2 border-t border-border px-3 py-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escreve a tua pergunta..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  disabled={loading}
                />
                <Button type="submit" size="icon" variant="ghost" disabled={loading || !input.trim()} className="h-8 w-8 shrink-0">
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
