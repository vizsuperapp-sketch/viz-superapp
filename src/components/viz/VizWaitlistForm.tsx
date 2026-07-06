import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  full_name: z.string().trim().min(2, "Nome demasiado curto").max(120),
  email: z.string().trim().email("Email inválido").max(200),
  phone: z
    .string()
    .trim()
    .min(6, "Telefone inválido")
    .max(40)
    .regex(/^[\d\s+()-]+$/, "Telefone inválido"),
  user_type: z.enum(["comprador", "vendedor", "investidor"]),
});

type UserType = z.infer<typeof schema>["user_type"];

const VizWaitlistForm = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    user_type: "" as UserType | "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Preenche todos os campos");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("waitlist").insert([parsed.data]);
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast.error("Este email já está na lista VIP.");
      } else {
        toast.error("Não conseguimos registar agora. Tenta de novo.");
      }
      return;
    }
    setDone(true);
    toast.success("Estás dentro!");
  };

  return (
    <section
      id="waitlist"
      className="py-20 md:py-28 relative scroll-mt-20"
    >
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-cyan mb-3">
            Lista VIP
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            Junta-te à{" "}
            <span className="bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-transparent">
              revolução imobiliária
            </span>
            .
          </h2>
        </div>

        <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10 shadow-[0_30px_80px_-30px_hsl(var(--brand-blue)/0.5)]">
          {done ? (
            <div className="text-center py-10">
              <div className="mx-auto h-16 w-16 rounded-full bg-brand-success/15 border border-brand-success/40 flex items-center justify-center mb-5">
                <CheckCircle2 className="h-8 w-8 text-brand-success" />
              </div>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                Estás dentro!
              </h3>
              <p className="mt-3 text-muted-foreground">
                Entraremos em contacto em 24h.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-foreground/90">Nome completo</Label>
                  <Input
                    id="full_name"
                    autoComplete="name"
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    placeholder="Ana Silva"
                    className="h-12 bg-white/5 border-white/10 focus-visible:border-brand-cyan text-foreground"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground/90">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ana@email.com"
                    className="h-12 bg-white/5 border-white/10 focus-visible:border-brand-cyan text-foreground"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground/90">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+351 912 345 678"
                    className="h-12 bg-white/5 border-white/10 focus-visible:border-brand-cyan text-foreground"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user_type" className="text-foreground/90">Sou</Label>
                  <Select
                    value={form.user_type}
                    onValueChange={(v) => setForm({ ...form, user_type: v as UserType })}
                  >
                    <SelectTrigger
                      id="user_type"
                      className="h-12 bg-white/5 border-white/10 text-foreground"
                    >
                      <SelectValue placeholder="Seleciona…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comprador">Comprador</SelectItem>
                      <SelectItem value="vendedor">Vendedor</SelectItem>
                      <SelectItem value="investidor">Investidor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-full text-base font-semibold bg-brand-cyan hover:bg-brand-cyan/90 text-[#001018] shadow-[0_20px_50px_-15px_hsl(var(--brand-cyan)/0.7)]"
              >
                {loading ? "A enviar…" : (
                  <>
                    Entrar na Lista VIP <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Ao registares, aceitas os nossos termos. Zero spam. Cancela quando quiseres.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default VizWaitlistForm;
