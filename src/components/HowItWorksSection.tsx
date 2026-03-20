import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const steps = [
  { number: "01", title: "Comprar", description: "Encontre e negoceie diretamente" },
  { number: "02", title: "Financiar", description: "Compare taxas e obtenha aprovação" },
  { number: "03", title: "Mudar", description: "Organize a logística sem stress" },
  { number: "04", title: "Gerir", description: "Mantenha e cuide da sua casa" },
];

const HowItWorksSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-24 px-6 bg-gradient-soft" ref={sectionRef}>
      <div className="container max-w-5xl">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3 text-center reveal">
          Como funciona
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight reveal"
          style={{ textWrap: "balance" }}
        >
          Um ciclo simples e completo
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ number, title, description }, i) => (
            <div
              key={number}
              className="reveal text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-gradient text-4xl font-bold tabular-nums">{number}</span>
              <div className="w-12 h-px bg-gradient-viz mx-auto my-4" />
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
