import React from "react";
import { InteractiveCube } from "./InteractiveCube";

// Exportação NOMEADA para resolver o erro do Index.tsx
export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#06080F]">
      {/* Luzes de fundo para profundidade */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Lado Esquerdo: Texto de Impacto */}
        <div className="text-left space-y-8">
          <div className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">
            VIZ SuperApp · Real Estate Future
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter">
            IMÓVEIS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              INTERATIVOS
            </span>
          </h1>

          <p className="text-slate-400 text-xl max-w-lg leading-relaxed">
            A primeira plataforma imobiliária que transforma a sua procura numa experiência visual única e tecnológica.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-cyan-500 text-black font-black rounded-2xl hover:bg-cyan-400 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-1">
              EXPLORAR AGORA
            </button>
            <button className="px-8 py-4 border border-slate-700 text-white font-bold rounded-2xl hover:bg-white/5 transition-all">
              SAIBA MAIS
            </button>
          </div>
        </div>

        {/* Lado Direito: O Teu Cubo Interativo */}
        <div className="relative flex justify-center items-center h-[500px]">
          <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
          <InteractiveCube />
        </div>
      </div>
    </section>
  );
};
