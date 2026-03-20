import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import InteractiveCube from "@/components/InteractiveCube";
import LeadFormModal from "@/components/LeadFormModal";

const HeroSection = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Animated ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[140%] h-[140%] -top-[20%] -left-[20%]"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 30% 25%, hsla(163, 40%, 82%, 0.5) 0%, transparent 60%),
              radial-gradient(ellipse 45% 35% at 70% 35%, hsla(211, 60%, 85%, 0.45) 0%, transparent 55%),
              radial-gradient(ellipse 35% 25% at 50% 70%, hsla(163, 30%, 90%, 0.3) 0%, transparent 45%)
            `,
            animation: "ambient-drift 25s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Logo pill */}
      <div
        className="flex items-center gap-2.5 mb-8 opacity-0 animate-fade-up liquid-glass-subtle rounded-full px-4 py-2"
        style={{ animationDelay: "0ms" }}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-viz">
          <span className="text-[10px] font-bold text-white tracking-tight">VIZ</span>
        </div>
      </div>

      {/* CUBE — the product, large and dominant */}
      <div
        className="relative mb-8 opacity-0 animate-fade-up"
        style={{ animationDelay: "80ms" }}
      >
        <InteractiveCube />
      </div>

      {/* Headline */}
      <h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-[1.08] tracking-tight max-w-xl mb-4 opacity-0 animate-fade-up"
        style={{ animationDelay: "200ms", textWrap: "balance" }}
      >
        SuperApp para a jornada{" "}
        <span className="text-gradient">completa da casa</span>
      </h1>

      {/* Subheadline */}
      <p
        className="text-base md:text-lg text-muted-foreground text-center max-w-md mb-8 opacity-0 animate-fade-up"
        style={{ animationDelay: "300ms", textWrap: "pretty" }}
      >
        Um só app para comprar, financiar, mudar e cuidar da sua casa.
        <br className="hidden md:block" />
        Sem intermediários. Sem comissões.
      </p>

      {/* CTA */}
      <div className="opacity-0 animate-fade-up" style={{ animationDelay: "400ms" }}>
        <Button variant="hero" size="xl" onClick={() => setFormOpen(true)}>
          Começar agora
          <ChevronRight className="ml-1" />
        </Button>
      </div>

      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default HeroSection;
