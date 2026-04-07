import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { EyeOff, Scale, ShieldAlert } from "lucide-react";

const problems = [
  {
    icon: EyeOff,
    title: "Falta de transparência",
    description:
      "Não sabe quanto o agente ganha, nem se o preço sugerido é justo. Os custos reais só aparecem no final.",
  },
  {
    icon: ShieldAlert,
    title: "Custos escondidos",
    description:
      "Comissões de 5% + IVA, taxas duplicadas e despesas que ninguém explica até ser tarde demais.",
  },
  {
    icon: Scale,
    title: "Pouco controlo",
    description:
      "O agente decide o ritmo, o preço e as visitas. O proprietário fica de fora do próprio processo.",
  },
];

const ProblemSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 px-6 relative" ref={sectionRef}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, hsla(220, 20%, 92%, 0.4) 0%, transparent 70%)",
        }}
      />

      <div className="container max-w-4xl relative">
        <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-3 text-center reveal">
          O que muda
        </p>
        <h2
          className="reveal text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight"
          style={{ textWrap: "balance" }}
        >
          Vender casa não devia ser{" "}
          <span className="text-muted-foreground/50">tão caro nem tão confuso.</span>
        </h2>
        <p
          className="reveal text-muted-foreground text-center text-sm mb-16 max-w-lg mx-auto"
          style={{ transitionDelay: "80ms" }}
        >
          Estes são os problemas que milhares de proprietários enfrentam — e que a VIZ resolve.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="reveal glass-card rounded-2xl p-7 relative overflow-hidden group"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 glass-icon">
                  <Icon
                    size={22}
                    strokeWidth={1.4}
                    className="text-destructive/60"
                  />
                </div>
                <h3 className="text-base font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
