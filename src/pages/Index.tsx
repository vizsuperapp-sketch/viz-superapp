import React from "react";
import { Home, Handshake, Box } from "lucide-react";

const InteractiveCube = () => {
  return (
    <div className="relative flex items-center justify-center py-20">
      {/* Brilho de Fundo (Glow) */}
      <div className="absolute w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]" />

      {/* Representação Estilizada do Cubo (2D com perspetiva para evitar erros de render) */}
      <div className="relative z-10 grid grid-cols-1 gap-4">
        <div className="w-64 h-64 rounded-[3rem] border-2 border-cyan-400/50 bg-gradient-to-br from-white/10 to-cyan-500/20 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)]">
          <div className="absolute top-4 left-6 right-10 h-1/4 bg-white/20 rounded-full rotate-3 blur-[2px]" />
          <h2 className="text-7xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] mb-2">VIZ</h2>
          <div className="flex gap-4 mt-2">
            <Home size={40} className="text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            <Handshake size={40} className="text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          </div>
        </div>
        <p className="text-center text-cyan-400/60 text-xs tracking-widest font-medium">SUPER APP IMOBILIÁRIA</p>
      </div>
    </div>
  );
};

export default InteractiveCube;
