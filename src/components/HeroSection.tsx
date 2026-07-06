import { useState, useEffect, lazy, Suspense } from "react";
import vizLogoCube from "@/assets/viz-logo-cube.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Lock, Users, FileBadge, Camera, FileText, Landmark, Building2, Wrench } from "lucide-react";
const InteractiveCube = lazy(() => import("@/components/InteractiveCube"));
import LeadFormModal from "@/components/LeadFormModal";
import { useAuth } from "@/contexts/AuthContext";
import { getVipCount } from "@/lib/vip-count";
import SocialProofBar from "@/components/SocialProofBar";

const HeroSection = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [vipCount, setVipCount] = useState<number>(247);
  useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    getVipCount().then((count) => {
      if (mounted) setVipCount(count);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const scrollToEcosystem = () => {
    document.getElementById("ecossistema")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProperties = () => {
    document.getElementById("imoveis-destaque")?.scrollIntoView({ behavior: "smooth" });
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

      {/* Main grid */}
      <div className="container max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-8 items-center relative z-10">
        {/* Left — Text */}
        <div className="flex flex-col items-start">
          {/* Logo pill — escondido em mobile (já existe no TopNav) */}
          <div
            className="hidden md:block mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <img src={vizLogoCube} alt="VIZ" className="w-12 h-12 object-contain" />
          </div>

          <h1
            className="font-bold leading-[1.05] tracking-tight mb-5 opacity-0 animate-fade-up text-[clamp(2.25rem,7vw,4.5rem)]"
            style={{ animationDelay: "100ms", textWrap: "balance" }}
          >
            SuperApp da casa.
            <br />
            Comprar ou vender, <span className="text-gradient">sem comissões.</span>
          </h1>

          <p
            className="text-base md:text-lg mb-8 opacity-0 animate-fade-up text-muted-foreground max-w-md"
            style={{ animationDelay: "200ms", textWrap: "balance" }}
          >
            A VIZ liga compradores e vendedores diretamente. Zero comissão. Sempre.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row items-start gap-3 mb-5 opacity-0 animate-fade-up"
            style={{ animationDelay: "350ms" }}
          >
            <Button
              variant="cyan"
              size="xl"
              onClick={() => navigate("/vender")}
            >
              Quero Vender
              <ArrowRight className="ml-1" />
            </Button>
            <Button
              variant="outline-white"
              size="xl"
              onClick={scrollToProperties}
            >
              Quero Comprar
              <ArrowRight className="ml-1" />
            </Button>
          </div>

          {/* VIP counter */}
          <div
            className="flex items-center gap-2 mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 border border-white/10">
              <Users size={14} className="text-cyan-300" />
            </div>
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{vipCount.toLocaleString("pt-PT")}</span> pessoas já na lista VIP
            </span>
          </div>

          {/* Social proof bar */}
          <SocialProofBar />

          {/* Service chips — link para Ecossistema */}
          <div
            className="flex flex-wrap gap-2 mt-8 mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "500ms" }}
          >
            {[
              { icon: FileBadge, label: "CEE" },
              { icon: Landmark, label: "Hipoteca" },
              { icon: FileText, label: "Documentos" },
              { icon: Camera, label: "Fotos 360°" },
              { icon: Building2, label: "Gestão renda" },
              { icon: Wrench, label: "Manutenção" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={scrollToEcosystem}
                className="glass-icon rounded-full px-3 py-1.5 flex items-center gap-1.5 text-[11px] font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                <Icon size={12} className="text-primary" />
                {label}
              </button>
            ))}
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
