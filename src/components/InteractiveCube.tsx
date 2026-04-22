"use client";

import { useState, useRef, useEffect } from "react";
import { Home, TrendingUp, Landmark, Key, Settings } from "lucide-react";

interface FaceConfig {
  label: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  position: "top" | "front" | "back" | "left" | "right" | "bottom";
}

const faceConfigs: FaceConfig[] = [
  {
    label: "VIZ",
    icon: null,
    color: "#ffffff",
    glowColor: "#ffffff",
    position: "top",
  },
  {
    label: "COMPRAR",
    icon: <Home size={64} strokeWidth={1.5} />,
    color: "#00ffff",
    glowColor: "#00bfff",
    position: "front",
  },
  {
    label: "VENDER",
    icon: <TrendingUp size={64} strokeWidth={1.5} />,
    color: "#00bfff",
    glowColor: "#00ffff",
    position: "back",
  },
  {
    label: "ARRENDAR",
    icon: <Key size={64} strokeWidth={1.5} />,
    color: "#7db3ff",
    glowColor: "#4da6ff",
    position: "left",
  },
  {
    label: "GERIR",
    icon: <Settings size={64} strokeWidth={1.5} />,
    color: "#00ffff",
    glowColor: "#00bfff",
    position: "right",
  },
  {
    label: "FINANCIAR",
    icon: <Landmark size={64} strokeWidth={1.5} />,
    color: "#a8d5ff",
    glowColor: "#7db3ff",
    position: "bottom",
  },
];

const NeonGlassCube = () => {
  const [rotation, setRotation] = useState({ x: -20, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const lastPos = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>();
  const dragTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!autoRotate) return;
    const animate = () => {
      setRotation((r) => ({ x: r.x, y: r.y + 0.15 }));
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [autoRotate]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setRotation((r) => ({
      x: r.x - dy * 0.5,
      y: r.y + dx * 0.5,
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
    dragTimeoutRef.current = setTimeout(() => setAutoRotate(true), 2000);
  };

  const cubeSize = 300;
  const perspective = 1200;

  const faceTransforms = [
    `translateZ(${cubeSize / 2}px)`, // top
    `rotateY(0deg) translateZ(${cubeSize / 2}px)`, // front
    `rotateY(180deg) translateZ(${cubeSize / 2}px)`, // back
    `rotateY(-90deg) translateZ(${cubeSize / 2}px)`, // left
    `rotateY(90deg) translateZ(${cubeSize / 2}px)`, // right
    `rotateX(-90deg) translateZ(${cubeSize / 2}px)`, // bottom
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full mix-blend-screen filter blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, #0099ff 0%, transparent 70%)",
            top: "20%",
            left: "10%",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, #ff00ff 0%, transparent 70%)",
            bottom: "20%",
            right: "10%",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Cube container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          perspective: `${perspective}px`,
          width: cubeSize * 1.5,
          height: cubeSize * 1.5,
        }}
      >
        {/* Glow effect around cube */}
        <div
          className="absolute w-full h-full rounded-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, rgba(0, 150, 255, 0.1) 40%, transparent 70%)",
            filter: "blur(30px)",
            zIndex: 1,
          }}
        />

        {/* Interactive cube */}
        <div
          className="cursor-grab active:cursor-grabbing relative"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{
            perspective: `${perspective}px`,
            width: cubeSize,
            height: cubeSize,
            zIndex: 10,
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: isDragging ? "none" : "transform 0.05s linear",
            }}
          >
            {/* Render all 6 faces */}
            {faceConfigs.map((config, index) => (
              <NeonGlassFace key={index} config={config} size={cubeSize} transform={faceTransforms[index]} />
            ))}

            {/* Inner glow effect */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                transformStyle: "preserve-3d",
                background: "radial-gradient(circle at center, rgba(0, 255, 255, 0.2) 0%, transparent 70%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="relative z-20 mt-8 text-center">
        <h2
          className="text-3xl font-black tracking-wider"
          style={{
            color: "#00ffff",
            textShadow: "0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 100, 255, 0.3)",
          }}
        >
          SuperApp da Casa
        </h2>
        <p className="text-xs text-cyan-400 mt-3 opacity-75">🖱️ Arraste para rotacionar | 📱 Toque para interagir</p>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(30px);
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(0, 255, 255, 0.8));
          }
        }

        @keyframes liquid-flow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
};

interface NeonGlassFaceProps {
  config: FaceConfig;
  size: number;
  transform: string;
}

const NeonGlassFace = ({ config, size, transform }: NeonGlassFaceProps) => {
  const isLogo = config.label === "VIZ";

  return (
    <div
      className="absolute flex flex-col items-center justify-center rounded-2xl"
      style={{
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        marginLeft: -size / 2,
        marginTop: -size / 2,
        transformStyle: "preserve-3d",
        transform: transform,
        backfaceVisibility: "hidden",
        // Base glass material
        background: `linear-gradient(135deg, 
          rgba(74, 166, 255, 0.25) 0%,
          rgba(0, 180, 255, 0.2) 40%,
          rgba(0, 100, 180, 0.15) 100%)`,
        backdropFilter: "blur(20px) saturate(1.5)",
        WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        border: "2px solid rgba(100, 200, 255, 0.4)",
        boxShadow: `
          inset 0 1px 0 rgba(255, 255, 255, 0.6),
          inset 0 -1px 0 rgba(0, 50, 100, 0.3),
          0 0 40px ${config.glowColor}66,
          0 0 80px ${config.glowColor}33,
          0 20px 50px rgba(0, 50, 100, 0.4)
        `,
      }}
    >
      {/* Top shine/specular highlight */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `linear-gradient(180deg, 
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0.2) 30%,
            transparent 60%)`,
          top: 0,
          left: 0,
          right: 0,
          height: "40%",
        }}
      />

      {/* Liquid effect lines */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background: `linear-gradient(90deg, 
            transparent 0%,
            rgba(0, 255, 255, 0.1) 25%,
            rgba(0, 150, 255, 0.1) 50%,
            rgba(0, 100, 200, 0.1) 75%,
            transparent 100%)`,
          animation: "liquid-flow 4s ease-in-out infinite",
          backgroundSize: "200% 100%",
        }}
      />

      {/* Bottom rim glow */}
      <div
        className="absolute pointer-events-none bottom-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, 
            transparent,
            ${config.glowColor},
            transparent)`,
          filter: "blur(2px)",
          opacity: 0.6,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {isLogo ? (
          // VIZ Logo
          <div
            style={{
              fontSize: "120px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: config.color,
              textShadow: `
                0 0 20px ${config.glowColor}cc,
                0 0 40px ${config.glowColor}99,
                0 0 60px ${config.glowColor}66,
                0 2px 10px rgba(0, 0, 0, 0.5)
              `,
              fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif",
              animation: "glow-pulse 3s ease-in-out infinite",
            }}
          >
            {config.label}
          </div>
        ) : (
          // Icon + Label
          <>
            <div
              style={{
                color: config.color,
                filter: `drop-shadow(0 0 16px ${config.glowColor}99) 
                         drop-shadow(0 0 8px ${config.glowColor}66)`,
                animation: "glow-pulse 2.5s ease-in-out infinite",
              }}
            >
              {config.icon}
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: config.color,
                textShadow: `
                  0 0 16px ${config.glowColor}cc,
                  0 0 32px ${config.glowColor}66,
                  0 2px 8px rgba(0, 0, 0, 0.4)
                `,
                fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif",
              }}
            >
              {config.label}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NeonGlassCube;
