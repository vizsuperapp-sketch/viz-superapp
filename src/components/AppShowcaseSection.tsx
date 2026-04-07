import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import mockups from "@/assets/app-mockups.png";

const AppShowcaseSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 px-6" ref={sectionRef}>
      <div className="container max-w-5xl">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3 text-center reveal">
          A experiência
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight reveal"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Uma app pensada para{" "}
          <span className="text-gradient">si, não para agentes</span>
        </h2>
        <div className="reveal" style={{ transitionDelay: "150ms" }}>
          <img
            src={mockups}
            alt="Mockups da aplicação VIZ mostrando simplicidade, linguagem humana e transparência radical"
            className="w-full h-auto object-contain rounded-2xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default AppShowcaseSection;
