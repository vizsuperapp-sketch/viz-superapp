import { Handshake, FileCheck, Package, Wrench } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const benefits = [
  {
    icon: Handshake,
    title: "Comprar diretamente",
    description: "Sem intermediários nem comissões. Negoceia diretamente com o vendedor.",
  },
  {
    icon: FileCheck,
    title: "Financiamento inteligente",
    description: "As melhores taxas comparadas e pré-aprovação rápida, tudo dentro da app.",
  },
  {
    icon: Package,
    title: "Mudança simplificada",
    description: "Organize toda a logística da mudança com parceiros verificados.",
  },
  {
    icon: Wrench,
    title: "Gestão da casa",
    description: "Manutenção, seguros e serviços — tudo gerido num só sítio.",
  },
];

const BenefitsSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="beneficios" className="py-24 px-6" ref={sectionRef}>
      <div className="container max-w-5xl">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3 text-center reveal">
          Benefícios
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight reveal"
          style={{ textWrap: "balance" }}
        >
          Tudo o que precisa, num só lugar
        </h2>
        <p className="text-muted-foreground text-center max-w-lg mx-auto mb-16 reveal">
          A VIZ cobre cada etapa da jornada da sua casa — do primeiro clique à última chave.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="reveal glass-card rounded-2xl p-8 hover:shadow-lg hover:shadow-primary/5 transition-shadow duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-viz flex items-center justify-center mb-5">
                <Icon size={22} className="text-primary-foreground" />
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

export default BenefitsSection;
