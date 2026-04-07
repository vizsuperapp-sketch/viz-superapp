import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Play, ShieldCheck, Users, Lock } from "lucide-react";
import InteractiveCube from "@/components/InteractiveCube";
import LeadFormModal from "@/components/LeadFormModal";

const HeroSection = () => {
  const [formOpen, setFormOpen] = useState(false);

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[140%] h-[140%] -top-[20%] -left-[20%]"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 40%, hsla(163, 40%, 82%, 0.45) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 30% 60%, hsla(240, 30%, 92%, 0.5) 0%, transparent 50%),
              radial-gradient(ellipse 45% 35% at 70% 30%, hsla(211, 60%, 88%, 0.4) 0%, transparent 50%)
            `,
            animation: "ambient-drift 25s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Logo pill */}
      <div
        className="flex items-center gap-2.5 mb-6 opacity-0 animate-fade-up liquid-glass-subtle rounded-full px-4 py-2"
        style={{ animationDelay: "0ms" }}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-viz">
          <span className="text-[10px] font-bold text-primary-foreground tracking-tight">VIZ</span>
        </div>
      </div>

      {/* Headline — clear value, bold */}
      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-[1.05] tracking-tight max-w-2xl mb-3 opacity-0 animate-fade-up"
        style={{ animationDelay: "100ms", textWrap: "balance" }}
      >
        Venda a sua casa.
        <br />
        <span className="text-gradient">Sem pagar comissão.</span>
      </h1>

      <p
        className="text-base md:text-lg text-center mb-8 opacity-0 animate-fade-up text-muted-foreground max-w-md"
        style={{ animationDelay: "200ms", textWrap: "balance" }}
      >
        A plataforma que liga compradores e vendedores diretamente — com verificação, apoio legal e zero intermediários.
      </p>

      {/* CUBE */}
      <div
        className="relative mb-8 opacity-0 animate-fade-up"
        style={{ animationDelay: "300ms" }}
      >
        <InteractiveCube />
      </div>

      {/* CTA buttons */}
      <div
        className="flex flex-col sm:flex-row items-center gap-3 mb-6 opacity-0 animate-fade-up"
        style={{ animationDelay: "450ms" }}
      >
        <Button variant="hero" size="xl" onClick={() => setFormOpen(true)}>
          Começar gratuitamente
          <ChevronRight className="ml-1" />
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="text-muted-foreground hover:text-foreground gap-2"
          onClick={scrollToHowItWorks}
        >
          <Play size={16} className="text-primary" />
          Ver como funciona
        </Button>
      </div>

      {/* Trust micro-signals */}
      <div
        className="flex items-center gap-5 opacity-0 animate-fade-up"
        style={{ animationDelay: "550ms" }}
      >
        {[
          { icon: ShieldCheck, text: "Dados verificados" },
          { icon: Lock, text: "Processo seguro" },
          { icon: Users, text: "Apoio em cada passo" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-1.5">
            <Icon size={13} className="text-primary/60" />
            <span className="text-[11px] text-muted-foreground/60">{text}</span>
          </div>
        ))}
      </div>

      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default HeroSection;
