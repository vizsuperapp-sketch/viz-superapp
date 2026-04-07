import { Handshake, FileCheck, Wrench, Key, LayoutDashboard, DoorOpen } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const benefits = [
  { icon: DoorOpen, title: "Vender", description: "Venda diretamente ao comprador. Sem agentes, sem comissões escondidas." },
  { icon: Handshake, title: "Comprar", description: "Negoceia diretamente com o vendedor. Sem intermediários." },
  { icon: Key, title: "Arrendar", description: "Marketplace de arrendamento transparente e sem taxas." },
  { icon: FileCheck, title: "Financiar", description: "Compare taxas e obtenha pré-aprovação — tudo dentro da app." },
  { icon: Wrench, title: "Serviços", description: "Manutenção, reparações e serviços para a casa." },
  { icon: LayoutDashboard, title: "Gerir", description: "Dashboard para despesas, seguros e ciclo de vida da propriedade." },
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
              className="reveal group relative rounded-2xl p-7 transition-all duration-500 ease-out cursor-default glass-card"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, hsla(211, 80%, 55%, 0.08) 0%, transparent 60%)",
                }}
              />
              <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-500 glass-icon">
                <Icon size={20} strokeWidth={1.3} className="text-primary" />
              </div>
              <h3 className="relative z-10 text-base font-semibold mb-1.5">{title}</h3>
              <p className="relative z-10 text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
