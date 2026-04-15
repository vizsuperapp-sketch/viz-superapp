import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Zap, ShieldCheck } from "lucide-react";

const properties = [
  {
    slug: "machado-santos",
    name: "OPERAÇÃO M. SANTOS",
    region: "ALGO: MARGEM SUL",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200",
    price: "285.000€",
    match: "98%",
  },
  {
    slug: "horizon-view",
    name: "OPERAÇÃO HORIZON",
    region: "ALGO: LISBOA",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
    price: "1.450.000€",
    match: "94%",
  },
];

export const FeaturedPropertiesSection = () => {
  return (
    <section className="py-24 bg-[#06080F]">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-left">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Conexões Ativas</h2>
          <p className="text-cyan-500 font-mono text-xs tracking-[0.3em]">SISTEMA DE MATCHMAKING VIZ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {properties.map((p) => (
            <Link key={p.slug} to={`/imoveis/${p.slug}`} className="group">
              <div className="bg-[#0B1120] rounded-[3rem] overflow-hidden border border-slate-800 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-6 right-6 w-14 h-14 bg-black/60 backdrop-blur-md rounded-full border border-cyan-500 flex flex-col items-center justify-center">
                    <span className="text-[7px] text-cyan-400 font-bold">MATCH</span>
                    <span className="text-xs font-black text-white">{p.match}</span>
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                      {p.name}
                    </h3>
                    <ShieldCheck className="text-cyan-500" size={20} />
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                    <span className="text-cyan-400 font-black text-2xl">{p.price}</span>
                    <div className="flex items-center gap-2 px-5 py-2 bg-cyan-500 rounded-xl text-black font-black text-[10px]">
                      <Zap size={12} fill="black" /> CONECTAR
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
