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
    <section className="py-24 px-6" ref={sectionRef}>
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
              className="reveal text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-5">
                <Icon size={24} className="text-primary" />
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
