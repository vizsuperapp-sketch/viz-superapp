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

const faceNormals: [number, number, number][] = [
  [0, 0, 1],
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, -1],
  [0, 1, 0],
  [0, -1, 0],
];

function getActiveFace(rotX: number, rotY: number): number {
  const radX = (rotX * Math.PI) / 180;
  const radY = (rotY * Math.PI) / 180;
  const cam: [number, number, number] = [
    Math.sin(radY) * Math.cos(radX),
    -Math.sin(radX),
    Math.cos(radY) * Math.cos(radX),
  ];
  let best = 0,
    bestDot = -Infinity;
  faceNormals.forEach((n, i) => {
    const dot = n[0] * cam[0] + n[1] * cam[1] + n[2] * cam[2];
    if (dot > bestDot) {
      bestDot = dot;
      best = i;
    }
  });
  return best;
}

const InteractiveCube = () => {
  const [rotation, setRotation] = useState({ x: -22, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeFace, setActiveFace] = useState(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>();
  const autoTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const animate = () => {
      setRotation((r) => {
        let newX = r.x;
        let newY = r.y;
        if (autoRotate) {
          newY = r.y + 0.18;
        } else if (!isDragging) {
          velocity.current.x *= 0.92;
          velocity.current.y *= 0.92;
          newX = r.x + velocity.current.x;
          newY = r.y + velocity.current.y;
        }
        setActiveFace(getActiveFace(newX, newY));
        return { x: newX, y: newY };
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [autoRotate, isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    clearTimeout(autoTimer.current);
    velocity.current = { x: 0, y: 0 };
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    velocity.current = { x: -dy * 0.45, y: dx * 0.45 };
    setRotation((r) => ({ x: r.x + velocity.current.x, y: r.y + velocity.current.y }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    autoTimer.current = setTimeout(() => setAutoRotate(true), 2500);
  };

  const cubeSize = 220;
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
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: containerSize * 1.6,
          height: containerSize * 1.6,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, hsla(180,80%,60%,0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div
        className="cursor-grab active:cursor-grabbing relative z-10"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ perspective: 900, width: containerSize, height: containerSize }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? "none" : "transform 0.05s linear",
          }}
        >
          {faces.map((face, i) => (
            <CubeFace
              key={i}
              label={face.label}
              icon={face.icon}
              isLogo={face.isLogo}
              isActive={activeFace === i}
              size={cubeSize}
              style={{ transform: faceTransforms[i] }}
            />
          ))}
        </div>
      </div>

      {/* Active face label */}
      <p
        className="text-xs font-semibold uppercase tracking-widest mt-2 relative z-10 transition-all duration-300"
        style={{ color: "hsla(180,80%,70%,0.9)", letterSpacing: "0.2em", minHeight: "20px" }}
      >
        {faces[activeFace]?.label ?? ""}
      </p>
      <p className="text-xs relative z-10" style={{ color: "hsla(0,0%,100%,0.3)", marginTop: "4px" }}>
        Arraste para explorar
      </p>
    </div>
  );
};

interface CubeFaceProps {
  label: string | null;
  icon: LucideIcon | null;
  isLogo: boolean;
  isActive: boolean;
  size: number;
  style: React.CSSProperties;
}

const CubeFace = forwardRef<HTMLDivElement, CubeFaceProps>(
  ({ label, icon: Icon, isLogo, isActive, size, style }, ref) => {
    const half = size / 2;
    return (
      <div
        ref={ref}
        className="absolute flex flex-col items-center justify-center gap-2"
        style={{
          width: size,
          height: size,
          left: "50%",
          top: "50%",
          marginLeft: -half,
          marginTop: -half,
          borderRadius: "1.25rem",
          background: `linear-gradient(145deg, hsla(163,60%,55%,0.4), hsla(180,70%,55%,0.35), hsla(211,80%,55%,0.45))`,
          backdropFilter: "blur(12px) saturate(1.5)",
          WebkitBackdropFilter: "blur(12px) saturate(1.5)",
          border: isActive ? "2px solid hsla(180,80%,80%,0.9)" : "1.5px solid hsla(180,80%,70%,0.5)",
          boxShadow: isActive
            ? `inset 0 1px 0 hsla(180,80%,90%,0.5), 0 0 30px hsla(180,80%,60%,0.5), 0 0 60px hsla(180,80%,60%,0.2)`
            : `inset 0 1px 0 hsla(180,80%,90%,0.3), 0 0 15px hsla(180,80%,60%,0.1)`,
          backfaceVisibility: "hidden",
          transition: "border-color 0.3s, box-shadow 0.3s",
          ...style,
        }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: 6,
            left: 6,
            right: "25%",
            height: "22%",
            background: "linear-gradient(135deg, hsla(0,0%,100%,0.45) 0%, transparent 100%)",
            borderRadius: "0.8rem 0.8rem 2rem 0.4rem",
          }}
        />

        {isLogo && label && (
          <span
            style={{
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1,
              color: "hsla(0,0%,100%,0.97)",
              textShadow: "0 0 30px hsla(180,80%,60%,0.7), 0 0 60px hsla(180,80%,60%,0.3)",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              animation: "pulse-logo 3s ease-in-out infinite",
            }}
          >
            {label}
          </span>
        )}

        {!isLogo && Icon && (
          <Icon
            size={44}
            strokeWidth={1.5}
            style={{
              color: "hsla(0,0%,100%,0.92)",
              filter: "drop-shadow(0 0 10px hsla(180,80%,60%,0.6))",
              transition: "transform 0.3s",
              transform: isActive ? "scale(1.15)" : "scale(1)",
            }}
          />
        )}

        {!isLogo && label && (
          <span
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "hsla(0,0%,100%,0.92)",
              textShadow: "0 0 20px hsla(180,80%,60%,0.4)",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              letterSpacing: "0.08em",
            }}
          >
            {label}
          </span>
        )}
      </div>
    );
  },
);

CubeFace.displayName = "CubeFace";
export default InteractiveCube;
