import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Megaphone, Landmark, ShieldCheck, Wrench } from "lucide-react";

const services = [
  { icon: Megaphone, label: "Destaque de anúncios", angle: 0 },
  { icon: Landmark, label: "Crédito habitação", angle: 90 },
  { icon: ShieldCheck, label: "Seguros", angle: 180 },
  { icon: Wrench, label: "Serviços pós-venda", angle: 270 },
];

const EcosystemSection = () => {
  const sectionRef = useScrollReveal();
  const radius = 160;

  return (
    <section className="py-28 px-6 relative" ref={sectionRef}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 50%, hsla(163, 30%, 55%, 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container max-w-4xl relative">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3 text-center reveal">
          Modelo de negócio
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-6 tracking-tight reveal"
          style={{ textWrap: "balance" as any }}
        >
          Transação gratuita.{" "}
          <span className="text-gradient">Serviços opcionais.</span>
        </h2>
        <p
          className="reveal text-muted-foreground text-center text-sm mb-20 max-w-lg mx-auto"
          style={{ transitionDelay: "80ms" }}
        >
          Nunca cobramos pela transação. Apenas por serviços adjacentes.
        </p>

        {/* Circular diagram */}
        <div
          className="reveal relative mx-auto"
          style={{ width: radius * 2 + 160 + "px", height: radius * 2 + 160 + "px", transitionDelay: "200ms" }}
        >
          {/* Orbit ring */}
          <div
            className="absolute rounded-full"
            style={{
              top: "50%", left: "50%",
              width: radius * 2 + "px", height: radius * 2 + "px",
              transform: "translate(-50%, -50%)",
              border: "1.5px solid hsla(211, 80%, 55%, 0.1)",
              background: "radial-gradient(circle, hsla(211, 80%, 55%, 0.03) 0%, transparent 70%)",
            }}
          />

          <div
            className="absolute rounded-full"
            style={{
              top: "50%", left: "50%",
              width: radius * 2 + "px", height: radius * 2 + "px",
              transform: "translate(-50%, -50%)",
              border: "1px solid hsla(211, 80%, 55%, 0.05)",
              animation: "orbit-breathe 4s ease-in-out infinite",
            }}
          />

          {/* Center node */}
          <div
            className="absolute glass-card rounded-full flex flex-col items-center justify-center text-center z-10"
            style={{
              top: "50%", left: "50%",
              width: "140px", height: "140px",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 8px 40px hsla(211, 80%, 55%, 0.1), inset 0 1px 0 hsla(0,0%,100%,0.08)",
            }}
          >
            <span className="text-2xl font-bold text-gradient">0%</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mt-1">
              comissão
            </span>
          </div>

          {/* Service nodes */}
          {services.map(({ icon: Icon, label, angle }) => {
            const rad = (angle - 90) * (Math.PI / 180);
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <div
                key={label}
                className="absolute group"
                style={{ top: `calc(50% + ${y}px)`, left: `calc(50% + ${x}px)`, transform: "translate(-50%, -50%)" }}
              >
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: "50%", left: "50%",
                    width: `${radius - 70}px`, height: "1.5px",
                    transformOrigin: "0 50%",
                    transform: `rotate(${angle + 180}deg)`,
                    background: `linear-gradient(90deg, hsla(211, 80%, 55%, 0.15), transparent)`,
                  }}
                />

                <div
                  className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 transition-all duration-500 group-hover:scale-105 cursor-default"
                  style={{ width: "120px" }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 50% 30%, hsla(211, 80%, 55%, 0.08) 0%, transparent 60%)",
                    }}
                  />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center glass-icon group-hover:shadow-[0_4px_16px_hsla(211,80%,55%,0.12)] transition-shadow duration-500">
                    <Icon size={18} strokeWidth={1.3} className="text-primary" />
                  </div>
                  <span className="text-[11px] font-semibold text-foreground text-center leading-tight">
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes orbit-breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.04); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default EcosystemSection;
