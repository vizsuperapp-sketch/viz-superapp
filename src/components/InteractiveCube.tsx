"use client";

import { useState, useRef, useEffect } from "react";
import { Home, Handshake, Key, Settings, PiggyBank, Calendar } from "lucide-react";

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
    icon: <Handshake size={64} strokeWidth={1.5} />,
    color: "#00ffff",
    glowColor: "#00bfff",
    position: "front",
  },
  {
    label: "VENDER",
    icon: <Home size={64} strokeWidth={1.5} />,
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
    icon: <Calendar size={64} strokeWidth={1.5} />,
    color: "#00ffff",
    glowColor: "#00bfff",
    position: "right",
  },
  {
    label: "FINANCIAR",
    icon: <PiggyBank size={64} strokeWidth={1.5} />,
    color: "#a8d5ff",
    glowColor: "#7db3ff",
    position: "bottom",
  },
];

export default function RealisticGlassCube() {
  const [rotation, setRotation] = useState({ x: -22, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const lastPos = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>();
  const dragTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!autoRotate) return;
    const animate = () => {
      setRotation((r) => ({ x: r.x, y: r.y + 0.12 }));
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
      x: r.x - dy * 0.4,
      y: r.y + dx * 0.4,
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
    dragTimeoutRef.current = setTimeout(() => setAutoRotate(true), 2500);
  };

  const cubeSize = 320;
  const perspective = 1200;

  const faceTransforms = [
    `rotateX(90deg) translateZ(${cubeSize / 2}px)`,
    `translateZ(${cubeSize / 2}px)`,
    `rotateY(180deg) translateZ(${cubeSize / 2}px)`,
    `rotateY(-90deg) translateZ(${cubeSize / 2}px)`,
    `rotateY(90deg) translateZ(${cubeSize / 2}px)`,
    `rotateX(-90deg) translateZ(${cubeSize / 2}px)`,
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
        <div
          className="absolute w-96 h-96 rounded-full mix-blend-screen filter blur-3xl opacity-25"
          style={{
            background: "radial-gradient(circle, #00ffff 0%, transparent 70%)",
            bottom: "10%",
            right: "5%",
            animation: "float 9s ease-in-out infinite",
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
              "radial-gradient(circle, rgba(100, 180, 255, 0.25) 0%, rgba(50, 120, 180, 0.1) 40%, transparent 70%)",
            filter: "blur(50px)",
            zIndex: 1,
            animation: "pulse-glow 3s ease-in-out infinite",
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
              transition: isDragging ? "none" : "transform 0.08s linear",
            }}
          >
            {/* Render all 6 faces */}
            {faceConfigs.map((config, index) => (
              <RealisticGlassFace key={index} config={config} size={cubeSize} transform={faceTransforms[index]} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="relative z-20 mt-8 text-center">
        <h2
          className="text-3xl font-black tracking-wider"
          style={{
            color: "#a8d5ff",
            textShadow: "0 0 30px rgba(100, 180, 255, 0.6), 0 0 60px rgba(50, 120, 200, 0.3)",
          }}
        >
          SuperApp da Casa
        </h2>
        <p className="text-xs text-cyan-400 mt-3 opacity-75">🖱️ Arraste para rotacionar | 📱 Toque para interagir</p>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(30px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            filter: blur(50px);
            opacity: 0.25;
          }
          50% {
            filter: blur(50px);
            opacity: 0.35;
          }
        }

        @keyframes liquid-shimmer {
          0%, 100% {
            background-position: 0% 50%;
            opacity: 0.2;
          }
          50% {
            background-position: 100% 50%;
            opacity: 0.4;
          }
        }

        @keyframes glass-reflect {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

interface RealisticGlassFaceProps {
  config: FaceConfig;
  size: number;
  transform: string;
}

function RealisticGlassFace({ config, size, transform }: RealisticGlassFaceProps) {
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
        background: `linear-gradient(135deg, 
          rgba(150, 220, 255, 0.12) 0%,
          rgba(120, 200, 255, 0.08) 50%,
          rgba(100, 180, 255, 0.06) 100%)`,
        backdropFilter: "blur(18px) saturate(1.3)",
        WebkitBackdropFilter: "blur(18px) saturate(1.3)",
        border: "1.5px solid rgba(180, 220, 255, 0.25)",
        boxShadow: `
          inset 0 1px 2px rgba(255, 255, 255, 0.5),
          inset 0 -1px 2px rgba(0, 30, 60, 0.15),
          0 20px 60px rgba(0, 40, 80, 0.35),
          0 0 40px ${config.glowColor}33,
          0 0 80px ${config.glowColor}22
        `,
      }}
    >
      {/* Liquid interior effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "1.5rem",
          background: `linear-gradient(45deg, 
            transparent 0%,
            rgba(100, 180, 255, 0.08) 30%,
            rgba(80, 160, 255, 0.06) 50%,
            transparent 100%)`,
          animation: "liquid-shimmer 4s ease-in-out infinite",
          backgroundSize: "200% 200%",
          pointerEvents: "none",
        }}
      />

      {/* Swirl effect */}
      <div
        style={{
          position: "absolute",
          inset: "20%",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(150, 200, 255, 0.15) 0%, transparent 70%)`,
          filter: "blur(18px)",
          animation: "liquid-shimmer 5s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />

      {/* Specular highlight */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "12%",
          width: "35%",
          height: "35%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "glass-reflect 3s ease-in-out infinite",
        }}
      />

      {/* Edge highlight */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "15%",
          right: "15%",
          height: "1px",
          background: `linear-gradient(90deg, 
            transparent,
            ${config.glowColor}66,
            transparent)`,
          filter: "blur(1px)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4">
        {isLogo ? (
          <div
            style={{
              fontSize: "110px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: config.color,
              textShadow: `
                0 0 30px ${config.glowColor}cc,
                0 0 60px ${config.glowColor}88,
                0 0 90px ${config.glowColor}55,
                0 3px 12px rgba(0, 0, 0, 0.4)
              `,
              fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif",
            }}
          >
            {config.label}
          </div>
        ) : (
          <>
            <div
              style={{
                color: config.color,
                filter: `drop-shadow(0 0 15px ${config.glowColor}99) 
                         drop-shadow(0 0 8px ${config.glowColor}66)`,
                opacity: 0.95,
              }}
            >
              {config.icon}
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: config.color,
                textShadow: `
                  0 0 14px ${config.glowColor}cc,
                  0 0 28px ${config.glowColor}77,
                  0 2px 6px rgba(0, 0, 0, 0.35)
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
}
