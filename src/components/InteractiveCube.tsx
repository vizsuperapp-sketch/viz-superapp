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

  const size = 115;
  const half = size / 2;

  return (
    <div className="flex flex-col items-center select-none relative">
      {/* Saturn ring */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: size * 2.6,
          height: size * 2.6,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -54%)",
          perspective: 600,
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            border: "1px solid hsla(163, 43%, 55%, 0.14)",
            transform: `rotateX(72deg) rotateZ(${rotation.y * 0.4}deg)`,
            background: "radial-gradient(ellipse at center, hsla(211, 100%, 65%, 0.03) 0%, transparent 70%)",
            boxShadow: "0 0 24px hsla(163, 43%, 55%, 0.04)",
            transition: isDragging ? "none" : "transform 0.08s linear",
          }}
        />
      </div>

      {/* Breathing wrapper */}
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
      <p className="text-xs text-muted-foreground/40 mt-3 relative z-10">Arraste para explorar</p>
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
      className="absolute flex flex-col items-center justify-center gap-1.5"
      style={{
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        marginLeft: -half,
        marginTop: -half,
        borderRadius: "1.25rem",
        background: "linear-gradient(145deg, rgba(255,255,255,0.5), rgba(255,255,255,0.2))",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        border: "1px solid rgba(255,255,255,0.55)",
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.6),
          inset 0 -1px 0 rgba(0,0,0,0.03),
          0 4px 16px rgba(91,191,165,0.08),
          0 1px 3px rgba(0,0,0,0.04)
        `,
        backfaceVisibility: "hidden",
        ...style,
      }}
    >
      <Icon size={26} strokeWidth={1.4} style={{ color: "hsl(163,43%,45%)" }} />
      <span
        className="text-[10px] font-semibold tracking-wider uppercase"
        style={{ color: "hsl(220,15%,40%)" }}
      >
        {label}
      </span>
    </div>
  );
};

export default InteractiveCube;
