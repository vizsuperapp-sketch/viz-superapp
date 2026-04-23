"use client";

import { useState, useRef, useEffect } from "react";
import { Home, Handshake, Key, PiggyBank, Calendar } from "lucide-react";

interface FaceConfig {
  label: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  position: "top" | "front" | "back" | "left" | "right" | "bottom";
}

const faceConfigs: FaceConfig[] = [
  { label: "VIZ", icon: null, color: "#ffffff", glowColor: "#00ffff", position: "top" },
  { label: "COMPRAR", icon: <Handshake size={56} strokeWidth={2} />, color: "#aef6ff", glowColor: "#00e5ff", position: "front" },
  { label: "VENDER", icon: <Home size={56} strokeWidth={2} />, color: "#bfe9ff", glowColor: "#00bfff", position: "back" },
  { label: "ARRENDAR", icon: <Key size={56} strokeWidth={2} />, color: "#cfe6ff", glowColor: "#4da6ff" , position: "left" },
  { label: "GERIR", icon: <Calendar size={56} strokeWidth={2} />, color: "#aef6ff", glowColor: "#00e5ff", position: "right" },
  { label: "FINANCIAR", icon: <PiggyBank size={56} strokeWidth={2} />, color: "#d8ecff", glowColor: "#7db3ff", position: "bottom" },
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
    setRotation((r) => ({ x: r.x - dy * 0.4, y: r.y + dx * 0.4 }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
    dragTimeoutRef.current = setTimeout(() => setAutoRotate(true), 2500);
  };

  const cubeSize = 280;
  const perspective = 1400;

  const faceTransforms = [
    `rotateX(90deg) translateZ(${cubeSize / 2}px)`,
    `translateZ(${cubeSize / 2}px)`,
    `rotateY(180deg) translateZ(${cubeSize / 2}px)`,
    `rotateY(-90deg) translateZ(${cubeSize / 2}px)`,
    `rotateY(90deg) translateZ(${cubeSize / 2}px)`,
    `rotateX(-90deg) translateZ(${cubeSize / 2}px)`,
  ];

  return (
    <div
      className="w-full flex flex-col items-center justify-center relative"
      style={{ minHeight: 520 }}
    >
      {/* Subtle ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-80 h-80 rounded-full mix-blend-screen filter blur-3xl opacity-25"
          style={{
            background: "radial-gradient(circle, #0099ff 0%, transparent 70%)",
            top: "10%",
            left: "10%",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, #00ffff 0%, transparent 70%)",
            bottom: "15%",
            right: "10%",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Cube container */}
      <div
        className="relative flex items-center justify-center"
        style={{ perspective: `${perspective}px`, width: cubeSize * 1.5, height: cubeSize * 1.5 }}
      >
        {/* Ground shadow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: cubeSize * 1.1,
            height: cubeSize * 0.25,
            bottom: "12%",
            background: "radial-gradient(ellipse, rgba(0,180,255,0.45) 0%, rgba(0,120,200,0.15) 40%, transparent 75%)",
            filter: "blur(40px)",
            animation: "shadow-pulse 4s ease-in-out infinite",
          }}
        />

        {/* Outer glow */}
        <div
          className="absolute w-full h-full rounded-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 200, 255, 0.22) 0%, rgba(0, 120, 200, 0.08) 40%, transparent 70%)",
            filter: "blur(60px)",
            zIndex: 1,
            animation: "pulse-glow 3s ease-in-out infinite",
          }}
        />

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
            {faceConfigs.map((config, index) => (
              <LiquidGlassFace key={index} config={config} size={cubeSize} transform={faceTransforms[index]} />
            ))}
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="relative z-20 mt-4 text-center">
        <h2
          className="text-2xl font-black tracking-wider"
          style={{
            color: "#a8d5ff",
            textShadow: "0 0 30px rgba(100, 180, 255, 0.6), 0 0 60px rgba(50, 120, 200, 0.3)",
          }}
        >
          SuperApp da Casa
        </h2>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.4; }
        }
        @keyframes shadow-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes neon-pulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.25); }
        }
        @keyframes light-sweep {
          0% { transform: translateX(-150%) rotate(25deg); opacity: 0; }
          15% { opacity: 0.6; }
          50% { opacity: 0.6; }
          85% { opacity: 0; }
          100% { transform: translateX(150%) rotate(25deg); opacity: 0; }
        }
        @keyframes liquid-shimmer {
          0%, 100% { background-position: 0% 50%; opacity: 0.25; }
          50% { background-position: 100% 50%; opacity: 0.45; }
        }
      `}</style>
    </div>
  );
}

interface LiquidGlassFaceProps {
  config: FaceConfig;
  size: number;
  transform: string;
}

function LiquidGlassFace({ config, size, transform }: LiquidGlassFaceProps) {
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
        background: "rgba(180, 220, 255, 0.04)",
        border: "2px solid hsla(190, 100%, 70%, 0.55)",
        mixBlendMode: "screen",
        boxShadow: `
          inset 0 2px 4px rgba(255, 255, 255, 0.55),
          inset 0 -2px 6px rgba(0, 40, 80, 0.25),
          inset 0 0 30px rgba(120, 220, 255, 0.12),
          0 0 25px ${config.glowColor}66,
          0 0 60px ${config.glowColor}33,
          0 20px 60px rgba(0, 40, 80, 0.4)
        `,
      }}
    >
      {/* Liquid interior */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "1rem",
          background: `linear-gradient(135deg, 
            rgba(180, 230, 255, 0.10) 0%,
            rgba(100, 200, 255, 0.05) 40%,
            rgba(80, 160, 255, 0.08) 100%)`,
          backgroundSize: "200% 200%",
          animation: "liquid-shimmer 5s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Ice drips at top */}
      <svg
        style={{ position: "absolute", top: -2, left: 0, width: "100%", height: "40%", pointerEvents: "none", filter: "blur(0.5px)" }}
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`drip-${config.label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(220, 245, 255, 0.7)" />
            <stop offset="60%" stopColor="rgba(180, 220, 255, 0.25)" />
            <stop offset="100%" stopColor="rgba(180, 220, 255, 0)" />
          </linearGradient>
        </defs>
        <path d="M 20 0 Q 22 30, 18 55 Q 16 70, 20 78 Q 24 70, 22 55 Q 18 30, 20 0 Z" fill={`url(#drip-${config.label})`} />
        <path d="M 60 0 Q 64 40, 58 70 Q 55 88, 60 95 Q 65 88, 62 70 Q 56 40, 60 0 Z" fill={`url(#drip-${config.label})`} />
        <path d="M 110 0 Q 113 25, 108 45 Q 106 58, 110 65 Q 114 58, 112 45 Q 107 25, 110 0 Z" fill={`url(#drip-${config.label})`} />
        <path d="M 155 0 Q 158 35, 152 60 Q 150 75, 155 82 Q 160 75, 157 60 Q 152 35, 155 0 Z" fill={`url(#drip-${config.label})`} />
        <path d="M 185 0 Q 188 20, 184 38 Q 182 50, 185 56 Q 188 50, 186 38 Q 183 20, 185 0 Z" fill={`url(#drip-${config.label})`} />
      </svg>

      {/* Specular highlight */}
      <div
        style={{
          position: "absolute",
          top: "6%",
          left: "10%",
          width: "38%",
          height: "30%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, transparent 70%)",
          filter: "blur(2px)",
          pointerEvents: "none",
        }}
      />

      {/* Sweeping light band */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "60%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
          animation: "light-sweep 8s ease-in-out infinite",
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />

      {/* Bottom edge glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          right: "10%",
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${config.glowColor}aa, transparent)`,
          filter: "blur(1px)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center gap-3"
        style={{ animation: "neon-pulse 2.5s ease-in-out infinite" }}
      >
        {isLogo ? (
          <div
            style={{
              fontSize: "100px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              textShadow: `
                0 0 10px #ffffff,
                0 0 25px ${config.glowColor},
                0 0 50px ${config.glowColor},
                0 0 80px ${config.glowColor}88,
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
                filter: `drop-shadow(0 0 12px ${config.glowColor}) drop-shadow(0 0 24px ${config.glowColor}88)`,
              }}
            >
              {config.icon}
            </div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                color: config.color,
                textShadow: `
                  0 0 8px ${config.glowColor},
                  0 0 18px ${config.glowColor}aa,
                  0 0 36px ${config.glowColor}66,
                  0 2px 6px rgba(0, 0, 0, 0.4)
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
