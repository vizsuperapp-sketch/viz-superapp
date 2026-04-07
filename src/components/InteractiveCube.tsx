import { useState, useRef, useEffect } from "react";

const faces = [
  { letter: "V", label: "Venda direta" },
  { letter: "I", label: "IA que acompanha" },
  { letter: "Z", label: "Zero comissão" },
  { letter: null, label: "Transparência total" },
  { letter: null, label: null },
  { letter: null, label: null },
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
    `translateZ(${half}px)`,                    // front - V
    `rotateY(90deg) translateZ(${half}px)`,     // right - I
    `rotateY(-90deg) translateZ(${half}px)`,    // left - Z
    `rotateY(180deg) translateZ(${half}px)`,    // back
    `rotateX(90deg) translateZ(${half}px)`,     // top
    `rotateX(-90deg) translateZ(${half}px)`,    // bottom
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
          background: "radial-gradient(ellipse 90% 70% at 50% 50%, hsla(211,80%,55%,0.3) 0%, transparent 70%)",
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
          background: "radial-gradient(circle, hsla(211,80%,60%,0.18) 0%, hsla(211,60%,55%,0.08) 40%, transparent 70%)",
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
        {/* Hover labels - positioned outside the cube */}
        <div
          className="absolute pointer-events-none z-20 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            top: "50%",
            left: "-10px",
            transform: "translateY(-50%)",
          }}
        >
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-1 rounded-full"
            style={{
              color: "hsla(0,0%,100%,0.8)",
              background: "hsla(211,80%,55%,0.15)",
              border: "1px solid hsla(211,60%,70%,0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            Zero comissão
          </span>
        </div>
        <div
          className="absolute pointer-events-none z-20 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            top: "50%",
            right: "-10px",
            transform: "translateY(-50%)",
          }}
        >
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-1 rounded-full"
            style={{
              color: "hsla(0,0%,100%,0.8)",
              background: "hsla(211,80%,55%,0.15)",
              border: "1px solid hsla(211,60%,70%,0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            IA que acompanha
          </span>
        </div>
        <div
          className="absolute pointer-events-none z-20 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            bottom: "18%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-1 rounded-full whitespace-nowrap"
            style={{
              color: "hsla(0,0%,100%,0.8)",
              background: "hsla(211,80%,55%,0.15)",
              border: "1px solid hsla(211,60%,70%,0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            Venda direta
          </span>
        </div>

        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? "none" : "transform 0.08s linear",
          }}
        >
          {faces.map((face, i) => (
            <CubeFace
              key={i}
              letter={face.letter}
              size={cubeSize}
              style={{ transform: faceTransforms[i] }}
            />
          ))}

          {/* Glowing core - blue */}
          <div
            className="absolute"
            style={{
              width: cubeSize * 0.6,
              height: cubeSize * 0.6,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, hsla(211,80%,60%,0.6) 0%, hsla(211,60%,50%,0.25) 40%, transparent 70%)",
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
                boxShadow: "0 0 8px 3px hsla(211,70%,70%,0.7)",
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
  letter: string | null;
  size: number;
  style: React.CSSProperties;
}

const CubeFace = ({ letter, size, style }: CubeFaceProps) => {
  const half = size / 2;
  return (
    <div
      className="absolute flex flex-col items-center justify-center"
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
          hsla(211, 80%, 55%, 0.35) 0%,
          hsla(211, 70%, 50%, 0.25) 30%,
          hsla(220, 60%, 48%, 0.2) 60%,
          hsla(211, 80%, 60%, 0.3) 100%
        )`,
        backdropFilter: "blur(12px) saturate(1.4)",
        WebkitBackdropFilter: "blur(12px) saturate(1.4)",
        border: "1.5px solid hsla(211, 60%, 75%, 0.45)",
        boxShadow: `
          inset 0 1px 0 hsla(0, 0%, 100%, 0.35),
          inset 0 -1px 0 hsla(211, 60%, 45%, 0.08),
          0 8px 32px hsla(211, 60%, 40%, 0.12)
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
          background: "linear-gradient(135deg, hsla(0,0%,100%,0.3) 0%, hsla(0,0%,100%,0.03) 50%, transparent 100%)",
          borderRadius: "0.8rem 0.8rem 2rem 0.4rem",
        }}
      />

      {letter && (
        <span
          style={{
            fontSize: "72px",
            fontWeight: 800,
            lineHeight: 1,
            color: "hsla(0, 0%, 100%, 0.95)",
            textShadow: "0 0 30px hsla(211,80%,60%,0.6), 0 2px 8px hsla(211,60%,40%,0.4)",
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}
        >
          {letter}
        </span>
      )}
    </div>
  );
};

export default InteractiveCube;
