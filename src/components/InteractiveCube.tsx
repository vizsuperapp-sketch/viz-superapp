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

  const outerSize = 220;
  const outerHalf = outerSize / 2;
  const innerSize = 140;
  const innerHalf = innerSize / 2;

  const outerTransforms = [
    `translateZ(${outerHalf}px)`,
    `rotateY(180deg) translateZ(${outerHalf}px)`,
    `rotateY(90deg) translateZ(${outerHalf}px)`,
    `rotateY(-90deg) translateZ(${outerHalf}px)`,
    `rotateX(90deg) translateZ(${outerHalf}px)`,
    `rotateX(-90deg) translateZ(${outerHalf}px)`,
  ];

  const innerTransforms = [
    `translateZ(${innerHalf}px)`,
    `rotateY(180deg) translateZ(${innerHalf}px)`,
    `rotateY(90deg) translateZ(${innerHalf}px)`,
    `rotateY(-90deg) translateZ(${innerHalf}px)`,
    `rotateX(90deg) translateZ(${innerHalf}px)`,
    `rotateX(-90deg) translateZ(${innerHalf}px)`,
  ];

  const containerSize = outerSize * 1.6;

  return (
    <div className="flex flex-col items-center select-none relative">
      {/* Shadow beneath cube */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: containerSize,
          height: outerSize * 0.35,
          bottom: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, hsla(163,30%,50%,0.18) 0%, transparent 70%)",
          filter: "blur(22px)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: containerSize * 1.5,
          height: containerSize * 1.5,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, hsla(163,50%,70%,0.14) 0%, hsla(190,40%,70%,0.06) 40%, transparent 70%)",
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
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? "none" : "transform 0.08s linear",
          }}
        >
          {/* Outer wireframe shell */}
          {outerTransforms.map((t, i) => (
            <div
              key={`outer-${i}`}
              className="absolute"
              style={{
                width: outerSize,
                height: outerSize,
                left: "50%",
                top: "50%",
                marginLeft: -outerHalf,
                marginTop: -outerHalf,
                transform: t,
                backfaceVisibility: "hidden",
                border: "1px solid hsla(163, 50%, 80%, 0.2)",
                borderRadius: "1rem",
                background: "hsla(163, 50%, 90%, 0.03)",
              }}
            />
          ))}

          {/* Inner floating panels with icons */}
          {faces.map((face, i) => (
            <InnerPanel
              key={face.label}
              icon={face.icon}
              label={face.label}
              size={innerSize}
              style={{ transform: innerTransforms[i] }}
            />
          ))}

          {/* Glowing core */}
          <div
            className="absolute"
            style={{
              width: outerSize * 0.5,
              height: outerSize * 0.5,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, hsla(163,60%,65%,0.5) 0%, hsla(180,50%,60%,0.2) 40%, transparent 75%)",
              borderRadius: "50%",
              filter: "blur(20px)",
            }}
          />

          {/* Sparkle points */}
          {[
            { top: "10%", left: "15%", delay: "0s", s: 5 },
            { top: "20%", right: "10%", delay: "1.2s", s: 4 },
            { bottom: "15%", left: "20%", delay: "0.6s", s: 4 },
            { bottom: "10%", right: "15%", delay: "1.8s", s: 5 },
            { top: "50%", left: "5%", delay: "0.3s", s: 3 },
            { top: "5%", left: "50%", delay: "1.5s", s: 3 },
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

interface InnerPanelProps {
  icon: typeof Handshake;
  label: string;
  size: number;
  style: React.CSSProperties;
}

const InnerPanel = ({ icon: Icon, label, size, style }: InnerPanelProps) => {
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
        borderRadius: "1.1rem",
        background: `linear-gradient(
          145deg,
          hsla(163, 50%, 85%, 0.22) 0%,
          hsla(170, 45%, 80%, 0.12) 30%,
          hsla(180, 40%, 75%, 0.08) 60%,
          hsla(190, 50%, 80%, 0.14) 100%
        )`,
        backdropFilter: "blur(8px) saturate(1.2)",
        WebkitBackdropFilter: "blur(8px) saturate(1.2)",
        border: "1px solid hsla(163, 50%, 85%, 0.3)",
        boxShadow: `
          inset 0 1px 0 hsla(0, 0%, 100%, 0.35),
          inset 0 -1px 0 hsla(170, 40%, 60%, 0.06),
          0 4px 24px hsla(163, 40%, 50%, 0.08)
        `,
        backfaceVisibility: "hidden",
        ...style,
      }}
    >
      {/* Specular highlight */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 5,
          left: 5,
          right: "35%",
          height: "22%",
          background: "linear-gradient(135deg, hsla(0,0%,100%,0.3) 0%, hsla(0,0%,100%,0.02) 55%, transparent 100%)",
          borderRadius: "0.7rem 0.7rem 1.5rem 0.3rem",
        }}
      />

      <Icon
        size={30}
        strokeWidth={1.5}
        style={{ color: "hsla(0, 0%, 100%, 0.88)", filter: "drop-shadow(0 1px 4px hsla(163,40%,40%,0.35))" }}
      />
      <span
        className="text-[9px] font-bold tracking-[0.18em] uppercase"
        style={{ color: "hsla(0, 0%, 100%, 0.72)", textShadow: "0 1px 3px hsla(163,40%,30%,0.3)" }}
      >
        {label}
      </span>
    </div>
  );
};

export default InteractiveCube;
