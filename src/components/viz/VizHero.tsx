import { ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import InteractiveCube from "@/components/InteractiveCube";

const scrollToWaitlist = () => {
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
};

const VizHero = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Ambient glows */}
      <div
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--brand-blue)/0.35), transparent 70%)" }}
      />
      <div
        className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--brand-cyan)/0.35), transparent 70%)" }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-sm text-foreground/90 mb-6">
              <Flame className="h-4 w-4 text-brand-cyan" />
              <span>247 pessoas já na lista VIP</span>
            </div>

            <h1 className="font-display font-extrabold tracking-tight leading-[1.05] text-[clamp(2.25rem,6vw,4.25rem)] text-foreground">
              Vende a tua casa.
              <br />
              Poupa{" "}
              <span className="bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-transparent">
                €15.000
              </span>
              .
              <br />
              Sem agências.
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              A VIZ liga compradores e vendedores diretamente.{" "}
              <span className="text-foreground font-medium">Zero comissão. Sempre.</span>
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={scrollToWaitlist}
                className="h-14 px-8 rounded-full text-base font-semibold bg-brand-blue hover:bg-brand-blue/90 text-white shadow-[0_20px_50px_-15px_hsl(var(--brand-blue)/0.7)]"
              >
                Quero Vender <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 rounded-full text-base font-semibold bg-white/5 border-white/15 hover:bg-white/10 text-foreground backdrop-blur"
              >
                <Link to="/imoveis">Quero Comprar</Link>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center min-h-[320px] lg:min-h-[440px]">
            <div className="w-full max-w-[320px]">
              <InteractiveCube />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VizHero;
