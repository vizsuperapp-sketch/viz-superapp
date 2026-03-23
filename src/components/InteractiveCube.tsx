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

  const size = 180;
  const half = size / 2;

  return (
    <div className="flex flex-col items-center select-none relative">
      {/* Ambient glow — soft teal halo beneath */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: size * 2.8,
          height: size * 2,
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -40%)",
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, hsla(163,55%,60%,0.25) 0%, hsla(170,50%,55%,0.1) 35%, transparent 70%)",
          filter: "blur(30px)",
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
        style={{ perspective: 800, width: size * 1.6, height: size * 1.6 }}
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
              <GlassFace
                key={face.label}
                icon={face.icon}
                label={face.label}
                size={size}
                style={{ transform: transforms[i] }}
              />
            );
          })}

          {/* Internal glow core — visible through glass */}
          <div
            className="absolute"
            style={{
              width: size * 0.5,
              height: size * 0.5,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, hsla(163,60%,65%,0.4) 0%, hsla(180,50%,55%,0.15) 50%, transparent 80%)",
              borderRadius: "50%",
              filter: "blur(15px)",
            }}
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground/40 mt-4 relative z-10">
        Arraste para explorar
      </p>
    </div>
  );
};

interface GlassFaceProps {
  icon: typeof Handshake;
  label: string;
  size: number;
  style: React.CSSProperties;
}

const GlassFace = ({ icon: Icon, label, size, style }: GlassFaceProps) => {
  const half = size / 2;
  return (
    <div
      className="absolute flex flex-col items-center justify-center gap-3"
      style={{
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        marginLeft: -half,
        marginTop: -half,
        borderRadius: "1.5rem",
        /* Translucent glass — matching PDF's ice-like transparency */
        background: `linear-gradient(
          145deg,
          hsla(163, 40%, 85%, 0.35) 0%,
          hsla(170, 45%, 80%, 0.18) 40%,
          hsla(180, 50%, 75%, 0.12) 70%,
          hsla(190, 40%, 70%, 0.2) 100%
        )`,
        backdropFilter: "blur(8px) saturate(1.2)",
        WebkitBackdropFilter: "blur(8px) saturate(1.2)",
        /* Glass edges — bright specular highlights */
        border: "1.5px solid hsla(163, 60%, 85%, 0.6)",
        boxShadow: `
          inset 0 1px 0 hsla(0, 0%, 100%, 0.5),
          inset 0 -1px 0 hsla(170, 40%, 60%, 0.15),
          inset 1px 0 0 hsla(0, 0%, 100%, 0.25),
          inset -1px 0 0 hsla(0, 0%, 100%, 0.15),
          0 8px 32px hsla(163, 50%, 50%, 0.12),
          0 2px 8px hsla(0, 0%, 0%, 0.04)
        `,
        backfaceVisibility: "hidden",
        ...style,
      }}
    >
      {/* Specular highlight streak — top-left corner */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 8,
          left: 8,
          right: "40%",
          height: "30%",
          background:
            "linear-gradient(135deg, hsla(0,0%,100%,0.45) 0%, hsla(0,0%,100%,0.05) 60%, transparent 100%)",
          borderRadius: "1rem 1rem 2rem 0.5rem",
        }}
      />

      <Icon
        size={38}
        strokeWidth={1.8}
        className="drop-shadow-sm"
        style={{ color: "hsla(163, 50%, 35%, 0.85)" }}
      />
      <span
        className="text-[10px] font-bold tracking-[0.18em] uppercase drop-shadow-sm"
        style={{ color: "hsla(163, 45%, 30%, 0.75)" }}
      >
        {label}
      </span>
    </div>
  );
};

export default InteractiveCube;
