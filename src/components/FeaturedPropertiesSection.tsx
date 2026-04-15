import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

// Dados com imagens reais de alta qualidade para garantir que apareçam agora
const properties = [
  {
    slug: "machado-santos",
    name: "Edifício Machado Santos",
    region: "Margem Sul",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    price: "285.000€ – 395.000€",
    details: "T0 – T2 · Moderno & Central",
  },
  {
    slug: "horizon-view",
    name: "Horizon View Residence",
    region: "Lisboa",
    image: "https://images.unsplash.com/photo-1600607687940-4e524cb35a36?q=80&w=1200",
    price: "1.450.000€ – 2.300.000€",
    details: "T3 – T4 · Vista Rio",
  },
];

export const FeaturedPropertiesSection = () => {
  return (
    <section className="py-20 bg-[#06080F] relative overflow-hidden">
      {/* Glow de Fundo Estilo SuperApp */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30 px-4 py-1 rounded-full uppercase tracking-tighter text-[10px]">
            Oportunidades Únicas
          </Badge>
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight">Em Destaque</h2>
          <div className="h-1.5 w-20 bg-cyan-500 mx-auto rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {properties.map((property) => (
            <Link key={property.slug} to={`/imoveis/${property.slug}`} className="group block">
              <div className="relative bg-[#0B1120] rounded-[3rem] overflow-hidden border border-slate-800 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_50px_rgba(6,182,212,0.2)] hover:-translate-y-3">
                {/* Imagem com efeito de Vidro e Zoom */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Reflexo de Vidro superior */}
                  <div className="absolute top-4 left-6 right-12 h-1/3 bg-gradient-to-br from-white/20 to-transparent rounded-full rotate-2 blur-[1px] opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-90" />

                  <div className="absolute top-6 left-6">
                    <Badge className="bg-black/40 backdrop-blur-md text-white border-white/10 px-3 py-1 rounded-full flex gap-2 items-center">
                      <MapPin size={12} className="text-cyan-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{property.region}</span>
                    </Badge>
                  </div>
                </div>

                {/* Conteúdo Neon */}
                <div className="p-10">
                  <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    {property.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-8 font-medium tracking-wide">{property.details}</p>

                  <div className="flex items-center justify-between border-t border-slate-800/50 pt-8">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">
                        A partir de
                      </span>
                      <span className="text-cyan-400 font-black text-2xl drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                        {property.price}
                      </span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-slate-800/50 flex items-center justify-center text-white border border-white/5 transition-all group-hover:bg-cyan-500 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:rotate-12">
                      <span className="text-2xl">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
