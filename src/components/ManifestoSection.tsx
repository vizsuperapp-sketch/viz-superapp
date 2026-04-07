import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const ManifestoSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-32 px-6 relative" ref={sectionRef}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 40% 50% at 50% 50%, hsla(211, 80%, 55%, 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container max-w-3xl text-center relative">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-6 reveal">
          Quem é a VIZ
        </p>

        <h2
          className="reveal text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-8"
          style={{ textWrap: "balance" }}
        >
          Isto não é uma imobiliária.{" "}
          <span className="text-gradient">É o fim delas.</span>
        </h2>

        <div className="reveal space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto" style={{ transitionDelay: "120ms" }}>
          <p>
            Durante décadas, vender ou comprar casa significou pagar milhares em comissões a alguém que não acrescenta valor real.
          </p>
          <p>
            A VIZ é a infraestrutura que substitui esse modelo. Tecnologia que verifica, liga e acompanha — sem intermediários, sem taxas escondidas, sem jargão.
          </p>
          <p className="text-foreground font-medium">
            Acreditamos que a transação imobiliária deve ser transparente, direta e acessível a todos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
