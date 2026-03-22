import { useState, useRef, useEffect } from "react";
import { Handshake, FileCheck, Wrench, Key, LayoutDashboard, DoorOpen } from "lucide-react";

const faces = [
  { icon: DoorOpen, label: "Vender" },
  { icon: Handshake, label: "Comprar" },
  { icon: Key, label: "Arrendar" },
  { icon: Wrench, label: "Serviços" },
  { icon: FileCheck, label: "Financiar" },
  { icon: LayoutDashboard, label: "Gerir" },
];

// Per-face gradients to match the 3D lighting in the reference
const faceGradients = [
  // Front — bright green
  "linear-gradient(160deg, hsl(155 55% 52%) 0%, hsl(163 50% 42%) 100%)",
  // Back — darker teal
  "linear-gradient(160deg, hsl(170 45% 38%) 0%, hsl(180 50% 32%) 100%)",
  // Right — cyan/teal (darker side)
  "linear-gradient(180deg, hsl(175 50% 45%) 0%, hsl(185 55% 35%) 100%)",
  // Left — yellow-green (lighter side)
  "linear-gradient(180deg, hsl(145 55% 55%) 0%, hsl(160 50% 42%) 100%)",
  // Top — light green with blue tint
  "linear-gradient(135deg, hsl(150 50% 55%) 0%, hsl(170 55% 45%) 100%)",
  // Bottom — dark
  "linear-gradient(135deg, hsl(170 45% 35%) 0%, hsl(180 50% 30%) 100%)",
];

