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
import { CheckCircle2 } from "lucide-react";

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
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      setTimeout(() => {
        setSubmitted(false);
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
              <Button type="submit" variant="hero" size="lg" className="w-full rounded-xl mt-1">
                Continuar
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormModal;
