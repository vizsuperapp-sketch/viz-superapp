import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, FileCheck, BadgePercent } from "lucide-react";

const highlights = [
  { icon: Home, text: "Publicação gratuita" },
  { icon: FileCheck, text: "Sem contratos" },
  { icon: BadgePercent, text: "0% comissão" },
];

const SellPropertySection = () => {
  const sectionRef = useScrollReveal();
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 relative overflow-hidden" ref={sectionRef}>
      {/* Glow suave de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, hsla(195, 100%, 50%, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="container max-w-3xl mx-auto relative z-10">
        <div
          className="rounded-3xl p-10 md:p-16 text-center border border-white/10 shadow-2xl shadow-cyan-900/20"
          style={{
            background:
              "linear-gradient(145deg, rgba(15, 23, 42, 0.9) 0%, rgba(26, 39, 68, 0.85) 50%, rgba(15, 23, 42, 0.9) 100%)",
            backdropFilter: "blur(20px) saturate(1.4)",
          }}
        >
          <h2
            className="reveal text-3xl md:text-5xl font-bold mb-5 tracking-tight"
            style={{ textWrap: "balance" }}
          >
            Pronto para poupar{" "}
            <span className="text-gradient">€15.000?</span>
          </h2>

          <p
            className="reveal text-muted-foreground text-base md:text-lg mb-8 max-w-xl mx-auto"
            style={{ transitionDelay: "80ms", textWrap: "balance" }}
          >
            Publica o teu imóvel gratuitamente. Sem contratos. Sem comissões.
          </p>

          <div
            className="reveal mb-8"
            style={{ transitionDelay: "160ms" }}
          >
            <Button
              variant="cyan"
              size="xl"
              onClick={() => navigate("/vender")}
            >
              Publicar o Meu Imóvel
              <ArrowRight className="ml-1" />
            </Button>
          </div>

          <div
            className="reveal flex items-center justify-center gap-5 flex-wrap"
            style={{ transitionDelay: "240ms" }}
          >
            {highlights.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon size={14} className="text-cyan-300/70" />
                <span className="text-[11px] text-muted-foreground/70">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellPropertySection;
