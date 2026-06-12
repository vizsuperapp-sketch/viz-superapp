import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SERVICOS } from "@/data/servicos";
import { getWhatsAppLink } from "@/lib/whatsapp";

const EcosystemServicesSection = () => {
  const sectionRef = useScrollReveal();
  const navigate = useNavigate();

  return (
    <section
      id="ecossistema"
      ref={sectionRef}
      className="py-28 px-6 relative"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 20%, hsla(211, 80%, 55%, 0.07) 0%, transparent 60%)",
        }}
      />

      <div className="container max-w-6xl relative">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3 text-center reveal">
          Ecossistema VIZ
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight reveal"
          style={{ textWrap: "balance" as any, transitionDelay: "60ms" }}
        >
          Tudo o que precisa,{" "}
          <span className="text-gradient">num só sítio.</span>
        </h2>
        <p
          className="reveal text-muted-foreground text-center text-sm md:text-base mb-14 max-w-xl mx-auto"
          style={{ transitionDelay: "120ms" }}
        >
          0% comissão na transação. Serviços opcionais a preços transparentes —
          paga só o que precisa.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {SERVICOS.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.id}
                className="reveal glass-card rounded-2xl p-6 flex flex-col gap-4 transition-transform duration-500 hover:scale-[1.015] group"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center glass-icon">
                    <Icon size={20} strokeWidth={1.4} className="text-primary" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                    {categoriaLabel(s.categoria)}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold leading-tight mb-1">
                    {s.nome}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.descricao}
                  </p>
                </div>

                <ul className="space-y-1.5 text-[13px] text-foreground/80">
                  {s.beneficios.slice(0, 3).map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4 border-t border-border/40">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="text-2xl font-bold text-gradient leading-none">
                      {s.precoLabel}
                    </span>
                    <span className="text-xs line-through text-muted-foreground/60">
                      {s.precoMercadoLabel}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-medium text-primary/90 mb-4">
                    💰 {s.poupancaLabel}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between border-primary/25 hover:bg-primary/10"
                    onClick={() => window.open(getWhatsAppLink(), "_blank", "noopener,noreferrer")}
                  >
                    {s.ctaLabel}
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <div
          className="reveal text-center mt-10"
          style={{ transitionDelay: "400ms" }}
        >
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/servicos")}
          >
            Ver todos os serviços
            <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const categoriaLabel = (c: string) =>
  ({ vender: "Vender", comprar: "Comprar", arrendar: "Arrendar", manutencao: "Manutenção" } as Record<string, string>)[c] ?? c;

export default EcosystemServicesSection;
