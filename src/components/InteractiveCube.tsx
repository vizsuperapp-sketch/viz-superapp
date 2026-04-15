import { useState, useRef, useEffect, forwardRef } from "react";
import { Home, TrendingUp, Landmark, Key, Settings, LucideIcon } from "lucide-react";

interface FaceData {
  label: string | null;
  icon: LucideIcon | null;
  isLogo: boolean;
}

const faces: FaceData[] = [
  { label: "VIZ", icon: null, isLogo: true },
  { label: "COMPRAR", icon: Home, isLogo: false },
  { label: "VENDER", icon: TrendingUp, isLogo: false },
  { label: "FINANCIAR", icon: Landmark, isLogo: false },
  { label: "ARRENDAR", icon: Key, isLogo: false },
  { label: "GERIR", icon: Settings, isLogo: false },
];

const InteractiveCube = () => {
  const [rotation, setRotation] = useState({ x: -22, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>();

  useEffect(() => {
    if (!autoRotate) return;
    const speed = isHovered ? 0.22 : 0.1;
    const animate = () => {
      setRotation((r) => ({ x: r.x, y: r.y + speed }));
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [autoRotate, isHovered]);

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
    setTimeout(() => setAutoRotate(true), 2000);
  };

  const cubeSize = 260;
  const half = cubeSize / 2;

  const faceTransforms = [
    `translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  const containerSize = cubeSize * 1.7;

  return (
    <div className="flex flex-col items-center select-none relative">
      {/* Light background backdrop */}
      <div
        className="absolute pointer-events-none z-0 rounded-[2rem]"
        style={{
          width: containerSize * 1.4,
          height: containerSize * 1.4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, hsla(200,60%,96%,0.15) 0%, hsla(200,40%,90%,0.08) 50%, transparent 75%)",
        }}
      />

      {/* Ground shadow beneath cube */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: containerSize * 0.75,
          height: cubeSize * 0.25,
          bottom: "6%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse 90% 70% at 50% 50%, hsla(180,70%,50%,0.35) 0%, hsla(180,60%,40%,0.15) 40%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: containerSize * 1.6,
          height: containerSize * 1.6,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, hsla(180,70%,55%,0.2) 0%, hsla(163,50%,50%,0.1) 35%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div
        className="animate-breathe cursor-grab active:cursor-grabbing relative z-10"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: 900, width: containerSize, height: containerSize }}
      >
        {/* Hover labels — glass pill style */}
        <div
          className="absolute pointer-events-none z-20 transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0, top: "50%", left: "-10px", transform: "translateY(-50%)" }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-1 rounded-full"
            style={{ color: "hsla(0,0%,100%,0.9)", background: "hsla(180,70%,50%,0.25)", border: "1px solid hsla(180,60%,70%,0.3)", backdropFilter: "blur(12px)" }}>
            Vender
          </span>
        </div>
        <div
          className="absolute pointer-events-none z-20 transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0, top: "50%", right: "-10px", transform: "translateY(-50%)" }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-1 rounded-full"
            style={{ color: "hsla(0,0%,100%,0.9)", background: "hsla(180,70%,50%,0.25)", border: "1px solid hsla(180,60%,70%,0.3)", backdropFilter: "blur(12px)" }}>
            Comprar
          </span>
        </div>
        <div
          className="absolute pointer-events-none z-20 transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0, bottom: "18%", left: "50%", transform: "translateX(-50%)" }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-1 rounded-full whitespace-nowrap"
            style={{ color: "hsla(0,0%,100%,0.9)", background: "hsla(180,70%,50%,0.25)", border: "1px solid hsla(180,60%,70%,0.3)", backdropFilter: "blur(12px)" }}>
            Financiar
          </span>
        </div>

        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? "none" : "transform 0.08s linear",
          }}
        >
          {faces.map((face, i) => (
            <CubeFace
              key={i}
              label={face.label}
              icon={face.icon}
              isLogo={face.isLogo}
              size={cubeSize}
              style={{ transform: faceTransforms[i] }}
            />
          ))}

          {/* Glowing core */}
          <div className="absolute" style={{
            width: cubeSize * 0.6, height: cubeSize * 0.6,
            top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, hsla(180,80%,60%,0.5) 0%, hsla(163,60%,50%,0.2) 40%, transparent 70%)",
            borderRadius: "50%", filter: "blur(25px)",
          }} />

          {/* Edge sparkle points */}
          {[
            { top: "0%", left: "0%", delay: "0s", s: 6 },
            { top: "0%", right: "0%", delay: "0.8s", s: 6 },
            { bottom: "0%", left: "0%", delay: "0.4s", s: 6 },
            { bottom: "0%", right: "0%", delay: "1.2s", s: 6 },
            { top: "0%", left: "50%", delay: "1.6s", s: 5 },
            { bottom: "0%", left: "50%", delay: "0.6s", s: 5 },
            { top: "50%", left: "0%", delay: "1.0s", s: 4 },
            { top: "50%", right: "0%", delay: "1.4s", s: 4 },
          ].map((sp, i) => (
            <div key={i} className="absolute pointer-events-none" style={{
              ...sp, width: sp.s, height: sp.s, borderRadius: "50%",
              background: "hsla(180,80%,95%,0.95)",
              boxShadow: "0 0 10px 4px hsla(180,70%,65%,0.6)",
              animation: `sparkle 2s ease-in-out ${sp.delay} infinite alternate`,
            }} />
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 relative z-10">
        Arraste para explorar
      </p>
    </div>
  );
};

interface CubeFaceProps {
  label: string | null;
  icon: LucideIcon | null;
  isLogo: boolean;
  size: number;
  style: React.CSSProperties;
}

const CubeFace = forwardRef<HTMLDivElement, CubeFaceProps>(({ label, icon: Icon, isLogo, size, style }, ref) => {
  const half = size / 2;
  return (
    <div
      ref={ref}
      className="absolute flex flex-col items-center justify-center gap-3"
      style={{
        width: size, height: size,
        left: "50%", top: "50%",
        marginLeft: -half, marginTop: -half,
        borderRadius: "1.25rem",
        background: `linear-gradient(145deg, hsla(163,70%,55%,0.5) 0%, hsla(180,75%,50%,0.45) 40%, hsla(200,80%,55%,0.5) 100%)`,
        backdropFilter: "blur(16px) saturate(1.6)",
        WebkitBackdropFilter: "blur(16px) saturate(1.6)",
        border: "2px solid hsla(180,80%,70%,0.7)",
        boxShadow: `
          inset 0 1px 0 hsla(0,0%,100%,0.5),
          inset 0 -1px 0 hsla(200,60%,40%,0.15),
          0 0 20px hsla(180,80%,60%,0.4),
          0 0 40px hsla(180,80%,60%,0.2),
          0 8px 32px hsla(200,60%,35%,0.2)
        `,
        backfaceVisibility: "hidden",
        ...style,
      }}
    >
      {/* Specular highlight — thick glass shine */}
      <div className="absolute pointer-events-none" style={{
        top: 0, left: 0, right: 0, height: "35%",
        background: "linear-gradient(180deg, hsla(0,0%,100%,0.5) 0%, hsla(0,0%,100%,0.15) 60%, transparent 100%)",
        borderRadius: "1.25rem 1.25rem 2rem 2rem",
      }} />

      {/* Bottom edge glow */}
      <div className="absolute pointer-events-none" style={{
        bottom: 0, left: "10%", right: "10%", height: "2px",
        background: "linear-gradient(90deg, transparent, hsla(180,80%,70%,0.5), transparent)",
      }} />

      {isLogo && label && (
        <span style={{
          fontSize: "80px", fontWeight: 800, lineHeight: 1,
          color: "hsla(0,0%,100%,0.97)",
          textShadow: "0 0 30px hsla(180,80%,60%,0.7), 0 0 60px hsla(180,80%,60%,0.35), 0 2px 8px hsla(200,60%,35%,0.3)",
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}>
          {label}
        </span>
      )}

      {!isLogo && Icon && (
        <Icon size={72} strokeWidth={1.5} style={{
          color: "hsla(0,0%,100%,0.95)",
          filter: "drop-shadow(0 0 16px hsla(180,80%,60%,0.6)) drop-shadow(0 2px 4px hsla(200,60%,35%,0.3))",
        }} />
      )}

      {!isLogo && label && (
        <span style={{
          fontSize: "24px", fontWeight: 700, lineHeight: 1,
          color: "hsla(0,0%,100%,0.95)",
          textShadow: "0 0 20px hsla(180,80%,60%,0.5), 0 2px 6px hsla(200,60%,35%,0.3)",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          letterSpacing: "0.08em",
        }}>
          {label}
        </span>
      )}
    </div>
  );
});

CubeFace.displayName = "CubeFace";

export default InteractiveCube;
