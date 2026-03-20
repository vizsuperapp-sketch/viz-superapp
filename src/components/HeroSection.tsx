import { Handshake, FileCheck, Package, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import InteractiveCube from "@/components/InteractiveCube";

const HeroSection = () => {
  const scrollToBenefits = () => {
    document.getElementById("beneficios")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Ambient background glow matching reference */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 60% at 30% 20%, hsla(280, 30%, 85%, 0.4) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 70% 30%, hsla(200, 60%, 88%, 0.5) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 50% 70%, hsla(163, 50%, 80%, 0.3) 0%, transparent 50%)
        `,
      }} />

      {/* Subtle sparkle dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20 animate-pulse"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Logo - mini cube */}
      <div className="flex items-center gap-2.5 mb-14 opacity-0 animate-fade-up" style={{ animationDelay: "0ms" }}>
        <div className="w-10 h-10 rounded-xl bg-gradient-viz flex items-center justify-center shadow-lg shadow-primary/20" style={{
          background: "linear-gradient(135deg, hsl(163,43%,55%), hsl(211,100%,65%))",
        }}>
          <span className="text-sm font-bold text-white tracking-tight">VIZ</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">VIZ</span>
      </div>

      {/* Interactive 3D Cube */}
      <div className="relative mb-10 opacity-0 animate-fade-up" style={{ animationDelay: "100ms" }}>
        {/* Wireframe house behind cube */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          viewBox="0 0 240 240"
          fill="none"
          stroke="hsl(211,60%,70%)"
          strokeWidth="0.7"
          style={{ transform: "scale(1.8)", top: "-40%", left: "-40%" }}
        >
          {/* House outline */}
          <path d="M120 30 L200 80 L200 190 L40 190 L40 80 Z" />
          <path d="M120 30 L40 80" />
          <path d="M120 30 L200 80" />
          {/* Roof peak */}
          <path d="M120 30 L120 10" opacity="0.3" />
          {/* Floor */}
          <path d="M40 190 L200 190" />
          {/* Internal lines */}
          <path d="M80 80 L80 190" opacity="0.15" />
          <path d="M160 80 L160 190" opacity="0.15" />
          <path d="M40 135 L200 135" opacity="0.15" />
        </svg>

        <InteractiveCube />
      </div>

      {/* Headline */}
      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-[1.08] tracking-tight max-w-2xl mb-5 opacity-0 animate-fade-up"
        style={{ animationDelay: "250ms", textWrap: "balance" }}
      >
        SuperApp para a jornada{" "}
        <span className="text-gradient">completa da casa</span>
      </h1>

      {/* Subheadline */}
      <p
        className="text-lg md:text-xl text-muted-foreground text-center max-w-xl mb-10 opacity-0 animate-fade-up"
        style={{ animationDelay: "350ms", textWrap: "pretty" }}
      >
        Um só app para comprar, financiar, mudar e cuidar da sua casa.
        <br className="hidden md:block" />
        Sem intermediários. Sem comissões.
      </p>

      {/* CTA */}
      <div className="opacity-0 animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Button variant="hero" size="xl" onClick={scrollToBenefits}>
          Começar agora
          <ChevronRight className="ml-1" />
        </Button>
      </div>

      {/* Mini feature pills */}
      <div
        className="flex flex-wrap justify-center gap-3 mt-16 opacity-0 animate-fade-up"
        style={{ animationDelay: "580ms" }}
      >
        {[
          { icon: Handshake, label: "Compra direta" },
          { icon: FileCheck, label: "Financiamento" },
          { icon: Package, label: "Mudança" },
          { icon: Wrench, label: "Gestão" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground"
          >
            <Icon size={16} className="text-primary" />
            {label}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
