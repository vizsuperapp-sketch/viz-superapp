import { useState, useRef, useEffect } from "react";
import { Handshake, FileCheck, Package, Wrench } from "lucide-react";

const faces = [
  { icon: Handshake, label: "Compra", color: "from-emerald-400 to-teal-500" },
  { icon: FileCheck, label: "Financiar", color: "from-teal-400 to-cyan-500" },
  { icon: Package, label: "Mudar", color: "from-cyan-400 to-sky-500" },
  { icon: Wrench, label: "Gerir", color: "from-sky-400 to-blue-500" },
];

const InteractiveCube = () => {
  const [rotation, setRotation] = useState({ x: -20, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const lastPos = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>();

  useEffect(() => {
    if (!autoRotate) return;
    let frame = 0;
    const animate = () => {
      frame++;
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
    setRotation((r) => ({ x: r.x - dy * 0.4, y: r.y + dx * 0.4 }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setTimeout(() => setAutoRotate(true), 2000);
  };

  const size = 140;
  const half = size / 2;

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <div
        className="cursor-grab active:cursor-grabbing"
        style={{ perspective: 800, width: size * 1.6, height: size * 1.6 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? "none" : "transform 0.1s linear",
          }}
        >
          {/* Front */}
          <CubeFace
            icon={faces[0].icon}
            label={faces[0].label}
            size={size}
            style={{ transform: `translateZ(${half}px)` }}
          />
          {/* Back */}
          <CubeFace
            icon={faces[1].icon}
            label={faces[1].label}
            size={size}
            style={{ transform: `rotateY(180deg) translateZ(${half}px)` }}
          />
          {/* Right */}
          <CubeFace
            icon={faces[2].icon}
            label={faces[2].label}
            size={size}
            style={{ transform: `rotateY(90deg) translateZ(${half}px)` }}
          />
          {/* Left */}
          <CubeFace
            icon={faces[3].icon}
            label={faces[3].label}
            size={size}
            style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }}
          />
          {/* Top */}
          <div
            className="absolute rounded-xl"
            style={{
              width: size,
              height: size,
              left: "50%",
              top: "50%",
              marginLeft: -half,
              marginTop: -half,
              transform: `rotateX(90deg) translateZ(${half}px)`,
              background: "linear-gradient(135deg, hsla(163,60%,55%,0.5), hsla(211,100%,65%,0.5))",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          />
          {/* Bottom */}
          <div
            className="absolute rounded-xl"
            style={{
              width: size,
              height: size,
              left: "50%",
              top: "50%",
              marginLeft: -half,
              marginTop: -half,
              transform: `rotateX(-90deg) translateZ(${half}px)`,
              background: "linear-gradient(135deg, hsla(163,60%,55%,0.3), hsla(211,100%,65%,0.3))",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground/60 mt-1">Arraste para explorar</p>
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
      className="absolute flex flex-col items-center justify-center gap-2 rounded-xl"
      style={{
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        marginLeft: -half,
        marginTop: -half,
        background: "linear-gradient(135deg, hsla(163,60%,55%,0.6), hsla(211,100%,65%,0.6))",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.35)",
        boxShadow: "inset 0 0 30px rgba(255,255,255,0.1)",
        backfaceVisibility: "hidden",
        ...style,
      }}
    >
      <Icon size={32} strokeWidth={1.5} className="text-white/90" />
      <span className="text-xs font-medium text-white/80 tracking-wide">{label}</span>
    </div>
  );
};

export default InteractiveCube;
