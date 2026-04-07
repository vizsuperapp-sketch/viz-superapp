import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ShieldCheck, Zap, ClipboardCheck, FileSignature, User, Home } from "lucide-react";

const steps = [
  {
    icon: ShieldCheck,
    title: "Anúncio verificado",
    description: "Dados reais, validados automaticamente",
    trust: "Verificado",
  },
  {
    icon: Zap,
    title: "Match direto",
    description: "Comprador e vendedor ligados sem intermediário",
    trust: "Sem comissão",
  },
  {
    icon: ClipboardCheck,
    title: "Checklist guiada",
    description: "Cada passo explicado, nada fica por fazer",
    trust: "Passo a passo",
  },
  {
    icon: FileSignature,
    title: "Escritura",
    description: "Fecho legal com apoio profissional incluído",
    trust: "Apoio legal",
  },
];

const HowItWorksSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="how-it-works" className="py-28 px-6 relative" ref={sectionRef}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, hsla(163, 30%, 92%, 0.3) 0%, transparent 60%)",
        }}
      />

      <div className="container max-w-5xl relative">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3 text-center reveal">
          Como funciona
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-6 tracking-tight reveal"
          style={{ textWrap: "balance" as any }}
        >
          Do anúncio à escritura.{" "}
          <span className="text-gradient">4 passos simples.</span>
        </h2>
        <p
          className="reveal text-muted-foreground text-center text-sm mb-16 max-w-lg mx-auto"
          style={{ transitionDelay: "80ms" }}
        >
          Um processo claro e guiado, desenhado para que nunca se sinta perdido.
        </p>

        {/* Flow */}
        <div className="reveal relative" style={{ transitionDelay: "160ms" }}>
          {/* Endpoints */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-9 h-9 rounded-full glass-icon flex items-center justify-center">
                <Home size={16} strokeWidth={1.4} className="text-primary" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest">Vendedor</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs font-semibold uppercase tracking-widest">Comprador</span>
              <div className="w-9 h-9 rounded-full glass-icon flex items-center justify-center">
                <User size={16} strokeWidth={1.4} className="text-primary" />
              </div>
            </div>
          </div>

          {/* Connection line (desktop) */}
          <div className="hidden md:block absolute top-[calc(50%+16px)] left-[40px] right-[40px] h-[2px] z-0">
            <div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, hsla(163, 43%, 55%, 0.15) 0%, hsla(163, 43%, 55%, 0.4) 30%, hsla(211, 100%, 65%, 0.4) 70%, hsla(211, 100%, 65%, 0.15) 100%)",
              }}
            />
            <div
              className="absolute top-[-2px] h-[6px] w-[60px] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsla(163, 43%, 55%, 0.6), hsla(211, 100%, 65%, 0.6), transparent)",
                animation: "flow-pulse 3s ease-in-out infinite",
              }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 relative z-10">
            {steps.map(({ icon: Icon, title, description, trust }, i) => (
              <div
                key={title}
                className="reveal group"
                style={{ transitionDelay: `${(i + 2) * 120}ms` }}
              >
                <div
                  className="glass-card rounded-2xl p-6 text-center relative overflow-hidden transition-all duration-500 group-hover:scale-[1.03]"
                  style={{
                    boxShadow: "0 4px 20px var(--glow-primary), 0 1px 3px hsla(0,0%,0%,0.03)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 30%, hsla(163, 43%, 55%, 0.1) 0%, transparent 60%)",
                    }}
                  />

                  <div className="relative z-10">
                    <span className="text-gradient text-[10px] font-bold tracking-[0.2em] uppercase block mb-3">
                      Passo {i + 1}
                    </span>

                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 glass-icon group-hover:shadow-[0_4px_16px_hsla(163,43%,55%,0.15)] transition-shadow duration-500">
                      <Icon size={22} strokeWidth={1.3} className="text-primary" />
                    </div>

                    <h3 className="text-sm font-semibold mb-1">{title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3">{description}</p>

                    {/* Trust micro-badge */}
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary/70 bg-primary/5 rounded-full px-2.5 py-0.5">
                      <ShieldCheck size={10} />
                      {trust}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile connection line */}
          <div className="md:hidden absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] z-0">
            <div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, hsla(163, 43%, 55%, 0.15) 0%, hsla(163, 43%, 55%, 0.3) 50%, hsla(211, 100%, 65%, 0.15) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flow-pulse {
          0% { left: -60px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: calc(100% + 60px); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorksSection;
