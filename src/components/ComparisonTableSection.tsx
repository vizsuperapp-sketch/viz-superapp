import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { X, Check } from "lucide-react";

const rows = [
  { label: "Comissão", old: "5% + IVA", viz: "0%" },
  { label: "Controlo", old: "No agente", viz: "No proprietário" },
  { label: "Transparência", old: "Custos ocultos", viz: "Tudo visível" },
  { label: "Apoio", old: "Variável", viz: "IA + profissionais" },
];

const ComparisonTableSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 px-6 relative" ref={sectionRef}>
      <div className="container max-w-3xl">
        <h2
          className="reveal text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight"
          style={{ textWrap: "balance" as any }}
        >
          Compare e{" "}
          <span className="text-gradient">decida.</span>
        </h2>
        <p
          className="reveal text-muted-foreground text-center text-sm mb-14 max-w-md mx-auto"
          style={{ transitionDelay: "80ms" }}
        >
          O modelo tradicional vs. a VIZ — lado a lado.
        </p>

        <div className="reveal rounded-3xl overflow-hidden liquid-glass" style={{ transitionDelay: "160ms" }}>
          {/* Header */}
          <div className="grid grid-cols-3">
            <div className="p-5" />
            <div
              className="p-5 text-center border-l border-border/40"
              style={{ background: "hsla(220, 15%, 94%, 0.4)" }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/60">
                Tradicional
              </p>
            </div>
            <div
              className="p-5 text-center border-l relative overflow-hidden"
              style={{
                borderColor: "hsla(163, 43%, 55%, 0.2)",
                background: "linear-gradient(180deg, hsla(163, 43%, 55%, 0.08) 0%, hsla(211, 100%, 65%, 0.04) 100%)",
              }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-primary">
                VIZ
              </p>
            </div>
          </div>

          {/* Rows */}
          {rows.map(({ label, old, viz }, i) => (
            <div
              key={label}
              className="reveal grid grid-cols-3 border-t border-border/30 group transition-colors duration-300 hover:bg-accent/30"
              style={{ transitionDelay: `${(i + 2) * 100}ms` }}
            >
              <div className="p-5 flex items-center">
                <span className="text-sm font-semibold text-foreground">{label}</span>
              </div>
              <div
                className="p-5 flex items-center justify-center gap-2 border-l border-border/40"
                style={{ background: "hsla(220, 15%, 94%, 0.25)" }}
              >
                <X size={14} className="shrink-0 text-destructive/40" />
                <span className="text-sm text-muted-foreground/60">
                  {old}
                </span>
              </div>
              <div
                className="p-5 flex items-center justify-center gap-2 border-l relative overflow-hidden transition-all duration-300 group-hover:shadow-[inset_0_0_30px_hsla(163,43%,55%,0.06)]"
                style={{
                  borderColor: "hsla(163, 43%, 55%, 0.15)",
                  background: "linear-gradient(180deg, hsla(163, 43%, 55%, 0.05) 0%, transparent 100%)",
                }}
              >
                <Check size={14} className="shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{viz}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonTableSection;
