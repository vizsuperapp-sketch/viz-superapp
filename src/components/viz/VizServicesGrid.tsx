import {
  Banknote,
  Leaf,
  Scale,
  Camera,
  ShieldCheck,
  Hammer,
} from "lucide-react";

const services = [
  { icon: Banknote, name: "Crédito Habitação" },
  { icon: Leaf, name: "Certificado Energético" },
  { icon: Scale, name: "Documentação Legal" },
  { icon: Camera, name: "Fotografia 360°" },
  { icon: ShieldCheck, name: "Seguros" },
  { icon: Hammer, name: "Obras & Remodelação" },
];

const VizServicesGrid = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-cyan mb-3">
            Ecossistema
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            A VIZ só ganha{" "}
            <span className="bg-gradient-to-r from-brand-cyan to-brand-success bg-clip-text text-transparent">
              quando tu ganhas.
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Zero comissão na transação. Serviços premium quando (e se) precisares.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map(({ icon: Icon, name }) => (
            <div
              key={name}
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all hover:bg-white/[0.08] hover:border-brand-cyan/30 hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-cyan/10 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="h-5 w-5 text-brand-cyan" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">
                {name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-brand-success/90">
                Parceiro verificado
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VizServicesGrid;
