import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export type Msg = { role: "user" | "assistant"; content: string };

interface ChatMessagesProps {
  messages: Msg[];
  loading: boolean;
  quickReplies?: string[];
  onQuickReply?: (text: string) => void;
}

export default function ChatMessages({ messages, loading, quickReplies, onQuickReply }: ChatMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const showQuickReplies =
    !loading &&
    quickReplies &&
    quickReplies.length > 0 &&
    messages[messages.length - 1]?.role === "assistant";

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
      {messages.map((m, i) => (
        <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
              m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
            }`}
          >
            {m.role === "assistant" ? (
              <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:mb-1 [&>ul]:mb-1">
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            ) : (
              m.content
            )}
          </div>
        </div>
      ))}

      {loading && messages[messages.length - 1]?.role === "user" && (
        <div className="flex justify-start" aria-label="O assistente está a escrever">
          <div className="rounded-xl bg-muted px-3 py-2 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" />
          </div>
        </div>
      )}

      {showQuickReplies && (
        <div className="flex flex-wrap gap-2 pt-1">
          {quickReplies!.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => onQuickReply?.(q)}
              className="text-xs rounded-full border border-border bg-background px-3 py-1.5 hover:bg-muted transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}
