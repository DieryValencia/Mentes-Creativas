import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import useSound from "use-sound";
import confetti from "canvas-confetti";

/* -------------------- Tipos -------------------- */
type Key = "america" | "europa" | "africa" | "asia" | "oceania";
type Continente = {
  id: Key;
  nombre: string;
  lat: number;
  lon: number;
  color: string;
  curiosidades: string[];
};

/* -------------------- Datos -------------------- */
const CONTINENTES: Continente[] = [
  { id: "america", nombre: "América", lat: 8, lon: -80, color: "#38bdf8", curiosidades: ["El Amazonas es el río más caudaloso del mundo.", "La cordillera de los Andes es la más larga del planeta.", "En sus bosques viven más de 10% de las especies del planeta."] },
  { id: "europa", nombre: "Europa", lat: 48, lon: 10, color: "#f59e0b", curiosidades: ["El Danubio atraviesa 10 países europeos.", "La Torre Eiffel iba a desmontarse tras 1889.", "Tiene más de 40 idiomas oficiales."] },
  { id: "africa", nombre: "África", lat: 7, lon: 21, color: "#10b981", curiosidades: ["El Sahara es el desierto cálido más grande del mundo.", "El Nilo es uno de los ríos más largos del planeta.", "En África viven leones, jirafas, hipopótamos y elefantes."] },
  { id: "asia", nombre: "Asia", lat: 35, lon: 105, color: "#fb7185", curiosidades: ["El Everest es la montaña más alta del mundo.", "El lago Baikal contiene ~20% del agua dulce superficial.", "Es el continente más poblado."] },
  { id: "oceania", nombre: "Oceanía", lat: -25, lon: 140, color: "#a78bfa", curiosidades: ["En Australia viven canguros y koalas.", "La Gran Barrera de Coral es el mayor arrecife del mundo.", "Nueva Zelanda fue pionera en el voto femenino (1893)."] },
];


/* -------------------- Utilidades 3D -------------------- */
function latLonToVec3(radius: number, lat: number, lon: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

/* -------------------- Subcomponentes 3D -------------------- */
function Nubes({ radius = 1.018 }: { radius?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.12} />
    </mesh>
  );
}

function Markers({ onSelect, nightMode }: { onSelect: (c: Continente) => void; nightMode: boolean }) {
  const markers = useMemo(
    () => CONTINENTES.map((c) => ({ c, pos: latLonToVec3(1.012, c.lat, c.lon) })),
    []
  );

  return (
    <>
      {markers.map(({ c, pos }) => (
        <mesh
          key={c.id}
          position={pos}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(c);
          }}
        >
          <sphereGeometry args={[0.032, 16, 16]} />
          <meshStandardMaterial color={c.color} emissive={c.color} emissiveIntensity={nightMode ? 1.0 : 0.6} />
        </mesh>
      ))}
    </>
  );
}

function Globo3D({
  nightMode,
  onSelect,
  onRegisterCameraSetter,
}: {
  nightMode: boolean;
  onSelect: (c: Continente) => void;
  onRegisterCameraSetter?: (fn: (lat: number, lon: number) => void) => void;
}) {
  const earthMap = useTexture("/textures/earthmap.jpg");
  const { camera } = useThree();

  useEffect(() => {
    if (!onRegisterCameraSetter) return;
    const updateCamera = (lat: number, lon: number) => {
      const p = latLonToVec3(2.4, lat, lon);
      camera.position.lerp(p, 0.6);
      (camera as any).lookAt(0, 0, 0);
    };
    onRegisterCameraSetter(updateCamera);
  }, [camera, onRegisterCameraSetter]);

  return (
    <>
      <ambientLight intensity={nightMode ? 0.25 : 0.8} />
      <directionalLight position={[5, 2, 5]} intensity={nightMode ? 0.5 : 1} color={nightMode ? "#9cc2ff" : "#ffffff"} />
      <Stars radius={60} depth={30} count={2000} factor={2} fade />
      <mesh>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial map={earthMap} roughness={0.85} metalness={0.1} />
        <Nubes />
      </mesh>
      <Markers onSelect={onSelect} nightMode={nightMode} />
      <OrbitControls enablePan={false} autoRotate={false} rotateSpeed={0.9} zoomSpeed={0.7} minDistance={1.8} maxDistance={3.8} />
    </>
  );
}

