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
    </div>
  );
}
