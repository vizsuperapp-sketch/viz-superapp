import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { EyeOff, Scale, ShieldAlert } from "lucide-react";

const problems = [
  {
    icon: EyeOff,
    title: "Assimetria de Informação",
    description:
      "O comprador nunca sabe o preço real. O vendedor desconhece o mercado. Quem ganha é o intermediário.",
  },
  {
    icon: ShieldAlert,
    title: "Cultura de Opacidade",
    description:
      "Custos escondidos, comissões duplicadas e processos desenhados para confundir — não para servir.",
  },
  {
    icon: Scale,
    title: "Incentivos Desalinhados",
    description:
      "O agente ganha mais se vender rápido, não se vender bem. O sistema não está do seu lado.",
  },
];

const ProblemSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 px-6 relative" ref={sectionRef}>
      {/* Subtle dark-ish ambient for contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, hsla(220, 20%, 92%, 0.4) 0%, transparent 70%)",
        }}
      />

      <div className="container max-w-4xl relative">
        <p className="text-sm font-medium text-destructive/60 tracking-wide uppercase mb-3 text-center reveal">
          O problema
        </p>
        <h2
          className="reveal text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight"
          style={{ textWrap: "balance" }}
        >
          Uma ineficiência{" "}
          <span className="text-muted-foreground/50">estrutural e opaca.</span>
        </h2>
        <p
          className="reveal text-muted-foreground text-center text-sm mb-16 max-w-lg mx-auto"
          style={{ transitionDelay: "80ms" }}
        >
          O mercado imobiliário foi desenhado para proteger intermediários, não pessoas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="reveal glass-card rounded-2xl p-7 relative overflow-hidden group"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Subtle crack/distortion overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    ${120 + i * 25}deg,
                    transparent,
                    transparent 48%,
                    hsl(var(--foreground)) 48%,
                    hsl(var(--foreground)) 48.5%,
                    transparent 48.5%
                  )`,
                }}
              />

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
