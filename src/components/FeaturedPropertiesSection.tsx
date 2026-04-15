import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Zap, Activity } from "lucide-react";

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
    <section className="py-32 bg-[#06080F] relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="text-left">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Conexões Ativas</h2>
            <p className="text-cyan-500 font-mono text-sm tracking-widest">SISTEMA DE MATCHMAKING EM TEMPO REAL</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3">
              <Activity size={16} className="text-green-500 animate-pulse" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                342 Negociações Diretas
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {properties.map((p) => (
            <Link key={p.slug} to={`/imoveis/${p.slug}`} className="group relative">
              <div className="bg-[#0B1120]/80 backdrop-blur-xl rounded-[4rem] border border-white/5 p-4 transition-all duration-700 hover:border-cyan-500/50 hover:shadow-[0_0_80px_rgba(6,182,212,0.15)]">
                {/* Image Container */}
                <div className="relative aspect-[16/9] rounded-[3.5rem] overflow-hidden">
                  <img
                    src={p.image}
                    className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent opacity-60" />

                  {/* Match Score */}
                  <div className="absolute top-6 right-6 w-16 h-16 bg-black/60 backdrop-blur-md rounded-full border border-cyan-500/50 flex flex-col items-center justify-center">
                    <span className="text-[8px] text-cyan-400 font-bold">MATCH</span>
                    <span className="text-sm font-black text-white">{p.match}</span>
                  </div>
                </div>

                <div className="p-10 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-3xl font-black text-white group-hover:text-cyan-400 transition-colors tracking-tighter">
                        {p.name}
                      </h3>
                      <p className="text-slate-500 font-mono text-[10px] mt-1">{p.region}</p>
                    </div>
                    <ShieldCheck className="text-cyan-500" size={24} />
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                        Valor de Negociação
                      </p>
                      <p className="text-3xl font-black text-white mt-1">{p.price}</p>
                    </div>
                    <div className="flex items-center gap-2 px-6 py-3 bg-cyan-500 rounded-2xl text-black font-black text-sm group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all">
                      <Zap size={16} fill="black" />
                      CONECTAR
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
