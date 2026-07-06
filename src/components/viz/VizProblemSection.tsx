import { AlertTriangle, EyeOff, Copy, Split } from "lucide-react";

const points = [
  { icon: EyeOff, title: "Assimetria de informação", desc: "O agente sabe tudo. Tu, quase nada." },
  { icon: Split, title: "Conflito de interesses", desc: "Quem te representa também representa o outro lado." },
  { icon: Copy, title: "Anúncios duplicados", desc: "O mesmo imóvel em 5 portais. Preços diferentes." },
  { icon: AlertTriangle, title: "Falta de transparência", desc: "Comissões, taxas e contratos opacos." },
];

const VizProblemSection = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-danger mb-3">
            O problema
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            O sistema imobiliário está{" "}
            <span className="text-brand-danger">partido</span>.
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          {/* Chaotic diagram */}
          <div className="relative aspect-square max-w-md mx-auto w-full">
            <div className="absolute inset-0 rounded-full border border-brand-danger/20 animate-pulse" />
            <div className="absolute inset-8 rounded-full border border-brand-danger/15" />
            <div className="absolute inset-16 rounded-full border border-brand-danger/10" />

            {/* Floating chaos labels */}
            {[
              { t: "Contratos", top: "8%", left: "12%" },
              { t: "Comissões", top: "18%", right: "8%" },
              { t: "Escrituras", bottom: "22%", left: "6%" },
              { t: "IMT", bottom: "12%", right: "14%" },
              { t: "Avaliações", top: "48%", left: "-4%" },
              { t: "Certificados", top: "44%", right: "-4%" },
            ].map((l) => (
              <div
                key={l.t}
                style={{ top: l.top, left: l.left, right: l.right, bottom: l.bottom }}
                className="absolute text-xs md:text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground backdrop-blur"
              >
                {l.t}
              </div>
            ))}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl border border-brand-danger/40 bg-brand-danger/10 backdrop-blur-xl px-6 py-5 text-center shadow-[0_20px_60px_-20px_hsl(var(--brand-danger)/0.6)]">
                <p className="text-xs uppercase tracking-widest text-brand-danger/80">A taxa</p>
                <p className="font-display font-extrabold text-3xl md:text-4xl text-brand-danger mt-1">
                  5% + IVA
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {points.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
              >
                <div className="h-10 w-10 rounded-xl bg-brand-danger/15 border border-brand-danger/30 flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-brand-danger" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VizProblemSection;
