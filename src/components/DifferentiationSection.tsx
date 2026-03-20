import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Ban, Eye, Bot } from "lucide-react";

const differentiators = [
  {
    icon: Ban,
    title: "Zero comissão",
    description: "Não cobramos comissões. O que poupa fica consigo.",
  },
  {
    icon: Eye,
    title: "Total transparência",
    description: "Cada custo, cada passo — tudo visível e claro.",
  },
  {
    icon: Bot,
    title: "Apoio com IA",
    description: "Assistente inteligente para guiar cada decisão da jornada.",
  },
];

const DifferentiationSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 px-6" ref={sectionRef}>
      <div className="container max-w-4xl">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3 text-center reveal">
          Diferenciação
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight reveal"
          style={{ textWrap: "balance" }}
        >
          Porque é que a VIZ é diferente
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {differentiators.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="reveal text-center group relative"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-105 transition-all duration-500"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.55), rgba(255,255,255,0.25))",
                  backdropFilter: "blur(20px) saturate(1.4)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,0.65),
                    0 4px 20px hsla(163,43%,55%,0.06),
                    0 1px 3px rgba(0,0,0,0.03)
                  `,
                }}
              >
                <Icon size={24} strokeWidth={1.3} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentiationSection;
