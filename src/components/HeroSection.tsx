import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";
import InteractiveCube from "@/components/InteractiveCube";
import LeadFormModal from "@/components/LeadFormModal";

const HeroSection = () => {
  const [formOpen, setFormOpen] = useState(false);

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Ambient background — lavender/blue tint like reference image */}
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

      {/* Disruptive headline — BEFORE the cube */}
      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-[1.05] tracking-tight max-w-2xl mb-2 opacity-0 animate-fade-up"
        style={{ animationDelay: "100ms", textWrap: "balance" }}
      >
        Erro no sistema imobiliário.
      </h1>

      <p
        className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-8 opacity-0 animate-fade-up text-gradient"
        style={{ animationDelay: "200ms" }}
      >
        O jogo mudou.
      </p>

      {/* CUBE — the product, large and dominant */}
      <div
        className="relative mb-8 opacity-0 animate-fade-up"
        style={{ animationDelay: "300ms" }}
      >
        <InteractiveCube />
      </div>

      {/* CTA buttons */}
      <div
        className="flex flex-col sm:flex-row items-center gap-3 mb-5 opacity-0 animate-fade-up"
        style={{ animationDelay: "450ms" }}
      >
        <Button variant="hero" size="xl" onClick={() => setFormOpen(true)}>
          Começar agora
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

      {/* Trust signal */}
      <p
        className="text-xs tracking-widest uppercase text-muted-foreground/50 opacity-0 animate-fade-up"
        style={{ animationDelay: "550ms" }}
      >
        Zero intermediários · Zero comissões
      </p>

      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default HeroSection;
