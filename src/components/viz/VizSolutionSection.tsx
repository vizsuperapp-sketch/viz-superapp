import { X, Check } from "lucide-react";

const before = [
  "Agência cobra 5% + IVA",
  "Conflito de interesses",
  "Processo opaco",
  "€15.000 para o agente",
];

const after = [
  "Zero comissão. Sempre.",
  "Alinhamento total contigo",
  "Processo 100% digital",
  "€15.000 para o teu bolso",
];

const VizSolutionSection = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-success mb-3">
            A solução
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            A VIZ não melhora o modelo.{" "}
            <span className="bg-gradient-to-r from-brand-success to-brand-cyan bg-clip-text text-transparent">
              Substitui-o.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* BEFORE */}
          <div className="rounded-3xl border border-brand-danger/25 bg-brand-danger/[0.06] backdrop-blur-xl p-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-danger">
                Antes
              </span>
              <span className="h-px flex-1 bg-brand-danger/25" />
              <span className="text-xs text-muted-foreground">Modelo tradicional</span>
            </div>
            <ul className="space-y-4">
              {before.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-brand-danger/20 border border-brand-danger/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="h-3.5 w-3.5 text-brand-danger" />
                  </div>
                  <span className="text-foreground/90 line-through decoration-brand-danger/60">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* AFTER */}
          <div className="rounded-3xl border border-brand-success/30 bg-brand-success/[0.06] backdrop-blur-xl p-7 shadow-[0_30px_80px_-30px_hsl(var(--brand-success)/0.4)]">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-success">
                Depois
              </span>
              <span className="h-px flex-1 bg-brand-success/25" />
              <span className="text-xs text-muted-foreground">Com a VIZ</span>
            </div>
            <ul className="space-y-4">
              {after.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-brand-success/20 border border-brand-success/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-brand-success" />
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VizSolutionSection;
