import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

interface ChatSession {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  created_at: string;
}

interface ChatMessage {
  id: string;
  role: string;
  content: string;
  created_at: string;
}

export default function AdminChatTab() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [msgsLoading, setMsgsLoading] = useState(false);

  useEffect(() => {
    supabase
      .from("chat_sessions")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setSessions(data ?? []);
        setLoading(false);
      });
  }, []);

  const openSession = async (s: ChatSession) => {
    setSelected(s);
    setMsgsLoading(true);
    const { data } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", s.id)
      .order("created_at", { ascending: true });
    setMessages(data ?? []);
    setMsgsLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (selected) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setSelected(null)}>
            <ArrowLeft size={16} />
          </Button>
          <div>
            <h3 className="font-semibold text-sm">{selected.name}</h3>
            <p className="text-xs text-muted-foreground">{selected.email} · {selected.phone}</p>
          </div>
          <Badge variant="secondary" className="ml-auto">{selected.interest}</Badge>
        </div>

        {msgsLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Sem mensagens nesta sessão.</p>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto rounded-xl border border-border bg-muted/30 p-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground border border-border"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                  <p className="text-[10px] mt-1 opacity-60">
                    {format(new Date(m.created_at), "HH:mm", { locale: pt })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12 space-y-2">
        <MessageCircle className="h-8 w-8 mx-auto text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Ainda não há sessões de chat.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left px-4 py-2 font-medium">Nome</th>
            <th className="text-left px-4 py-2 font-medium hidden sm:table-cell">Email</th>
            <th className="text-left px-4 py-2 font-medium hidden md:table-cell">Telefone</th>
            <th className="text-left px-4 py-2 font-medium">Interesse</th>
            <th className="text-left px-4 py-2 font-medium hidden sm:table-cell">Data</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr
              key={s.id}
              onClick={() => openSession(s)}
              className="border-t border-border hover:bg-muted/30 cursor-pointer transition-colors"
            >
              <td className="px-4 py-3 font-medium">{s.name}</td>
              <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{s.email}</td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{s.phone}</td>
              <td className="px-4 py-3">
                <Badge variant="outline" className="text-xs">{s.interest}</Badge>
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                {format(new Date(s.created_at), "dd MMM yyyy, HH:mm", { locale: pt })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
