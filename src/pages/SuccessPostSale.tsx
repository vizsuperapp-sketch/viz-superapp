import { useState } from "react";
import { Plane, Sofa, ShieldCheck, TrendingUp, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DEFAULT_SALE_PRICE = 615000;
const COMMISSION_RATE = 0.05;
const IVA_RATE = 0.23;

const ecosystemOptions = [
  { icon: Plane, label: "Viagens", description: "Descobre destinos exclusivos", color: "163 43% 55%" },
  { icon: Sofa, label: "Mobiliário", description: "Decora a tua nova casa", color: "211 100% 65%" },
  { icon: ShieldCheck, label: "Seguros", description: "Protege o que é teu", color: "163 43% 55%" },
  { icon: TrendingUp, label: "Investimentos", description: "Faz o dinheiro crescer", color: "211 100% 65%" },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

const SuccessPostSale = () => {
  const navigate = useNavigate();
  const [salePrice] = useState(DEFAULT_SALE_PRICE);
  const saved = Math.round(salePrice * COMMISSION_RATE * (1 + IVA_RATE));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Ambient background */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 30%, hsla(163, 43%, 55%, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 60% 70%, hsla(211, 100%, 65%, 0.06) 0%, transparent 50%),
            hsl(var(--background))
          `,
        }}
      />

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
      >
        <ArrowLeft size={16} />
        Voltar
      </button>

      {/* Phone-style container */}
      <div className="w-full max-w-md">
        {/* Success icon */}
        <div className="flex justify-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center animate-breathe"
            style={{
              background: "linear-gradient(135deg, hsla(163, 43%, 55%, 0.15), hsla(211, 100%, 65%, 0.1))",
              boxShadow: "0 8px 40px hsla(163, 43%, 55%, 0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <CheckCircle2 size={36} className="text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center tracking-tight mb-2">
          Parabéns.
        </h1>
        <p className="text-center text-muted-foreground text-base mb-1">
          Vendeste sem comissão.
        </p>
        <p className="text-center text-muted-foreground/70 text-xs mb-8">
          equivalente a 5% + IVA
        </p>

        {/* Savings highlight */}
        <div
          className="glass-card rounded-3xl p-8 text-center mb-4 relative overflow-hidden"
          style={{
            boxShadow: "0 12px 48px hsla(163, 43%, 55%, 0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 20%, hsla(163, 43%, 55%, 0.08) 0%, transparent 60%)",
            }}
          />
          <p className="text-sm font-medium text-muted-foreground mb-2 relative z-10">Guardaste</p>
          <p
            className="text-5xl md:text-6xl font-bold tracking-tight relative z-10 text-gradient"
          >
            {formatCurrency(saved)}
          </p>
        </div>

        {/* Provocative question */}
        <p className="text-center text-muted-foreground text-sm mb-8">
          O que vais fazer com este dinheiro?
        </p>

        {/* Ecosystem options */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {ecosystemOptions.map(({ icon: Icon, label, description, color }) => (
            <div
              key={label}
              className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer group transition-all duration-500 hover:scale-[1.03]"
              style={{
                boxShadow: `0 4px 20px hsla(${color}, 0.06), inset 0 1px 0 rgba(255,255,255,0.6)`,
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 30%, hsla(${color}, 0.1) 0%, transparent 60%)`,
                }}
              />
              <div className="glass-icon w-10 h-10 rounded-xl flex items-center justify-center group-hover:shadow-[0_4px_16px_hsla(163,43%,55%,0.15)] transition-shadow duration-500">
                <Icon size={18} strokeWidth={1.3} className="text-primary" />
              </div>
              <span className="text-xs font-semibold text-foreground">{label}</span>
              <span className="text-[10px] text-muted-foreground text-center leading-tight">{description}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button variant="hero" size="lg" className="w-full rounded-2xl h-14 text-base">
          Explorar opções
        </Button>

        {/* Footer tagline */}
        <p className="text-center text-muted-foreground/50 text-xs mt-6">
          Agora decides tu.
        </p>

        {/* VIZ logo */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          <span className="text-gradient text-lg font-bold tracking-tight">✓ VIZ</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessPostSale;
