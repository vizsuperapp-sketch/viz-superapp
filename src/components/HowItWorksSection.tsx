import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const steps = [
  { number: "01", title: "Comprar", description: "Encontre e negoceie diretamente" },
  { number: "02", title: "Financiar", description: "Compare taxas e obtenha aprovação" },
  { number: "03", title: "Mudar", description: "Organize a logística sem stress" },
  { number: "04", title: "Gerir", description: "Cuide da sua casa a longo prazo" },
];

const HowItWorksSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 px-6 bg-gradient-soft" ref={sectionRef}>
      <div className="container max-w-4xl">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3 text-center reveal">
          Como funciona
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight reveal"
          style={{ textWrap: "balance" }}
        >
          Um ciclo simples
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {steps.map(({ number, title, description }, i) => (
            <div
              key={number}
              className="reveal flex-1 text-center relative"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-gradient text-3xl font-bold tabular-nums">{number}</span>
              <div className="w-8 h-px bg-border mx-auto my-3" />
              <h3 className="text-base font-semibold mb-1">{title}</h3>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
