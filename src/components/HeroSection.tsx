import React from "react";
import InteractiveCube from "./InteractiveCube";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#06080F]">
      {/* Grelha 3D de Fundo */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Luzes de Profundidade Neon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-left space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Protocolo 0% Comissões Ativo
          </div>

          <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter">
            VIZ
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
              REVOLUTION
            </span>
          </h1>

          <p className="text-slate-400 text-xl max-w-lg leading-relaxed font-medium">
            Desintermediamos o mercado. Conectamos compradores e vendedores diretamente através de inteligência visual.
            Sem taxas. Sem barreiras.
          </p>

          <div className="flex flex-wrap gap-6">
            <button className="group relative px-10 py-5 bg-cyan-500 text-black font-black rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(6,182,212,0.4)]">
              INICIAR MATCHMAKING
              <div className="absolute inset-0 rounded-2xl border-2 border-white/20 scale-110 opacity-0 group-hover:opacity-100 transition-all"></div>
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center h-[600px]">
          <div className="absolute w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[120px]" />
          <InteractiveCube />
        </div>
      </div>
    </section>
  );
};
