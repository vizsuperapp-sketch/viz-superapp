import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle } from "lucide-react";

const INTEREST_OPTIONS = [
  "Comprar",
  "Vender",
  "Arrendar",
  "Financiamento",
  "Certificado Energético",
  "Destaque",
  "Outro",
];

export interface ChatLead {
  name: string;
  email: string;
  phone: string;
  interest: string;
}

interface ChatPreFormProps {
  onSubmit: (lead: ChatLead) => void;
  loading: boolean;
}

export default function ChatPreForm({ onSubmit, loading }: ChatPreFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");

  const valid = name.trim() && email.trim() && phone.trim() && interest;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      <div className="text-center space-y-2 pb-2">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <MessageCircle className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">Olá! 👋</h3>
        <p className="text-sm text-muted-foreground">
          Antes de começarmos, preenche os teus dados para te poder ajudar melhor.
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="chat-name" className="text-xs">Nome *</Label>
          <Input id="chat-name" placeholder="O teu nome" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="chat-phone" className="text-xs">Telefone *</Label>
          <Input id="chat-phone" type="tel" placeholder="912 345 678" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="chat-email" className="text-xs">Email *</Label>
          <Input id="chat-email" type="email" placeholder="email@exemplo.pt" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="chat-interest" className="text-xs">Interesse *</Label>
          <select
            id="chat-interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Seleciona uma opção</option>
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <Button
        className="w-full"
        disabled={!valid || loading}
        onClick={() => onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim(), interest })}
      >
        {loading ? "A iniciar..." : "Iniciar conversa"}
      </Button>

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
          <span className="bg-background px-2 text-muted-foreground">ou</span>
        </div>
      </div>

      <a
        href={`https://wa.me/351916021831?text=${encodeURIComponent("Olá VIZ! Gostaria de falar convosco.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#25D366" aria-hidden="true">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        Falar diretamente no WhatsApp
      </a>
    </div>
  );
}
