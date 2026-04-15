import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const properties = [
  {
    slug: "machado-santos",
    name: "Edifício Machado Santos",
    region: "Margem Sul",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000",
    price: "285.000€ – 395.000€",
    details: "T0 – T2 · Design Minimalista",
  },
  {
    slug: "horizon-view",
    name: "Horizon View Residence",
    region: "Lisboa",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000",
    price: "1.450.000€ – 2.300.000€",
    details: "T3 – T4 · Vista Panorâmica",
  },
];

export const FeaturedPropertiesSection = () => {
  return (
    <section className="py-24 bg-[#06080F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-4">Em Destaque</h2>
          <div className="h-1.5 w-24 bg-cyan-500 mx-auto rounded-full shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {properties.map((property) => (
            <Link key={property.slug} to={`/imoveis/${property.slug}`} className="group block">
              <div className="bg-[#0B1120] rounded-[3rem] overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-500">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-black/60 text-white border-white/10 px-4 py-1.5 rounded-full flex gap-2 items-center">
                      <MapPin size={14} className="text-cyan-400" />
                      <span className="text-[10px] font-bold uppercase">{property.region}</span>
                    </Badge>
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {property.name}
                  </h3>
                  <p className="text-cyan-400 font-black text-2xl mt-4">{property.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
