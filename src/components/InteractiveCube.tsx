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

  const size = 200;
  const half = size / 2;

  return (
    <div className="flex flex-col items-center select-none relative">
      {/* Shadow beneath cube */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: size * 1.6,
          height: size * 0.4,
          bottom: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, hsla(163,30%,50%,0.15) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: size * 2.5,
          height: size * 2.5,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, hsla(163,50%,70%,0.12) 0%, hsla(190,40%,70%,0.06) 40%, transparent 70%)",
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
        style={{ perspective: 900, width: size * 1.6, height: size * 1.6 }}
      >
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
              <CrystalFace
                key={face.label}
                icon={face.icon}
                label={face.label}
                size={size}
                style={{ transform: transforms[i] }}
              />
            );
          })}

          {/* Inner light core */}
          <div
            className="absolute"
            style={{
              width: size * 0.6,
              height: size * 0.6,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, hsla(163,60%,80%,0.35) 0%, hsla(180,50%,70%,0.12) 50%, transparent 80%)",
              borderRadius: "50%",
              filter: "blur(18px)",
            }}
          />

          {/* Sparkle points */}
          {[
            { top: "10%", left: "15%", delay: "0s", s: 6 },
            { top: "20%", right: "10%", delay: "1.2s", s: 5 },
            { bottom: "15%", left: "20%", delay: "0.6s", s: 4 },
            { bottom: "10%", right: "15%", delay: "1.8s", s: 5 },
            { top: "50%", left: "5%", delay: "0.3s", s: 3 },
            { top: "5%", left: "50%", delay: "1.5s", s: 4 },
          ].map((sp, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                ...sp,
                width: sp.s,
                height: sp.s,
                borderRadius: "50%",
                background: "hsla(0,0%,100%,0.9)",
                boxShadow: "0 0 6px 2px hsla(163,50%,80%,0.6)",
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

interface CrystalFaceProps {
  icon: typeof Handshake;
  label: string;
  size: number;
  style: React.CSSProperties;
}

const CrystalFace = ({ icon: Icon, label, size, style }: CrystalFaceProps) => {
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
          hsla(163, 50%, 90%, 0.18) 0%,
          hsla(170, 45%, 85%, 0.10) 30%,
          hsla(180, 40%, 80%, 0.06) 60%,
          hsla(190, 50%, 85%, 0.12) 100%
        )`,
        backdropFilter: "blur(6px) saturate(1.1)",
        WebkitBackdropFilter: "blur(6px) saturate(1.1)",
        border: "1px solid hsla(163, 50%, 90%, 0.35)",
        boxShadow: `
          inset 0 1px 0 hsla(0, 0%, 100%, 0.4),
          inset 0 -1px 0 hsla(170, 40%, 60%, 0.08),
          inset 1px 0 0 hsla(0, 0%, 100%, 0.2),
          inset -1px 0 0 hsla(0, 0%, 100%, 0.1),
          0 4px 20px hsla(163, 40%, 50%, 0.06)
        `,
        backfaceVisibility: "hidden",
        ...style,
      }}
    >
      {/* Specular highlight — top edge refraction */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 6,
          left: 6,
          right: "35%",
          height: "25%",
          background: "linear-gradient(135deg, hsla(0,0%,100%,0.35) 0%, hsla(0,0%,100%,0.03) 55%, transparent 100%)",
          borderRadius: "0.8rem 0.8rem 2rem 0.4rem",
        }}
      />

      {/* Bottom-right subtle refraction */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 8,
          right: 8,
          width: "40%",
          height: "20%",
          background: "linear-gradient(315deg, hsla(163,40%,80%,0.15) 0%, transparent 60%)",
          borderRadius: "0.4rem",
        }}
      />

      <Icon
        size={36}
        strokeWidth={1.6}
        style={{ color: "hsla(0, 0%, 100%, 0.85)", filter: "drop-shadow(0 1px 4px hsla(163,40%,40%,0.3))" }}
      />
      <span
        className="text-[10px] font-bold tracking-[0.18em] uppercase"
        style={{ color: "hsla(0, 0%, 100%, 0.7)", textShadow: "0 1px 3px hsla(163,40%,30%,0.3)" }}
      >
        {label}
      </span>
    </div>
  );
};

export default InteractiveCube;