const InteractiveCube = () => {
  const [rotation, setRotation] = useState({ x: -20, y: 35 });
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

  const size = 160;
  const half = size / 2;

  return (
    <div className="flex flex-col items-center select-none relative">
      {/* Wireframe house — blue tinted lines */}
      <svg
        className="absolute pointer-events-none z-0"
        viewBox="0 0 280 280"
        fill="none"
        strokeWidth="0.6"
        style={{
          width: size * 3.4,
          height: size * 3.4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -52%)",
          opacity: 0.18,
        }}
      >
        {/* Main house outline */}
        <path d="M140 35 L245 98 L245 235 L35 235 L35 98 Z" stroke="hsl(var(--viz-blue))" />
        <path d="M140 35 L35 98" stroke="hsl(var(--viz-blue))" />
        <path d="M140 35 L245 98" stroke="hsl(var(--viz-blue))" />
        <path d="M35 235 L245 235" stroke="hsl(var(--viz-blue))" />
        <path d="M35 98 L35 235" stroke="hsl(var(--viz-blue))" strokeOpacity="0.6" />
        <path d="M245 98 L245 235" stroke="hsl(var(--viz-blue))" strokeOpacity="0.6" />
        {/* Depth lines — 3D house effect */}
        <path d="M245 98 L280 78 L280 215 L245 235" stroke="hsl(var(--viz-blue))" strokeOpacity="0.3" />
        <path d="M140 35 L175 18" stroke="hsl(var(--viz-blue))" strokeOpacity="0.3" />
        <path d="M280 78 L175 18" stroke="hsl(var(--viz-blue))" strokeOpacity="0.25" />
        {/* Internal grid */}
        <path d="M90 98 L90 235" stroke="hsl(var(--viz-blue))" strokeOpacity="0.2" />
        <path d="M190 98 L190 235" stroke="hsl(var(--viz-blue))" strokeOpacity="0.2" />
        <path d="M35 165 L245 165" stroke="hsl(var(--viz-blue))" strokeOpacity="0.2" />
        {/* Window/door */}
        <path d="M115 235 L115 180 L165 180 L165 235" stroke="hsl(var(--viz-blue))" strokeOpacity="0.25" />
      </svg>

      {/* Outer glow — large soft green halo */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          width: size * 2.6,
          height: size * 2.6,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, hsla(163,50%,55%,0.35) 0%, hsla(163,45%,50%,0.15) 30%, hsla(175,60%,50%,0.06) 55%, transparent 75%)",
          filter: "blur(20px)",
        }}
      />

      {/* Saturn rings — glowing orbital rings */}
      <div
        className="absolute pointer-events-none z-[2]"
        style={{
          width: size * 3,
          height: size * 3,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -52%)",
          perspective: 600,
        }}
      >
        {/* Main ring */}
        <div
          className="w-full h-full rounded-full"
          style={{
            border: "2px solid hsla(163, 50%, 60%, 0.3)",
            borderRadius: "50%",
            transform: `rotateX(72deg) rotateZ(${rotation.y * 0.4}deg)`,
            boxShadow: `
              0 0 20px hsla(163,50%,55%,0.15),
              0 0 50px hsla(163,50%,55%,0.08),
              inset 0 0 20px hsla(163,50%,55%,0.08)
            `,
            transition: isDragging ? "none" : "transform 0.08s linear",
          }}
        />
        {/* Second ring */}
        <div
          className="absolute inset-4 rounded-full"
          style={{
            border: "1px solid hsla(163,50%,65%,0.15)",
            transform: `rotateX(72deg) rotateZ(${rotation.y * 0.35 + 15}deg)`,
            boxShadow: "0 0 15px hsla(163,50%,55%,0.06)",
            transition: isDragging ? "none" : "transform 0.08s linear",
          }}
        />
      </div>

      {/* Sparkle particles */}
      <div className="absolute pointer-events-none z-[3]" style={{
        width: size * 3,
        height: size * 3,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1.5,
              height: Math.random() * 3 + 1.5,
              background: "hsla(163, 60%, 70%, 0.6)",
              boxShadow: "0 0 4px hsla(163, 60%, 70%, 0.4)",
              top: `${15 + Math.random() * 70}%`,
              left: `${15 + Math.random() * 70}%`,
              animation: `sparkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Breathing wrapper + interaction layer */}
      <div
        className="animate-breathe cursor-grab active:cursor-grabbing relative z-10"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: 700, width: size * 1.6, height: size * 1.6 }}
      >
        {/* Rotation container */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? "none" : "transform 0.08s linear",
          }}
        >
          {faces.map((face, i) => {
            const transforms = [
              `translateZ(${half}px)`,
              `rotateY(180deg) translateZ(${half}px)`,
              `rotateY(90deg) translateZ(${half}px)`,
              `rotateY(-90deg) translateZ(${half}px)`,
              `rotateX(90deg) translateZ(${half}px)`,
              `rotateX(-90deg) translateZ(${half}px)`,
            ];
            return (
              <CubeFace
                key={face.label}
                icon={face.icon}
                label={face.label}
                size={size}
                gradient={faceGradients[i]}
                style={{ transform: transforms[i] }}
              />
            );
          })}
        </div>
      </div>

      <p className="text-xs text-muted-foreground/40 mt-4 relative z-10">Arraste para explorar</p>
    </div>
  );
};

interface CubeFaceProps {
  icon: typeof Handshake;
  label: string;
  size: number;
  gradient: string;
  style: React.CSSProperties;
}

const CubeFace = ({ icon: Icon, label, size, gradient, style }: CubeFaceProps) => {
  const half = size / 2;
  return (
    <div
      className="absolute flex flex-col items-center justify-center gap-2.5"
      style={{
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        marginLeft: -half,
        marginTop: -half,
        borderRadius: "1.25rem",
        background: gradient,
        border: "1px solid hsla(163, 60%, 70%, 0.45)",
        boxShadow: `
          inset 0 1px 0 hsla(160, 60%, 80%, 0.35),
          inset 0 -2px 6px hsla(170, 40%, 20%, 0.2),
          0 6px 30px hsla(163, 50%, 45%, 0.3),
          0 2px 6px rgba(0, 0, 0, 0.12)
        `,
        backfaceVisibility: "hidden",
        ...style,
      }}
    >
      <Icon
        size={42}
        strokeWidth={2}
        fill="white"
        fillOpacity={0.15}
        className="text-white drop-shadow-md"
      />
      <span className="text-[10px] font-bold tracking-widest uppercase text-white/80 drop-shadow-sm">
        {label}
      </span>
    </div>
  );
};

export default InteractiveCube;
