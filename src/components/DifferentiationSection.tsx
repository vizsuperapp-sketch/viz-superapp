import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Ban, Eye, Bot } from "lucide-react";

const differentiators = [
  {
    icon: Ban,
    title: "Sem comissões",
    description: "Não cobramos percentagem sobre a venda. O valor que poupa fica inteiramente consigo.",
    stat: "€0",
    statLabel: "comissão",
  },
  {
    icon: Eye,
    title: "Tudo visível",
    description: "Cada custo, cada documento, cada passo do processo — sempre acessível e claro.",
    stat: "100%",
    statLabel: "transparência",
  },
  {
    icon: Bot,
    title: "Guiado por IA",
    description: "Um assistente inteligente que explica, sugere e acompanha do início ao fim.",
    stat: "24/7",
    statLabel: "disponível",
  },
];

const DifferentiationSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 px-6" ref={sectionRef}>
      <div className="container max-w-4xl">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3 text-center reveal">
          Porquê a VIZ
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight reveal"
          style={{ textWrap: "balance" }}
        >
          Desenhado para lhe dar{" "}
          <span className="text-gradient">controlo e segurança</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {differentiators.map(({ icon: Icon, title, description, stat, statLabel }, i) => (
            <div
              key={title}
              className="reveal text-center group relative glass-card rounded-2xl p-8 transition-all duration-500"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, var(--glow-primary-hover) 0%, transparent 70%)",
                }}
              />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-105 transition-all duration-500 glass-icon">
                  <Icon size={24} strokeWidth={1.3} className="text-primary" />
                </div>
                <p className="text-2xl font-bold text-gradient mb-0.5">{stat}</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-4">{statLabel}</p>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentiationSection;
