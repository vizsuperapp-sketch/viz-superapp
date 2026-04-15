import React from "react";
import { InteractiveCube } from "./InteractiveCube";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#06080F]">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight">
            IMÓVEIS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              INTERATIVOS
            </span>
          </h1>
        </div>
        <div className="relative h-[500px]">
          <InteractiveCube />
        </div>
      </div>
    </section>
  );
};
