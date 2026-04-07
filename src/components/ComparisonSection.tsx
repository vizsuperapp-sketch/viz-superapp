import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { X, Check, Sparkles } from "lucide-react";

const pastItems = [
  "Comissões de 5% + IVA sobre o valor da venda",
  "Processo opaco e sem controlo",
  "Dependência total do agente",
];

const futureItems = [
  "Zero comissões — o dinheiro é seu",
  "Cada passo visível e verificável",
  "Você decide, nós guiamos",
];

const ComparisonSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 px-6 relative" ref={sectionRef}>
      <div className="container max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* LEFT — The Past */}
          <div
            className="reveal rounded-3xl p-8 md:p-10 relative overflow-hidden"
            style={{
              background: "hsla(220, 15%, 94%, 0.6)",
              border: "1px solid hsla(220, 15%, 88%, 0.5)",
              filter: "saturate(0.3)",
            }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/50 mb-4">
              Modelo tradicional
            </p>
            <div className="space-y-4">
              {pastItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-muted-foreground/40"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <X size={18} className="mt-0.5 shrink-0 text-destructive/30" />
                  <span className="text-sm line-through decoration-muted-foreground/20">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — VIZ */}
          <div
            className="reveal rounded-3xl p-8 md:p-10 relative overflow-hidden"
            style={{ transitionDelay: "120ms" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, hsla(163, 43%, 55%, 0.08) 0%, transparent 70%)",
              }}
            />
            <div className="liquid-glass-strong rounded-3xl absolute inset-0" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-primary" />
                <p className="text-xs font-semibold tracking-widest uppercase text-primary">
                  Com a VIZ
                </p>
              </div>
              <div className="space-y-4">
                {futureItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3"
                    style={{ transitionDelay: `${(i + 3) * 80}ms` }}
                  >
                    <Check size={18} className="mt-0.5 shrink-0 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
