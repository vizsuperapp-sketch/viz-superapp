import { Handshake, FileCheck, Package, Wrench } from "lucide-react";
import heroCube from "@/assets/hero-cube.png";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  const scrollToBenefits = () => {
    document.getElementById("beneficios")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 40%, hsla(163,43%,55%,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <div className="flex items-center gap-2 mb-16 opacity-0 animate-fade-up" style={{ animationDelay: "0ms" }}>
        <div className="w-9 h-9 rounded-lg bg-gradient-viz flex items-center justify-center">
          <span className="text-sm font-bold text-primary-foreground tracking-tight">V</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">VIZ</span>
      </div>

      {/* Hero image */}
      <div className="relative mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <div className="animate-breathe">
          <img
            src={heroCube}
            alt="VIZ - O core inteligente da sua casa"
            className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Headline */}
      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-[1.1] tracking-tight max-w-2xl mb-5 opacity-0 animate-fade-up"
        style={{ animationDelay: "200ms", textWrap: "balance" }}
      >
        A sua casa.{" "}
        <span className="text-gradient">Um sistema.</span>
      </h1>

      {/* Subheadline */}
      <p
        className="text-lg md:text-xl text-muted-foreground text-center max-w-xl mb-10 opacity-0 animate-fade-up"
        style={{ animationDelay: "300ms", textWrap: "pretty" }}
      >
        Compre, financie, mude e gira — tudo num só lugar.
        <br className="hidden md:block" />
        Sem intermediários. Sem comissões.
      </p>

      {/* CTA */}
      <div className="opacity-0 animate-fade-up" style={{ animationDelay: "400ms" }}>
        <Button variant="hero" size="xl" onClick={scrollToBenefits}>
          Começar agora
          <ChevronRight className="ml-1" />
        </Button>
      </div>

      {/* Mini feature pills */}
      <div
        className="flex flex-wrap justify-center gap-3 mt-16 opacity-0 animate-fade-up"
        style={{ animationDelay: "550ms" }}
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
