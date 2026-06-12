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
  { label: "VIZ", icon: null, color: "#ffffff", glowColor: "#ffffff", position: "top" },
  { label: "COMPRAR", icon: <Handshake size={48} strokeWidth={1.5} />, color: "#00ffff", glowColor: "#00bfff", position: "front" },
  { label: "VENDER", icon: <Home size={48} strokeWidth={1.5} />, color: "#00bfff", glowColor: "#00ffff", position: "back" },
  { label: "ARRENDAR", icon: <Key size={48} strokeWidth={1.5} />, color: "#7db3ff", glowColor: "#4da6ff", position: "left" },
  { label: "GERIR", icon: <Calendar size={48} strokeWidth={1.5} />, color: "#00ffff", glowColor: "#00bfff", position: "right" },
  { label: "FINANCIAR", icon: <PiggyBank size={48} strokeWidth={1.5} />, color: "#a8d5ff", glowColor: "#7db3ff", position: "bottom" },
];

export default function RealisticGlassCube() {
  const [isMobile, setIsMobile] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef({ x: -22, y: 35 });
  const draggingRef = useRef(false);
  const autoRotateRef = useRef(true);
  const lastPos = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>();
  const resumeTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Direct DOM transform updates — no React re-render per frame
  useEffect(() => {
    const applyTransform = () => {
      if (innerRef.current) {
        innerRef.current.style.transform = `rotateX(${rotRef.current.x}deg) rotateY(${rotRef.current.y}deg)`;
      }
    };
    const animate = () => {
      if (autoRotateRef.current && !draggingRef.current) {
        rotRef.current.y += 0.12;
      }
      applyTransform();
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    autoRotateRef.current = false;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    rotRef.current = {
      x: rotRef.current.x - dy * 0.4,
      y: rotRef.current.y + dx * 0.4,
    };
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      autoRotateRef.current = true;
    }, 2500);
  };

  const cubeSize = isMobile ? 220 : 320;
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
    <div className="relative flex items-center justify-center max-w-full">
      {/* Cube container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          perspective: `${perspective}px`,
          width: cubeSize,
          height: cubeSize,
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
            animation: isMobile ? undefined : "pulse-glow 3s ease-in-out infinite",
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
            touchAction: "none",
          }}
        >
          <div
            ref={innerRef}
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotRef.current.x}deg) rotateY(${rotRef.current.y}deg)`,
              willChange: "transform",
            }}
          >
            {faceConfigs.map((config, index) => (
              <RealisticGlassFace
                key={index}
                config={config}
                size={cubeSize}
                transform={faceTransforms[index]}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { filter: blur(50px); opacity: 0.25; }
          50% { filter: blur(50px); opacity: 0.35; }
        }
        @keyframes liquid-shimmer {
          0%, 100% { background-position: 0% 50%; opacity: 0.2; }
          50% { background-position: 100% 50%; opacity: 0.4; }
        }
        @keyframes glass-reflect {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

interface RealisticGlassFaceProps {
  config: FaceConfig;
  size: number;
  transform: string;
  isMobile: boolean;
}

function RealisticGlassFace({ config, size, transform, isMobile }: RealisticGlassFaceProps) {
  const isLogo = config.label === "VIZ";
  const blur = isMobile ? "blur(6px) saturate(1.1)" : "blur(12px) saturate(1.2)";
  const logoFont = isMobile ? 78 : 110;
  const labelFont = isMobile ? 18 : 24;

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
          rgba(150, 220, 255, 0.08) 0%,
          rgba(120, 200, 255, 0.05) 50%,
          rgba(100, 180, 255, 0.035) 100%)`,
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        border: "1.5px solid rgba(180, 220, 255, 0.18)",
        boxShadow: `
          inset 0 1px 2px rgba(255, 255, 255, 0.35),
          inset 0 -1px 2px rgba(0, 30, 60, 0.10),
          0 20px 60px rgba(0, 40, 80, 0.35),
          0 0 40px ${config.glowColor}33,
          0 0 80px ${config.glowColor}22
        `,
      }}
    >
      {/* Liquid interior — desktop only */}
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "1.5rem",
            background: `linear-gradient(45deg,
              transparent 0%,
              rgba(100, 180, 255, 0.05) 30%,
              rgba(80, 160, 255, 0.04) 50%,
              transparent 100%)`,
            animation: "liquid-shimmer 4s ease-in-out infinite",
            backgroundSize: "200% 200%",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Swirl */}
      <div
        style={{
          position: "absolute",
          inset: "20%",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(150, 200, 255, 0.10) 0%, transparent 70%)`,
          filter: "blur(18px)",
          animation: isMobile ? undefined : "liquid-shimmer 5s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />

      {/* Specular */}
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
          animation: isMobile ? undefined : "glass-reflect 3s ease-in-out infinite",
        }}
      />

      {/* Edge */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "15%",
          right: "15%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${config.glowColor}66, transparent)`,
          filter: "blur(1px)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4">
        {isLogo ? (
          <div
            style={{
              fontSize: `${logoFont}px`,
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
                filter: `drop-shadow(0 0 15px ${config.glowColor}99) drop-shadow(0 0 8px ${config.glowColor}66)`,
                opacity: 0.95,
              }}
            >
              {config.icon}
            </div>
            <div
              style={{
                fontSize: `${labelFont}px`,
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