/* -------------------- UI principal -------------------- */
export default function GloboInteractivo() {
  const [, setSelected] = useState<Continente | null>(null);
  const [nightMode, setNightMode] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [natureOn, setNatureOn] = useState(false);
  const [discovered, setDiscovered] = useState<string[]>(JSON.parse(localStorage.getItem("discovered") || "[]"));

  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5 });
  const [playAmbient, { stop: stopAmbient }] = useSound("/sounds/ambient.mp3", { volume: 0.2, loop: true });
  const [playNature, { stop: stopNature }] = useSound("/sounds/nature.mp3", { volume: 0.25, loop: true });

  useEffect(() => (musicOn ? playAmbient() : stopAmbient()), [musicOn]);
  useEffect(() => (natureOn ? playNature() : stopNature()), [natureOn]);
  useEffect(() => localStorage.setItem("discovered", JSON.stringify(discovered)), [discovered]);

  const handleSelect = (c: Continente) => {
    playClick();
    setSelected(c);
    if (!discovered.includes(c.id)) {
      setDiscovered((prev) => [...prev, c.id]);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.7 } });
    }
    const t = `Has seleccionado ${c.nombre}. ${c.curiosidades[0]}`;
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "es-ES";
    u.rate = 1;
    u.pitch = 1.05;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  };

  const camSetterRef = useRef<((lat: number, lon: number) => void) | null>(null);
  const registerCameraSetter = (fn: (lat: number, lon: number) => void) => {
    camSetterRef.current = fn;
  };
  const centerOn = (c: Continente) => {
    camSetterRef.current?.(c.lat, c.lon);
  };

  const progress = Math.round((discovered.length / CONTINENTES.length) * 100);

  return (
    <div className="w-full max-w-[1080px]">
      {/* Controles superiores */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
        <button onClick={() => setNightMode((v) => !v)} className="px-3 py-1 rounded-lg bg-blue-900/70 border border-blue-400 hover:bg-blue-800" title="Día / Noche">
          {nightMode ? "🌙 Noche" : "☀️ Día"}
        </button>
        <button onClick={() => setMusicOn((v) => !v)} className="px-3 py-1 rounded-lg bg-blue-900/70 border border-blue-400 hover:bg-blue-800">
          {musicOn ? "🔊 Música" : "🔈 Música"}
        </button>
        <button onClick={() => setNatureOn((v) => !v)} className="px-3 py-1 rounded-lg bg-blue-900/70 border border-blue-400 hover:bg-blue-800">
          {natureOn ? "🌿 Sonido naturaleza" : "🌿 Silencio eco"}
        </button>
        <div className="hidden md:flex items-center gap-2 ml-2">
          {CONTINENTES.map((c) => (
            <button key={c.id} onClick={() => centerOn(c)} className="text-xs px-2 py-1 rounded-full bg-slate-800/70 border border-slate-500 hover:bg-slate-700" title={`Centrar en ${c.nombre}`}>
              {c.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Lienzo 3D */}
      <div className="rounded-3xl border border-yellow-400/80 bg-blue-950/40 shadow-2xl p-4">
        <div className="relative w-[760px] max-w-[95vw] h-[560px] mx-auto overflow-hidden rounded-2xl">
          <Canvas camera={{ position: [0, 0, 3.2], fov: 52 }} gl={{ antialias: true }}>
            <Globo3D nightMode={nightMode} onSelect={handleSelect} onRegisterCameraSetter={registerCameraSetter} />
          </Canvas>

          {/* Chips */}
          <div className="absolute right-3 top-3 flex gap-2">
            {CONTINENTES.map((c) => (
              <span key={c.id} className={`text-[11px] px-2 py-0.5 rounded-full border ${discovered.includes(c.id) ? "bg-green-600/90 border-green-300" : "bg-slate-700/70 border-slate-400"}`} title={c.nombre}>
                {c.nombre}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Progreso */}
      <div className="mx-auto mt-5 w-[760px] max-w-[95vw]">
        <h4 className="text-yellow-300 font-semibold mb-1">Progreso del explorador 🌟</h4>
        <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden ring-1 ring-slate-600">
          <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-sm text-blue-200 mt-1">
          Descubierto: <b>{discovered.length}</b> / {CONTINENTES.length} continentes — {progress}%
        </p>
        {discovered.length === CONTINENTES.length && (
          <motion.p initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-2 text-emerald-300 font-semibold">
            ¡Excelente! Has visitado todos los continentes. 🎉
          </motion.p>
        )}
      </div>
    </div>
  );
}











