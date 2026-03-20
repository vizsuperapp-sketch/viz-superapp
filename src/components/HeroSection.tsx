import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import InteractiveCube from "@/components/InteractiveCube";
import LeadFormModal from "@/components/LeadFormModal";

const HeroSection = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Ambient glow — brand colors underneath */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 55% 45% at 35% 30%, hsla(163, 40%, 85%, 0.5) 0%, transparent 60%),
          radial-gradient(ellipse 45% 40% at 65% 40%, hsla(211, 50%, 88%, 0.45) 0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 50% 75%, hsla(163, 30%, 92%, 0.3) 0%, transparent 45%)
        `
      }} />

      {/* Logo — liquid glass pill */}
      <div
        className="flex items-center gap-2.5 mb-16 opacity-0 animate-fade-up liquid-glass-subtle rounded-full px-4 py-2"
        style={{ animationDelay: "0ms" }}>
        
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-viz">
          <span className="text-[10px] font-bold text-white tracking-tight">VIZ</span>
        </div>
        
      </div>

      {/* Cube */}
      <div className="relative mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "80ms" }}>
        {/* Wireframe house — very subtle */}
        <svg
          className="absolute pointer-events-none"
          viewBox="0 0 240 240"
          fill="none"
          stroke="hsl(211,35%,80%)"
          strokeWidth="0.4"
          style={{ width: "380px", height: "380px", top: "-58%", left: "-54%", opacity: 0.1 }}>
          
          <path d="M120 35 L195 78 L195 185 L45 185 L45 78 Z" />
          <path d="M120 35 L45 78" />
          <path d="M120 35 L195 78" />
          <path d="M45 185 L195 185" />
        </svg>

        <InteractiveCube />
      </div>

      {/* Headline */}
      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-[1.08] tracking-tight max-w-2xl mb-5 opacity-0 animate-fade-up"
        style={{ animationDelay: "200ms", textWrap: "balance" }}>
        
        SuperApp para a jornada{" "}
        <span className="text-gradient">completa da casa</span>
      </h1>

      {/* Subheadline */}
      <p
        className="text-lg md:text-xl text-muted-foreground text-center max-w-xl mb-10 opacity-0 animate-fade-up"
        style={{ animationDelay: "300ms", textWrap: "pretty" }}>
        
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
    </section>);

};

export default HeroSection;