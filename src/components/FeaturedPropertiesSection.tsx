import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

// Dados com imagens reais que funcionam em qualquer lugar
const properties = [
  {
    slug: "machado-santos",
    name: "Edifício Machado Santos",
    region: "Margem Sul",
    // Imagem 1: Edifício Moderno
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    price: "285.000€ – 395.000€",
    details: "T0 – T2 · Design Minimalista",
  },
  {
    slug: "horizon-view",
    name: "Horizon View Residence",
    region: "Lisboa",
    // Imagem 2: Vista Luxo (Corrigida para aparecer à direita)
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
    price: "1.450.000€ – 2.300.000€",
    details: "T3 – T4 · Vista Panorâmica",
  },
];

export const FeaturedPropertiesSection = () => {
  return (
    <section className="py-24 bg-[#06080F] relative overflow-hidden">
      {/* Efeito de luz de fundo para dar profundidade */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-4 py-1 rounded-full uppercase text-[10px] tracking-[0.2em] font-bold">
            Seleção Premium
          </Badge>
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight">Em Destaque</h2>
          <div className="h-1.5 w-20 bg-cyan-500 mx-auto rounded-full shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {properties.map((property) => (
            <Link key={property.slug} to={`/imoveis/${property.slug}`} className="group block">
              <div className="relative bg-[#0B1120] rounded-[3.5rem] overflow-hidden border border-slate-800 transition-all duration-700 hover:border-cyan-500/40 hover:shadow-[0_0_60px_rgba(6,182,212,0.15)] hover:-translate-y-4">
                {/* Imagem com Efeito Vidro Neon */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Camada de brilho "Gelo" por cima da imagem */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-4 left-8 right-16 h-1/4 bg-gradient-to-br from-white/10 to-transparent rounded-full rotate-1 blur-[2px] pointer-events-none" />

                  <div className="absolute top-6 left-6">
                    <Badge className="bg-black/40 backdrop-blur-md text-white border-white/10 px-4 py-1.5 rounded-full flex gap-2 items-center">
                      <MapPin size={14} className="text-cyan-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{property.region}</span>
                    </Badge>
                  </div>
                </div>

                {/* Conteúdo Informativo */}
                <div className="p-10">
                  <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {property.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-8 font-medium">{property.details}</p>

                  <div className="flex items-center justify-between border-t border-slate-800/50 pt-8">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">
                        Preço sob consulta
                      </span>
                      <span className="text-cyan-400 font-black text-2xl drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                        {property.price}
                      </span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white border border-white/5 transition-all group-hover:bg-cyan-500 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] group-hover:rotate-6">
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
