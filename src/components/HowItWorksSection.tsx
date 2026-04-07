import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Upload, Users, ShieldCheck, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Publica",
    description: "Crie o seu anúncio com dados verificados automaticamente.",
  },
  {
    icon: Users,
    title: "Conecta",
    description: "Comprador e vendedor ligados diretamente. Sem agente no meio.",
  },
  {
    icon: ShieldCheck,
    title: "Avança com confiança",
    description: "Checklist guiada, documentação validada, apoio legal incluído.",
  },
  {
    icon: FileCheck,
    title: "Conclui",
    description: "Escritura e fecho da transação com acompanhamento profissional.",
  },
];

const HowItWorksSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="how-it-works" className="py-28 px-6 relative" ref={sectionRef}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, hsla(163, 40%, 55%, 0.05) 0%, transparent 60%)",
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

        {/* Steps */}
        <div className="reveal relative" style={{ transitionDelay: "160ms" }}>
          {/* Connection line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[60px] right-[60px] h-[2px] -translate-y-1/2 z-0">
            <div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, hsla(163,43%,55%,0.1) 0%, hsla(211,80%,55%,0.2) 50%, hsla(211,80%,55%,0.1) 100%)",
              }}
            />
            <div
              className="absolute top-[-2px] h-[6px] w-[60px] rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, hsla(211,80%,55%,0.5), transparent)",
                animation: "flow-pulse 3s ease-in-out infinite",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 relative z-10">
            {steps.map(({ icon: Icon, title, description }, i) => (
              <div
                key={title}
                className="reveal group"
                style={{ transitionDelay: `${(i + 2) * 120}ms` }}
              >
                <div className="glass-card rounded-2xl p-6 text-center relative overflow-hidden transition-all duration-500 group-hover:scale-[1.03]">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 50% 30%, hsla(211,80%,55%,0.08) 0%, transparent 60%)",
                    }}
                  />
                  <div className="relative z-10">
                    <span className="text-gradient text-[10px] font-bold tracking-[0.2em] uppercase block mb-3">
                      Passo {i + 1}
                    </span>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 glass-icon group-hover:shadow-[0_4px_16px_hsla(211,80%,55%,0.12)] transition-shadow duration-500">
                      <Icon size={22} strokeWidth={1.3} className="text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold mb-1">{title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
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
                background: "linear-gradient(180deg, hsla(211,80%,55%,0.1) 0%, hsla(211,80%,55%,0.15) 50%, hsla(163,43%,55%,0.1) 100%)",
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
