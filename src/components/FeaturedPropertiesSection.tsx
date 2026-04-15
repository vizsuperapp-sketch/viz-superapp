import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const properties = [
  {
    slug: "machado-santos",
    name: "Machado Santos",
    region: "Margem Sul",
    coverImage: "/placeholder.svg",
    priceRange: "285 000 € – 395 000 €",
    details: "T0 – T2 · 80,02 m² – 173,11 m²",
  },
  {
    slug: "horizon",
    name: "Horizon",
    region: "Lisboa",
    coverImage: "/placeholder.svg",
    priceRange: "1 450 000 € – 2 300 000 €",
    details: "T3 – T4 · 283,6 m² – 501,1 m²",
  },
];

export const FeaturedPropertiesSection = () => {
  return (
    <section className="py-24 bg-[#06080F] relative overflow-hidden">
      {/* Glow de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30 px-4 py-1">
            Empreendimentos
          </Badge>
          <h2 className="text-5xl font-black text-white mb-4">Em Destaque</h2>
          <p className="text-slate-400">Conheça os empreendimentos que estamos a comercializar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {properties.map((property) => (
            <Link key={property.slug} to={`/imoveis/${property.slug}`} className="group block">
              <div className="group relative bg-[#0B1120] rounded-[3rem] overflow-hidden border-2 border-slate-800 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_50px_rgba(6,182,212,0.25)] hover:-translate-y-2">
                {/* Imagem com Zoom */}
                <div className="aspect-[16/9] overflow-hidden relative">
                <img 
  src={property.coverImage || "/placeholder.svg"} 
  alt={property.name}
  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"; // Imagem de backup elegante
  }}
/>
                    src={property.coverImage}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-80" />

                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/60 backdrop-blur-md text-white border-white/10 flex gap-1 items-center">
                      <MapPin className="h-3 w-3 text-cyan-400" />
                      {property.region}
                    </Badge>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {property.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">{property.details}</p>

                  <div className="flex items-center justify-between border-t border-slate-800/50 pt-6">
                    <span className="text-cyan-400 font-black text-xl">{property.priceRange}</span>
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white transition-all group-hover:bg-cyan-500">
                      →
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
