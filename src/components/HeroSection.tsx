import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import InteractiveCube from "@/components/InteractiveCube";
import LeadFormModal from "@/components/LeadFormModal";

const HeroSection = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Soft ambient background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 60% 50% at 30% 25%, hsla(163, 30%, 90%, 0.5) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 70% 35%, hsla(211, 40%, 92%, 0.4) 0%, transparent 55%)
        `,
      }} />

      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-16 opacity-0 animate-fade-up" style={{ animationDelay: "0ms" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{
          background: "linear-gradient(135deg, hsl(163,43%,55%), hsl(211,100%,65%))",
        }}>
          <span className="text-xs font-bold text-white tracking-tight">VIZ</span>
        </div>
        <span className="text-lg font-bold tracking-tight text-foreground">VIZ</span>
      </div>

      {/* Cube */}
      <div className="relative mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "80ms" }}>
        {/* Wireframe house — very subtle */}
        <svg
          className="absolute pointer-events-none"
          viewBox="0 0 240 240"
          fill="none"
          stroke="hsl(211,40%,78%)"
          strokeWidth="0.5"
          style={{ width: "360px", height: "360px", top: "-55%", left: "-50%", opacity: 0.12 }}
        >
          <path d="M120 35 L195 78 L195 185 L45 185 L45 78 Z" />
          <path d="M120 35 L45 78" />
          <path d="M120 35 L195 78" />
          <path d="M45 185 L195 185" />
        </svg>

        <InteractiveCube />
      </div>

      {/* Headline */}
      <h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-[1.1] tracking-tight max-w-lg mb-4 opacity-0 animate-fade-up"
        style={{ animationDelay: "200ms", textWrap: "balance" }}
      >
        A sua casa.{" "}
        <span className="text-gradient">Um sistema.</span>
      </h1>

      {/* Subheadline */}
      <p
        className="text-base md:text-lg text-muted-foreground text-center max-w-md mb-10 opacity-0 animate-fade-up"
        style={{ animationDelay: "300ms", textWrap: "pretty" }}
      >
        Compre, financie, mude e gira — tudo num só lugar.
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
