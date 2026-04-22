"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  MeshTransmissionMaterial,
  Environment,
  Edges,
  Text,
  Float,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

interface FaceContent {
  label: string;
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  isLogo?: boolean;
}

const SIZE = 2;
const HALF = SIZE / 2;
const OFFSET = HALF + 0.001;

const faces: FaceContent[] = [
  // top - VIZ
  {
    label: "VIZ",
    position: [0, OFFSET, 0],
    rotation: [-Math.PI / 2, 0, 0],
    color: "#a8f0ff",
    isLogo: true,
  },
  // front - COMPRAR
  {
    label: "COMPRAR",
    position: [0, 0, OFFSET],
    rotation: [0, 0, 0],
    color: "#00e5ff",
  },
  // back - VENDER
  {
    label: "VENDER",
    position: [0, 0, -OFFSET],
    rotation: [0, Math.PI, 0],
    color: "#3ea6ff",
  },
  // right - GERIR
  {
    label: "GERIR",
    position: [OFFSET, 0, 0],
    rotation: [0, Math.PI / 2, 0],
    color: "#7ad7ff",
  },
  // left - ARRENDAR
  {
    label: "ARRENDAR",
    position: [-OFFSET, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
    color: "#5ec8ff",
  },
  // bottom - FINANCIAR
  {
    label: "FINANCIAR",
    position: [0, -OFFSET, 0],
    rotation: [Math.PI / 2, 0, 0],
    color: "#9ed8ff",
  },
];

const NeonLabel = ({ face }: { face: FaceContent }) => {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (matRef.current) {
      const t = clock.getElapsedTime();
      matRef.current.emissiveIntensity = 2.2 + Math.sin(t * 2 + face.position[0]) * 0.6;
    }
  });

  return (
    <group position={face.position} rotation={face.rotation}>
      <Text
        fontSize={face.isLogo ? 0.7 : 0.28}
        letterSpacing={face.isLogo ? -0.04 : 0.08}
        font="https://fonts.gstatic.com/s/montserrat/v26/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor={face.color}
        outlineOpacity={0.6}
      >
        {face.label}
        <meshStandardMaterial
          ref={matRef}
          color={face.color}
          emissive={face.color}
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </Text>
    </group>
  );
};

const GlassCube = () => {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[SIZE, SIZE, SIZE, 1, 1, 1]} />
          <MeshTransmissionMaterial
            transmission={1}
            thickness={1.4}
            roughness={0.05}
            ior={1.45}
            chromaticAberration={0.05}
            anisotropy={0.3}
            distortion={0.25}
            distortionScale={0.4}
            temporalDistortion={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            attenuationDistance={2}
            attenuationColor="#7dd3fc"
            color="#bae6fd"
            backside
            samples={6}
            resolution={512}
          />
          <Edges threshold={15} color="#67e8f9" />
        </mesh>

        {faces.map((f) => (
          <NeonLabel key={f.label} face={f} />
        ))}
      </group>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#020617", 6, 14]} />

      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 6, 5]} intensity={1.2} color="#bae6fd" />
      <pointLight position={[-4, 2, 4]} intensity={3} color="#06b6d4" distance={12} />
      <pointLight position={[4, -3, -4]} intensity={2.5} color="#3b82f6" distance={12} />
      <pointLight position={[0, 5, -3]} intensity={1.5} color="#a855f7" distance={10} />

      <Suspense fallback={null}>
        <Environment preset="night" />
        <GlassCube />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        rotateSpeed={0.7}
      />

      <EffectComposer>
        <Bloom
          intensity={1.4}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
};

const InteractiveCube = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center"
    >
      <div
        className="relative w-full"
        style={{ height: "min(70vh, 520px)", minHeight: 380 }}
      >
        {/* radial glow backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, hsla(190, 100%, 50%, 0.18) 0%, transparent 60%)",
            filter: "blur(20px)",
          }}
        />
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 38 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          frameloop={visible ? "always" : "never"}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </div>

      <div className="relative z-10 mt-2 text-center pointer-events-none">
        <h2
          className="text-2xl font-black tracking-wider"
          style={{
            color: "hsl(190 100% 75%)",
            textShadow:
              "0 0 30px hsla(190, 100%, 60%, 0.6), 0 0 60px hsla(210, 100%, 50%, 0.3)",
          }}
        >
          SuperApp da Casa
        </h2>
        <p className="text-[11px] text-cyan-300/60 mt-1">
          🖱️ Arraste para rotacionar
        </p>
      </div>
    </div>
  );
};

export default InteractiveCube;
