const stats = [
  { value: "0%", label: "Comissão cobrada", accent: "from-brand-cyan to-brand-blue" },
  { value: "€15.000+", label: "Poupança média por transação", accent: "from-brand-success to-brand-cyan" },
  { value: "€25B+", label: "Mercado imobiliário português / ano", accent: "from-brand-blue to-brand-success" },
];

const VizStatsBar = () => {
  return (
    <section className="py-10 md:py-14">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 text-center transition-all hover:bg-white/[0.07] hover:border-white/15"
            >
              <div
                className={`font-display font-extrabold text-4xl md:text-5xl bg-gradient-to-r ${s.accent} bg-clip-text text-transparent`}
              >
                {s.value}
              </div>
              <div className="mt-2 text-sm md:text-base text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VizStatsBar;
