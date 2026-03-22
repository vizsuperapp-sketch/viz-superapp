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
      {/* Wireframe house */}
      <svg
        className="absolute pointer-events-none z-0"
        viewBox="0 0 280 280"
        fill="none"
        strokeWidth="0.7"
        style={{
          width: size * 3.2,
          height: size * 3.2,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -52%)",
          opacity: 0.15,
        }}
      >
        <path d="M140 40 L240 100 L240 230 L40 230 L40 100 Z" stroke="hsl(var(--viz-blue))" />
        <path d="M140 40 L40 100" stroke="hsl(var(--viz-blue))" />
        <path d="M140 40 L240 100" stroke="hsl(var(--viz-blue))" />
        <path d="M40 230 L240 230" stroke="hsl(var(--viz-blue))" />
        <path d="M40 100 L40 230" stroke="hsl(var(--viz-blue))" strokeOpacity="0.5" />
        <path d="M240 100 L240 230" stroke="hsl(var(--viz-blue))" strokeOpacity="0.5" />
        {/* Inner structure lines */}
        <path d="M90 100 L90 230" stroke="hsl(var(--viz-blue))" strokeOpacity="0.25" />
        <path d="M190 100 L190 230" stroke="hsl(var(--viz-blue))" strokeOpacity="0.25" />
        <path d="M40 165 L240 165" stroke="hsl(var(--viz-blue))" strokeOpacity="0.25" />
        <path d="M120 230 L120 170 L160 170 L160 230" stroke="hsl(var(--viz-blue))" strokeOpacity="0.3" />
      </svg>

      {/* Saturn ring — orbital lifecycle */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          width: size * 2.8,
          height: size * 2.8,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -52%)",
          perspective: 600,
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            border: "1.5px solid hsla(163, 43%, 55%, 0.25)",
            borderRadius: "50%",
            transform: `rotateX(72deg) rotateZ(${rotation.y * 0.4}deg)`,
            boxShadow: `
              0 0 30px hsla(163,43%,55%,0.12),
              0 0 60px hsla(163,43%,55%,0.06),
              inset 0 0 30px hsla(163,43%,55%,0.06)
            `,
            transition: isDragging ? "none" : "transform 0.08s linear",
          }}
        />
        <div
          className="absolute inset-3 rounded-full"
          style={{
            border: "0.5px solid hsla(163,43%,55%,0.12)",
            transform: `rotateX(72deg) rotateZ(${rotation.y * 0.35 + 15}deg)`,
            transition: isDragging ? "none" : "transform 0.08s linear",
          }}
        />
      </div>

      {/* Central glow behind cube */}
      <div
        className="absolute pointer-events-none z-[2]"
        style={{
          width: size * 1.8,
          height: size * 1.8,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, hsla(163,43%,55%,0.3) 0%, hsla(163,43%,60%,0.15) 30%, hsla(211,100%,65%,0.05) 60%, transparent 80%)",
          filter: "blur(25px)",
        }}
      />

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
          <CubeFace icon={faces[0].icon} label={faces[0].label} size={size}
            style={{ transform: `translateZ(${half}px)` }} />
          <CubeFace icon={faces[1].icon} label={faces[1].label} size={size}
            style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
          <CubeFace icon={faces[2].icon} label={faces[2].label} size={size}
            style={{ transform: `rotateY(90deg) translateZ(${half}px)` }} />
          <CubeFace icon={faces[3].icon} label={faces[3].label} size={size}
            style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }} />
          <CubeFace icon={faces[4].icon} label={faces[4].label} size={size}
            style={{ transform: `rotateX(90deg) translateZ(${half}px)` }} />
          <CubeFace icon={faces[5].icon} label={faces[5].label} size={size}
            style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }} />
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
  style: React.CSSProperties;
}

const CubeFace = ({ icon: Icon, label, size, style }: CubeFaceProps) => {
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
        background: `linear-gradient(
          145deg,
          hsl(163 43% 50% / 0.92),
          hsl(163 43% 42% / 0.88),
          hsl(180 50% 38% / 0.85)
        )`,
        border: "1px solid hsla(163, 43%, 65%, 0.5)",
        boxShadow: `
          inset 0 1px 0 hsla(163, 50%, 75%, 0.4),
          inset 0 -2px 4px hsla(163, 43%, 25%, 0.15),
          0 4px 24px hsla(163, 43%, 45%, 0.25),
          0 1px 3px rgba(0, 0, 0, 0.1)
        `,
        backfaceVisibility: "hidden",
        ...style,
      }}
    >
      <Icon size={36} strokeWidth={1.6} className="text-primary-foreground drop-shadow-sm" />
      <span className="text-[11px] font-semibold tracking-wider uppercase text-primary-foreground/80">
        {label}
      </span>
    </div>
  );
};

export default InteractiveCube;
