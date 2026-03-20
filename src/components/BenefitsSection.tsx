import { Handshake, FileCheck, Package, Wrench, Key, LayoutDashboard } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const benefits = [
  {
    icon: Handshake,
    title: "Comprar",
    description: "Negoceia diretamente com o vendedor. Sem agentes, sem comissões.",
  },
  {
    icon: FileCheck,
    title: "Financiar",
    description: "Compare taxas e obtenha pré-aprovação — tudo dentro da app.",
  },
  {
    icon: Key,
    title: "Arrendar",
    description: "Marketplace de arrendamento sem intermediários.",
  },
  {
    icon: Package,
    title: "Mudar",
    description: "Organize a logística da mudança com parceiros verificados.",
  },
  {
    icon: Wrench,
    title: "Serviços",
    description: "Manutenção, reparações e serviços para a casa.",
  },
  {
    icon: LayoutDashboard,
    title: "Gerir",
    description: "Dashboard para despesas, seguros e ciclo de vida da propriedade.",
  },
];

const BenefitsSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="beneficios" className="py-28 px-6" ref={sectionRef}>
      <div className="container max-w-4xl">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3 text-center reveal">
          Ecossistema
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight reveal"
          style={{ textWrap: "balance" }}
        >
          Tudo num só sistema
        </h2>
        <p className="text-muted-foreground text-center max-w-md mx-auto mb-16 reveal text-sm">
          Seis módulos que cobrem toda a jornada da sua casa.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="reveal liquid-glass rounded-2xl p-7 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 ease-out group"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-10 h-10 rounded-xl liquid-glass-subtle flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-500">
                <Icon size={20} strokeWidth={1.5} className="text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-1.5">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
