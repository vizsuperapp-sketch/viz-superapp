import { useState, lazy, Suspense } from "react";
import vizLogoCube from "@/assets/viz-logo-cube.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Play, ShieldCheck, Lock, Users, UserCircle } from "lucide-react";
const InteractiveCube = lazy(() => import("@/components/InteractiveCube"));
import LeadFormModal from "@/components/LeadFormModal";
import { useAuth } from "@/contexts/AuthContext";

const HeroSection = () => {
  const [formOpen, setFormOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center px-6 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[140%] h-[140%] -top-[20%] -left-[20%]"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 30% 50%, hsla(211, 80%, 55%, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 40% 35% at 70% 40%, hsla(163, 40%, 55%, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 50% 80%, hsla(211, 60%, 45%, 0.06) 0%, transparent 50%)
            `,
            animation: "ambient-drift 25s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Top nav */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-border/50 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(user ? "/documentos" : "/auth")}
        >
          <UserCircle className="h-4 w-4 mr-2" />
          {user ? "Os meus documentos" : "Área de Cliente"}
        </Button>
      </div>

      {/* Main grid */}
      <div className="container max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-8 items-center relative z-10">
        {/* Left — Text */}
        <div className="flex flex-col items-start">
          {/* Logo pill */}
          <div
            className="mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <img src={vizLogoCube} alt="VIZ" className="w-12 h-12 object-contain" />
          </div>

          <h1
            className="text-5xl font-bold leading-[1.05] tracking-tight mb-5 opacity-0 animate-fade-up"
            style={{ animationDelay: "100ms", textWrap: "balance" }}
          >
            SuperApp da casa<br />
            Comprar ou vender , <span className="text-gradient">sem comissões.</span>
          </h1>

          <p
            className="text-base md:text-lg mb-3 opacity-0 animate-fade-up text-muted-foreground max-w-md"
            style={{ animationDelay: "200ms", textWrap: "balance" }}
          >
            A VIZ liga comprador e vendedor diretamente, com tecnologia, transparência e zero comissão.
          </p>

          <p
            className="text-sm mb-8 opacity-0 animate-fade-up max-w-md"
            style={{ animationDelay: "250ms", color: "hsl(var(--muted-foreground))", opacity: 0.7 }}
          >
            Não somos uma imobiliária. Somos a nova infraestrutura da transação imobiliária.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row items-start gap-3 mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "350ms" }}
          >
            <Button variant="hero" size="xl" onClick={() => setFormOpen(true)}>
              Começar agora
              <ChevronRight className="ml-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 text-foreground hover:bg-primary/10"
              onClick={() => navigate("/vender")}
            >
              Quero Vender
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
            style={{ animationDelay: "450ms" }}
          >
            {[
              { icon: ShieldCheck, text: "Dados verificados" },
              { icon: Lock, text: "Processo seguro" },
              { icon: Users, text: "Apoio em cada passo" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon size={13} className="text-primary/50" />
                <span className="text-[11px] text-muted-foreground/50">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Cube */}
        <div
          className="flex items-center justify-center opacity-0 animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <Suspense fallback={<img src={vizLogoCube} alt="Cubo VIZ" className="w-64 h-64 opacity-70" loading="lazy" decoding="async" />}>
            <InteractiveCube />
          </Suspense>
        </div>
      </div>

      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default HeroSection;
