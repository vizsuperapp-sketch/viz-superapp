import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, CreditCard, HeadphonesIcon } from "lucide-react";
import LeadFormModal from "@/components/LeadFormModal";

const trustPoints = [
  { icon: CreditCard, text: "Sem custos escondidos" },
  { icon: ShieldCheck, text: "Dados protegidos" },
  { icon: HeadphonesIcon, text: "Apoio humano incluído" },
];

const FinalCTASection = () => {
  const sectionRef = useScrollReveal();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="py-32 px-6 relative" ref={sectionRef}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 50% at 50% 50%, hsla(211, 80%, 55%, 0.06) 0%, transparent 60%)",
      }} />
      <div className="container max-w-2xl text-center relative">
        <div className="rounded-3xl p-12 md:p-16 liquid-glass-strong">
          <h2
            className="reveal text-3xl md:text-4xl font-bold mb-5 tracking-tight"
            style={{ textWrap: "balance" }}
          >
            O futuro da transação imobiliária{" "}
            <span className="text-gradient">começa aqui.</span>
          </h2>
          <p className="reveal text-muted-foreground text-base mb-8" style={{ transitionDelay: "80ms" }}>
            Comece gratuitamente. Sem compromisso, sem cartão de crédito.
          </p>
          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-3 mb-8" style={{ transitionDelay: "160ms" }}>
            <Button variant="hero" size="xl" onClick={() => setFormOpen(true)}>
              Entrar na VIZ
              <ArrowRight className="ml-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 text-foreground hover:bg-primary/10"
              onClick={() => navigate("/vender")}
            >
              Vender o meu imóvel
            </Button>
          </div>

          <div className="reveal flex items-center justify-center gap-5 flex-wrap" style={{ transitionDelay: "240ms" }}>
            {trustPoints.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon size={13} className="text-primary/40" />
                <span className="text-[11px] text-muted-foreground/40">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default FinalCTASection;
