import { Sparkles, MessageSquare, Network } from "lucide-react";

const phases = [
  {
    tag: "Fase 0 · Agora",
    icon: Sparkles,
    title: "Concierge MVP",
    desc: "Match manual entre compradores e vendedores. Foco absoluto em vendedores premium.",
    accent: "from-brand-blue to-brand-cyan",
    dot: "bg-brand-blue",
  },
  {
    tag: "Fase 1 · Meses 3–5",
    icon: MessageSquare,
    title: "MVP Digital",
    desc: "Chat direto comprador-vendedor. Guia IA por transação. Documentos digitais.",
    accent: "from-brand-cyan to-brand-success",
    dot: "bg-brand-cyan",
  },
  {
    tag: "Fase 2 · Meses 6–12",
    icon: Network,
    title: "Ecossistema Ativo",
    desc: "Crédito habitação, seguros e obras integrados. Monetização full-stack.",
    accent: "from-brand-success to-brand-blue",
    dot: "bg-brand-success",
  },
];

const VizRoadmap = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-blue mb-3">
            Roadmap
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            Disciplina na execução.{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              Aprender manualmente para escalar.
            </span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line - desktop */}
          <div className="hidden md:block absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-success opacity-40" />

          <div className="grid md:grid-cols-3 gap-6 relative">
            {phases.map(({ tag, icon: Icon, title, desc, accent, dot }) => (
              <div key={tag} className="relative">
                <div className={`hidden md:block absolute top-[26px] left-1/2 -translate-x-1/2 h-3 w-3 rounded-full ${dot} ring-4 ring-[#0f172a]`} />
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:pt-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-brand-cyan" />
                    </div>
                    <span className={`text-xs font-semibold uppercase tracking-widest bg-gradient-to-r ${accent} bg-clip-text text-transparent`}>
                      {tag}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VizRoadmap;
