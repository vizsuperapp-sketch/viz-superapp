import { Upload, Link2, Handshake } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Upload,
    title: "Publica o teu imóvel",
    desc: "Gratuito. Sem contrato de exclusividade. Em minutos.",
  },
  {
    n: "02",
    icon: Link2,
    title: "Conectamos comprador e vendedor",
    desc: "Direto, sem intermediários. Zero jogos, zero comissões.",
  },
  {
    n: "03",
    icon: Handshake,
    title: "Fechas o negócio",
    desc: "Com suporte jurídico e financeiro da rede VIZ.",
  },
];

const VizHowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-cyan mb-3">
            Como funciona
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            Três passos.{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              Zero fricção.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ n, icon: Icon, title, desc }) => (
            <div
              key={n}
              className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 transition-all hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-display font-black text-6xl md:text-7xl bg-gradient-to-br from-white/15 to-white/[0.02] bg-clip-text text-transparent leading-none">
                  {n}
                </span>
                <div className="h-12 w-12 rounded-2xl bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-brand-cyan" />
                </div>
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VizHowItWorks;
