import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import LeadFormModal from "@/components/LeadFormModal";

const FinalCTASection = () => {
  const sectionRef = useScrollReveal();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="py-32 px-6 bg-gradient-soft" ref={sectionRef}>
      <div className="container max-w-2xl text-center">
        <h2
          className="reveal text-3xl md:text-4xl font-bold mb-5 tracking-tight"
          style={{ textWrap: "balance" }}
        >
          Comece a sua jornada com a{" "}
          <span className="text-gradient">VIZ</span>
        </h2>
        <p className="reveal text-muted-foreground text-base mb-10" style={{ transitionDelay: "80ms" }}>
          A sua casa merece um sistema inteligente.
        </p>
        <div className="reveal" style={{ transitionDelay: "160ms" }}>
          <Button variant="hero" size="xl" onClick={() => setFormOpen(true)}>
            Começar agora
            <ArrowRight className="ml-1" />
          </Button>
        </div>
      </div>
      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default FinalCTASection;
