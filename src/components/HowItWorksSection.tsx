import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Handshake, FileCheck, Package, LayoutDashboard } from "lucide-react";

const steps = [
  { icon: Handshake, number: "01", title: "Comprar", description: "Encontre e negoceie diretamente" },
  { icon: FileCheck, number: "02", title: "Financiar", description: "Compare taxas e obtenha aprovação" },
  { icon: Package, number: "03", title: "Mudar", description: "Organize a logística sem stress" },
  { icon: LayoutDashboard, number: "04", title: "Gerir", description: "Cuide da sua casa a longo prazo" },
];

const HowItWorksSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 px-6 relative" ref={sectionRef}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 40% at 50% 50%, hsla(163, 30%, 92%, 0.3) 0%, transparent 60%)",
      }} />

      <div className="container max-w-4xl relative">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3 text-center reveal">
          Como funciona
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight reveal"
          style={{ textWrap: "balance" }}
        >
          Um ciclo simples
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {steps.map(({ icon: Icon, number, title, description }, i) => (
            <div
              key={number}
              className="reveal flex-1 text-center relative group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-all duration-500"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.55), rgba(255,255,255,0.25))",
                  backdropFilter: "blur(20px) saturate(1.4)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 16px hsla(163,43%,55%,0.06)",
                }}
              >
                <Icon size={22} strokeWidth={1.3} className="text-primary" />
              </div>
              <span className="text-gradient text-xs font-bold tracking-widest uppercase">{number}</span>
              <h3 className="text-base font-semibold mb-1 mt-1">{title}</h3>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
