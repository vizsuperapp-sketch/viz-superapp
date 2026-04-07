import { useState, useRef, useEffect } from "react";
import { Handshake, FileCheck, Wrench, Key, LayoutDashboard, DoorOpen } from "lucide-react";

const faces = [
  { icon: DoorOpen, label: "Vender" },
  { icon: Handshake, label: "Comprar" },
  { icon: Key, label: "Mudar" },
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

  const cubeSize = 260;
  const half = cubeSize / 2;

  const faceTransforms = [
    `translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  const containerSize = cubeSize * 1.7;

  return (
    <div className="flex flex-col items-center select-none relative">
      {/* Shadow beneath cube */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: containerSize * 0.7,
          height: cubeSize * 0.3,
          bottom: "6%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse 90% 70% at 50% 50%, hsla(163,45%,50%,0.3) 0%, transparent 70%)",
          filter: "blur(28px)",
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
          background: "radial-gradient(circle, hsla(163,50%,65%,0.18) 0%, hsla(190,40%,65%,0.08) 40%, transparent 70%)",
          filter: "blur(50px)",
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
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? "none" : "transform 0.08s linear",
          }}
        >
          {/* Cube faces */}
          {faces.map((face, i) => (
            <CubeFace
              key={face.label}
              icon={face.icon}
              label={face.label}
              size={cubeSize}
              style={{ transform: faceTransforms[i] }}
            />
          ))}

          {/* Glowing core */}
          <div
            className="absolute"
            style={{
              width: cubeSize * 0.6,
              height: cubeSize * 0.6,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, hsla(163,55%,60%,0.6) 0%, hsla(180,50%,55%,0.25) 40%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(25px)",
            }}
          />

          {/* Sparkle points */}
          {[
            { top: "8%", left: "12%", delay: "0s", s: 5 },
            { top: "18%", right: "8%", delay: "1.2s", s: 4 },
            { bottom: "12%", left: "18%", delay: "0.6s", s: 5 },
            { bottom: "8%", right: "12%", delay: "1.8s", s: 5 },
            { top: "48%", left: "3%", delay: "0.3s", s: 3 },
            { top: "3%", left: "48%", delay: "1.5s", s: 4 },
          ].map((sp, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                ...sp,
                width: sp.s,
                height: sp.s,
                borderRadius: "50%",
                background: "hsla(0,0%,100%,0.95)",
                boxShadow: "0 0 8px 3px hsla(163,50%,75%,0.7)",
                animation: `sparkle 2s ease-in-out ${sp.delay} infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground/40 mt-4 relative z-10">
        Arraste para explorar
      </p>
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
      className="absolute flex flex-col items-center justify-center gap-3"
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
          hsla(163, 45%, 60%, 0.38) 0%,
          hsla(170, 42%, 55%, 0.28) 30%,
          hsla(180, 38%, 50%, 0.22) 60%,
          hsla(190, 45%, 55%, 0.32) 100%
        )`,
        backdropFilter: "blur(12px) saturate(1.4)",
        WebkitBackdropFilter: "blur(12px) saturate(1.4)",
        border: "1.5px solid hsla(163, 50%, 82%, 0.5)",
        boxShadow: `
          inset 0 1px 0 hsla(0, 0%, 100%, 0.4),
          inset 0 -1px 0 hsla(170, 40%, 50%, 0.08),
          0 8px 32px hsla(163, 40%, 45%, 0.12)
        `,
        backfaceVisibility: "hidden",
        ...style,
      }}
    >
      {/* Specular highlight */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 6,
          left: 6,
          right: "30%",
          height: "20%",
          background: "linear-gradient(135deg, hsla(0,0%,100%,0.35) 0%, hsla(0,0%,100%,0.03) 50%, transparent 100%)",
          borderRadius: "0.8rem 0.8rem 2rem 0.4rem",
        }}
      />

      <Icon
        size={38}
        strokeWidth={1.5}
        style={{
          color: "hsla(0, 0%, 100%, 0.95)",
          filter: "drop-shadow(0 2px 6px hsla(163,40%,35%,0.4))",
        }}
      />
      <span
        className="text-[11px] font-bold tracking-[0.2em] uppercase"
        style={{
          color: "hsla(0, 0%, 100%, 0.88)",
          textShadow: "0 1px 4px hsla(163,40%,25%,0.35)",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default InteractiveCube;
