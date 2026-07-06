import { Link } from "react-router-dom";
import vizLogoCube from "@/assets/viz-logo-cube.png";

const links = [
  { to: "/", label: "Sobre" },
  { to: "/servicos", label: "Serviços" },
  { to: "/#roadmap", label: "Investidores" },
  { to: "/#waitlist", label: "Contacto" },
];

const VizFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0b1220]/60 backdrop-blur-xl mt-10">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src={vizLogoCube} alt="VIZ" className="w-8 h-8 object-contain" />
              <span className="font-display font-extrabold text-lg text-foreground">
                VIZ
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              O novo padrão de transação imobiliária.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-3">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <span>Confidencial 2026 · VIZ SuperApp</span>
          <span>Feito em Portugal 🇵🇹</span>
        </div>
      </div>
    </footer>
  );
};

export default VizFooter;
