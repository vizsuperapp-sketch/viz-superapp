import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { withRetry, friendlyError } from "@/lib/retry";

interface LeadFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const services = [
  { value: "comprar", label: "Comprar" },
  { value: "vender", label: "Vender" },
  { value: "arrendar", label: "Arrendar" },
  { value: "financiar", label: "Financiar" },
  { value: "servicos", label: "Serviços" },
  { value: "gerir", label: "Gerir" },
];

const LeadFormModal = ({ open, onOpenChange }: LeadFormModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await withRetry(async () => {
        const { data, error: invokeError } = await supabase.functions.invoke("submit-lead", {
          body: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            service: form.service,
            message: form.message,
          },
        });
        if (invokeError) throw new Error(invokeError.message);
        if (data?.error) throw new Error(data.error);
        return data;
      }, { retries: 2 });
      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Lead submission failed:", err);
      setError(friendlyError(err, "Não foi possível enviar o pedido. Tenta novamente em instantes."));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      setTimeout(() => {
        setSubmitted(false);
        setError(null);
        setForm({ name: "", phone: "", email: "", service: "", message: "" });
      }, 300);
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-2xl border-border/50 shadow-xl">
        {submitted ? (
          <div className="flex flex-col items-center py-8 gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 size={28} className="text-primary" />
            </div>
            <DialogTitle className="text-xl font-semibold">Pedido recebido</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm max-w-xs">
              Recebemos o seu pedido. A VIZ vai guiá-lo na próxima etapa.
            </DialogDescription>
            <Button variant="outline" className="mt-2 rounded-xl" onClick={() => handleClose(false)}>
              Fechar
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Comece a sua jornada</DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">
                Preencha os dados e entraremos em contacto.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 mt-2">
              <Input
                placeholder="Nome completo"
                required
                className="rounded-xl h-11"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                placeholder="Telefone"
                type="tel"
                required
                className="rounded-xl h-11"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                placeholder="Email"
                type="email"
                required
                className="rounded-xl h-11"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Select
                value={form.service}
                onValueChange={(v) => setForm({ ...form, service: v })}
                required
              >
                <SelectTrigger className="rounded-xl h-11">
                  <SelectValue placeholder="Tipo de serviço" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Mensagem (opcional)"
                className="rounded-xl resize-none"
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-xl px-3 py-2">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" variant="hero" size="lg" className="w-full rounded-xl mt-1" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    A enviar...
                  </>
                ) : (
                  "Continuar"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormModal;
