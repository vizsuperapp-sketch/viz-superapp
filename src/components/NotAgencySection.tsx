import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Ban, Link2, Compass } from "lucide-react";

const cards = [
  {
    icon: Ban,
    title: "Sem comissão",
    description: "Zero taxas sobre a transação. O dinheiro é inteiramente seu.",
  },
  {
    icon: Link2,
    title: "Ligação direta",
    description: "Comprador e vendedor comunicam diretamente. Sem intermediários.",
  },
  {
    icon: Compass,
    title: "Processo guiado",
    description: "Cada passo explicado e verificado. Da publicação à escritura.",
  },
];

const NotAgencySection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 px-6 relative" ref={sectionRef}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 30%, hsla(211, 80%, 55%, 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container max-w-5xl relative">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3 text-center reveal">
          Uma nova categoria
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight reveal"
          style={{ textWrap: "balance" }}
        >
          Isto não é uma imobiliária.
        </h2>
        <p
          className="text-muted-foreground text-center max-w-md mx-auto mb-16 reveal text-sm"
          style={{ transitionDelay: "80ms" }}
        >
          É a plataforma que substitui o modelo de mediação por tecnologia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="reveal group relative rounded-2xl p-8 transition-all duration-500 glass-card cursor-default"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, hsla(211, 80%, 55%, 0.08) 0%, transparent 60%)",
                }}
              />
              <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 glass-icon group-hover:scale-105 transition-transform duration-500">
                <Icon size={22} strokeWidth={1.3} className="text-primary" />
              </div>
              <h3 className="relative z-10 text-lg font-semibold mb-2">{title}</h3>
              <p className="relative z-10 text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotAgencySection;
