import { useState, useRef, useEffect } from "react";
import { Handshake, FileCheck, Package, Wrench, Key, LayoutDashboard } from "lucide-react";

const faces = [
  { icon: Handshake, label: "Comprar" },
  { icon: FileCheck, label: "Financiar" },
  { icon: Package, label: "Mudar" },
  { icon: Wrench, label: "Serviços" },
  { icon: Key, label: "Arrendar" },
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
    const speed = isHovered ? 0.25 : 0.12;
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

  const size = 110;
  const half = size / 2;

  return (
    <div className="flex flex-col items-center select-none relative">
      {/* Saturn ring */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: size * 2.4,
          height: size * 2.4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            border: "1.5px solid hsla(163, 43%, 55%, 0.15)",
            transform: `rotateX(70deg) rotateZ(${rotation.y * 0.3}deg)`,
            boxShadow: "0 0 20px hsla(211, 100%, 65%, 0.06)",
          }}
        />
      </div>

      <div
        className="cursor-grab active:cursor-grabbing"
        style={{ perspective: 700, width: size * 1.6, height: size * 1.6 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative w-full h-full animate-breathe"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? "none" : "transform 0.08s linear",
          }}
        >
          {/* Front */}
          <CubeFace icon={faces[0].icon} label={faces[0].label} size={size}
            style={{ transform: `translateZ(${half}px)` }} />
          {/* Back */}
          <CubeFace icon={faces[1].icon} label={faces[1].label} size={size}
            style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
          {/* Right */}
          <CubeFace icon={faces[2].icon} label={faces[2].label} size={size}
            style={{ transform: `rotateY(90deg) translateZ(${half}px)` }} />
          {/* Left */}
          <CubeFace icon={faces[3].icon} label={faces[3].label} size={size}
            style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }} />
          {/* Top */}
          <CubeFace icon={faces[4].icon} label={faces[4].label} size={size}
            style={{ transform: `rotateX(90deg) translateZ(${half}px)` }} />
          {/* Bottom */}
          <CubeFace icon={faces[5].icon} label={faces[5].label} size={size}
            style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }} />
        </div>
      </div>
      <p className="text-xs text-muted-foreground/50 mt-3">Arraste para explorar</p>
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
      className="absolute flex flex-col items-center justify-center gap-1.5 rounded-2xl"
      style={{
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        marginLeft: -half,
        marginTop: -half,
        background: "linear-gradient(145deg, hsla(163,43%,55%,0.45), hsla(211,100%,65%,0.45))",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.25)",
        boxShadow: "inset 0 1px 12px rgba(255,255,255,0.08)",
        backfaceVisibility: "hidden",
        ...style,
      }}
    >
      <Icon size={26} strokeWidth={1.4} className="text-white/85" />
      <span className="text-[10px] font-medium text-white/70 tracking-wider uppercase">{label}</span>
    </div>
  );
};

export default InteractiveCube;
