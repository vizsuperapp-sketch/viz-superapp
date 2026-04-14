import { useState, useRef, useEffect, forwardRef } from "react";
import { Home, TrendingUp, Landmark, Key, Settings, LucideIcon, HelpCircle } from "lucide-react";

// Adicionei HelpCircle para o caso de precisar de um ícone genérico "vizinho"

interface FaceData {
  label: string | null;
  icon: LucideIcon | null;
  isLogo: boolean;
}

const faces: FaceData[] = [
  // De acordo com a imagem, a face frontal tem o texto "VIZ"
  { label: "VIZ", icon: null, isLogo: true },
  // O ícone de aperto de mão (Handshake) não é nativo no Lucide-react clássico,
  // mas o 'Hand' ou 'HandCoins' aproxima. Para ser exato, mantemos TrendingUp ou Home.
  // Vamos usar 'Home' para a face com a casa da imagem.
  { label: "CASA", icon: Home, isLogo: false },
  // Para a face com o aperto de mão, podemos usar um ícone que represente acordo.
  { label: "ACORDO", icon: Landmark, isLogo: false },
  { label: "GERIR", icon: Settings, isLogo: false },
  { label: "ARRENDAR", icon: Key, isLogo: false },
  // De acordo com o fluxo, talvez queiras TrendingUp.
  { label: "VENDER", icon: TrendingUp, isLogo: false },
];

// Normais para cálculo de face ativa (para o tooltip dinâmico funcionar)
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
  // Rotação inicial para mostrar a face VIZ e a Casa, como na imagem.
  const [rotation, setRotation] = useState({ x: -10, y: 35 });
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
          newY = r.y + 0.15; // Rotação automática mais lenta para ser hipnótica
        } else if (!isDragging) {
          velocity.current.x *= 0.94; // Mais momentum
          velocity.current.y *= 0.94;
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
    velocity.current = { x: -dy * 0.4, y: dx * 0.4 };
    setRotation((r) => ({ x: r.x + velocity.current.x, y: r.y + velocity.current.y }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    // Tempo maior antes de retomar rotação automática
    autoTimer.current = setTimeout(() => setAutoRotate(true), 3500);
  };

  // Ajuste de tamanho para maior presença
  const cubeSize = 250;
  const half = cubeSize / 2;
  const faceTransforms = [
    `translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];
  // Container maior para acomodar a perspetiva sem cortar
  const containerSize = cubeSize * 1.9;

  return (
    <div className="flex flex-col items-center select-none relative w-full h-full p-6">
      {/* Luz ambiente azul/cian de fundo para "gelar" o espaço */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: containerSize * 2,
          height: containerSize * 2,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, hsla(180,90%,50%,0.2) 0%, transparent 80%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="cursor-grab active:cursor-grabbing relative z-10 w-full flex justify-center items-center"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ perspective: 1100, width: containerSize, height: containerSize }}
      >
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
              label={face.label}
              icon={face.icon}
              isLogo={face.isLogo}
              // Destaca a face ativa com maior brilho
              isActive={activeFace === i}
              size={cubeSize}
              style={{ transform: faceTransforms[i] }}
            />
          ))}
        </div>
      </div>
      {/* Label dinâmica abaixo do cubo - Mais discreta */}
      <p
        className="text-[10px] font-medium uppercase tracking-[0.3em] mt-3 relative z-10 transition-all duration-300"
        style={{ color: "hsla(180,90%,80%,0.8)", minHeight: "20px" }}
      >
        {faces[activeFace]?.label ?? ""}
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
          // Cantos ligeiramente curvos como na imagem
          borderRadius: "1.5rem",
          // O gradiente da imagem é verde em cima à esquerda e azul em baixo à direita.
          // O fundo deve parecer vidro esbranquiçado ou gelo.
          background: `
            radial-gradient(at top left, hsla(160,80%,70%,0.3) 0%, transparent 50%),
            radial-gradient(at bottom right, hsla(200,80%,70%,0.3) 0%, transparent 50%),
            linear-gradient(135deg, hsla(0,0%,100%,0.1) 0%, hsla(180,90%,50%,0.15) 100%)
          `,
          backdropFilter: "blur(18px) saturate(2)",
          WebkitBackdropFilter: "blur(18px) saturate(2)",
          // Borda brilhante azul/cian (neon) como na imagem
          border: isActive
            ? "3px solid hsla(180,90%,70%,0.95)" // Face ativa brilha mais
            : "2px solid hsla(180,90%,60%,0.7)", // Outras faces com brilho suave
          boxShadow: isActive
            ? `
              inset 0 0 15px hsla(180,90%,90%,0.3), // Brilho interno
              0 0 25px hsla(180,90%,50%,0.8),    // Glow externo forte
              0 0 50px hsla(180,90%,50%,0.4)     // Glow externo suave
            `
            : `
              inset 0 0 10px hsla(180,90%,90%,0.1),
              0 0 15px hsla(180,90%,50%,0.5)
            `,
          backfaceVisibility: "hidden",
          transition: "border-color 0.4s, box-shadow 0.4s, background 0.4s",
          ...style,
        }}
      >
        {/* Efeito de reflexo de vidro na parte superior da face */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: 8,
            left: 8,
            right: "30%",
            height: "25%",
            background: "linear-gradient(135deg, hsla(0,0%,100%,0.5) 0%, transparent 100%)",
            borderRadius: "1.2rem 1.2rem 2rem 0.6rem",
          }}
        />

        {/* Efeito de brilho concentrado nas arestas (conforme a imagem) */}
        <div
          className="absolute inset-0 border border-hsla(180,90%,90%,0.4) rounded-[1.4rem]"
          style={{ margin: "-1px" }}
        />

        {isLogo && label && (
          <span
            style={{
              fontSize: "78px",
              fontWeight: 800,
              lineHeight: 1,
              color: "hsla(0,0%,100%,0.98)", // Texto branco neon
              textShadow: "0 0 25px hsla(180,90%,50%,0.9), 0 0 50px hsla(180,90%,50%,0.6)",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              animation: isActive ? "pulse-active 2.5s ease-in-out infinite" : "none",
            }}
          >
            {label}
          </span>
        )}
        {!isLogo && Icon && (
          <Icon
            size={70}
            strokeWidth={1}
            style={{
              color: "hsla(0,0%,100%,0.95)", // Ícone branco neon
              filter: "drop-shadow(0 0 15px hsla(180,90%,50%,0.8))",
              transition: "transform 0.4s",
              transform: isActive ? "scale(1.1)" : "scale(1)",
            }}
          />
        )}
        {/* Removi a label interna para simplificar e focar nos ícones, conforme a imagem */}
      </div>
    );
  },
);
CubeFace.displayName = "CubeFace";

export default InteractiveCube;
