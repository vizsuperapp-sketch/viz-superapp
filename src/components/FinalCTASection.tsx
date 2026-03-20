import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import LeadFormModal from "@/components/LeadFormModal";

const FinalCTASection = () => {
  const sectionRef = useScrollReveal();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="py-32 px-6 relative" ref={sectionRef}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 50% at 50% 50%, hsla(211, 50%, 92%, 0.3) 0%, transparent 60%)",
      }} />
      <div className="container max-w-2xl text-center relative">
        <div
          className="rounded-3xl p-12 md:p-16"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3))",
            backdropFilter: "blur(24px) saturate(1.5)",
            WebkitBackdropFilter: "blur(24px) saturate(1.5)",
            border: "1px solid rgba(255,255,255,0.5)",
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.7),
              0 8px 40px hsla(163,43%,55%,0.08),
              0 2px 8px rgba(0,0,0,0.03)
            `,
          }}
        >
          <h2
            className="reveal text-3xl md:text-4xl font-bold mb-5 tracking-tight"
            style={{ textWrap: "balance" }}
          >
            Comece a sua jornada com a{" "}
            <span className="text-gradient">VIZ</span>
          </h2>
          <p className="reveal text-muted-foreground text-base mb-10" style={{ transitionDelay: "80ms" }}>
            A sua casa merece um sistema inteligente. Experimente gratuitamente.
          </p>
          <div className="reveal" style={{ transitionDelay: "160ms" }}>
            <Button variant="hero" size="xl" onClick={() => setFormOpen(true)}>
              Começar agora
              <ArrowRight className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default FinalCTASection;
