import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import WaterCycleControls from '../components/WaterCycleControls';

type WaterPhase = 'evaporation' | 'condensation' | 'precipitation' | 'collection';

interface Particle {
  id: number;
  x: number;
  y: number;
  z: number;
  phase: WaterPhase;
  velocity: { x: number; y: number; z: number };
  opacity: number;
  size: number;
  cycleCount: number;
}

export default function CicloDelAgua() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [rotationX, setRotationX] = useState(-20);
  const [rotationY, setRotationY] = useState(30);
  const [selectedPhase, setSelectedPhase] = useState<WaterPhase | 'all'>('all');
  const [showInfo, setShowInfo] = useState(true);
  const [totalCycles, setTotalCycles] = useState(0);
  const animationFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const phaseInfo: Record<WaterPhase, { 
    title: string; 
    description: string; 
    detailedInfo: string;
    color: string;
    emoji: string;
  }> = {
    evaporation: {
      title: 'Evaporación',
      description: 'El agua de océanos, ríos y lagos se calienta por el sol y se convierte en vapor.',
      detailedInfo: 'El calor del sol proporciona la energía necesaria para que las moléculas de agua escapen de la superficie líquida y se conviertan en vapor de agua. Este proceso ocurre continuamente en la naturaleza.',
      color: '#3b82f6',
      emoji: '☀️'
    },
    condensation: {
      title: 'Condensación',
      description: 'El vapor de agua se enfría en la atmósfera y forma pequeñas gotas.',
      detailedInfo: 'A medida que el vapor de agua asciende, la temperatura disminuye. Las moléculas de agua se agrupan alrededor de partículas de polvo formando diminutas gotas que crean las nubes.',
      color: '#8b5cf6',
      emoji: '☁️'
    },
    precipitation: {
      title: 'Precipitación',
      description: 'Las gotas se hacen más grandes y pesadas, cayendo como lluvia o nieve.',
      detailedInfo: 'Cuando las gotas en las nubes chocan y se combinan, crecen hasta volverse demasiado pesadas para permanecer suspendidas. Caen como lluvia, nieve, granizo o aguanieve.',
      color: '#06b6d4',
      emoji: '🌧️'
    },
    collection: {
      title: 'Acumulación',
      description: 'El agua se acumula en océanos, ríos, lagos y agua subterránea.',
      detailedInfo: 'El agua que precipita se recolecta en cuerpos de agua superficiales o se infiltra en el suelo. Parte se evapora, parte es absorbida por plantas, y el ciclo continúa.',
      color: '#0ea5e9',
      emoji: '🌊'
    }
  };

  useEffect(() => {
    const initialParticles: Particle[] = [];
    const particleCount = 200;

    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * 400 - 200,
        y: Math.random() * 300 - 150,
        z: Math.random() * 200 - 100,
        phase: 'evaporation',
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: Math.random() * 1 + 0.5,
          z: (Math.random() - 0.5) * 0.5
        },
        opacity: Math.random() * 0.4 + 0.6,
        size: Math.random() * 3 + 4,
        cycleCount: 0
      });
    }

    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const animate = () => {
      timeRef.current += 0.016 * speed;

      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newParticle = { ...particle };
          
          switch (particle.phase) {
            case 'evaporation':
              newParticle.y += particle.velocity.y * speed;
              newParticle.x += particle.velocity.x * speed;
              newParticle.x += Math.sin(timeRef.current + particle.id) * 0.1 * speed;
              
              if (newParticle.y > 100) {
                newParticle.phase = 'condensation';
                newParticle.velocity.y = (Math.random() - 0.5) * 0.3;
                newParticle.velocity.x = (Math.random() - 0.5) * 0.5;
                newParticle.size = Math.random() * 2.5 + 3;
              }
              break;

            case 'condensation':
              newParticle.x += particle.velocity.x * speed + Math.sin(timeRef.current * 2 + particle.id) * 0.3 * speed;
              newParticle.y += particle.velocity.y * speed * 0.3 + Math.cos(timeRef.current + particle.id) * 0.2 * speed;
              newParticle.z += Math.sin(timeRef.current * 1.5 + particle.id) * 0.3 * speed;
              
              if (Math.random() < 0.008 * speed) {
                newParticle.phase = 'precipitation';
                newParticle.velocity.y = -(Math.random() * 2 + 2.5);
                newParticle.size = Math.random() * 3 + 5;
              }
              break;

            case 'precipitation':
              newParticle.y += particle.velocity.y * speed;
              newParticle.x += particle.velocity.x * speed * 0.2;
              newParticle.velocity.y -= 0.05 * speed;
              
              if (newParticle.y < -120) {
                newParticle.phase = 'collection';
                newParticle.velocity.y = 0;
                newParticle.velocity.x = 0;
                newParticle.opacity = 0.8;
                newParticle.size = Math.random() * 2 + 4;
              }
              break;

            case 'collection':
              newParticle.x += Math.sin(timeRef.current * 0.5 + particle.id) * 0.1 * speed;
              
              if (Math.random() < 0.015 * speed) {
                newParticle.phase = 'evaporation';
                newParticle.y = -130;
                newParticle.x = Math.random() * 400 - 200;
                newParticle.velocity.y = Math.random() * 1 + 0.5;
                newParticle.velocity.x = (Math.random() - 0.5) * 0.5;
                newParticle.opacity = Math.random() * 0.4 + 0.6;
                newParticle.size = Math.random() * 3 + 4;
                newParticle.cycleCount += 1;
                
                if (newParticle.cycleCount > 0 && particle.phase === 'collection') {
                  setTotalCycles(prev => prev + 1);
                }
              }
              break;
          }

          if (newParticle.x > 250) newParticle.x = -250;
          if (newParticle.x < -250) newParticle.x = 250;
          if (newParticle.z > 150) newParticle.z = -150;
          if (newParticle.z < -150) newParticle.z = 150;

          return newParticle;
        })
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, speed, particles.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 1.5;

    const filteredParticles = selectedPhase === 'all' 
      ? particles 
      : particles.filter(p => p.phase === selectedPhase);

    const sortedParticles = [...filteredParticles].sort((a, b) => a.z - b.z);

    sortedParticles.forEach(particle => {
      const rotXRad = (rotationX * Math.PI) / 180;
      const rotYRad = (rotationY * Math.PI) / 180;

      let y1 = particle.y * Math.cos(rotXRad) - particle.z * Math.sin(rotXRad);
      let z1 = particle.y * Math.sin(rotXRad) + particle.z * Math.cos(rotXRad);
      let x2 = particle.x * Math.cos(rotYRad) + z1 * Math.sin(rotYRad);
      let z2 = -particle.x * Math.sin(rotYRad) + z1 * Math.cos(rotYRad);

      const screenX = centerX + x2 * scale;
      const screenY = centerY - y1 * scale;
      const depth = (z2 + 150) / 300;
      const size = particle.size * (0.7 + depth * 0.6) * 1.5;

      const phaseColors: Record<WaterPhase, string> = {
        evaporation: 'rgba(59, 130, 246, ',
        condensation: 'rgba(139, 92, 246, ',
        precipitation: 'rgba(6, 182, 212, ',
        collection: 'rgba(14, 165, 233, '
      };

      const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size);
      gradient.addColorStop(0, phaseColors[particle.phase] + particle.opacity + ')');
      gradient.addColorStop(0.4, phaseColors[particle.phase] + (particle.opacity * 0.8) + ')');
      gradient.addColorStop(1, phaseColors[particle.phase] + '0)');

      ctx.beginPath();
      ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(screenX - size * 0.25, screenY - size * 0.25, size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + (particle.opacity * 0.7) + ')';
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(255, 255, 255, ' + (particle.opacity * 0.3) + ')';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    drawEnvironment(ctx, centerX, centerY);
  }, [particles, rotationX, rotationY, selectedPhase]);

  const drawEnvironment = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number) => {
    const sunGradient = ctx.createRadialGradient(centerX + 250, centerY - 180, 0, centerX + 250, centerY - 180, 40);
    sunGradient.addColorStop(0, '#fef08a');
    sunGradient.addColorStop(0.5, '#fbbf24');
    sunGradient.addColorStop(1, 'rgba(251, 191, 36, 0)');

    ctx.beginPath();
    ctx.arc(centerX + 250, centerY - 180, 40, 0, Math.PI * 2);
    ctx.fillStyle = sunGradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX + 250, centerY - 180, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24';
    ctx.fill();

    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6 + timeRef.current * 0.5;
      ctx.beginPath();
      ctx.moveTo(centerX + 250 + Math.cos(angle) * 35, centerY - 180 + Math.sin(angle) * 35);
      ctx.lineTo(centerX + 250 + Math.cos(angle) * 55, centerY - 180 + Math.sin(angle) * 55);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    const waterGradient = ctx.createLinearGradient(0, centerY + 195, 0, centerY + 295);
    waterGradient.addColorStop(0, 'rgba(14, 165, 233, 0.4)');
    waterGradient.addColorStop(1, 'rgba(14, 165, 233, 0.6)');
    ctx.fillStyle = waterGradient;
    ctx.fillRect(centerX - 300, centerY + 195, 600, 100);

    ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(centerX - 300, centerY + 210 + i * 15);
      for (let x = -300; x < 300; x += 15) {
        ctx.lineTo(
          centerX + x,
          centerY + 210 + i * 15 + Math.sin((x + timeRef.current * 100) / 30) * 2
        );
      }
      ctx.stroke();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={() => navigate('/ciencias-naturales')}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-semibold flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a Ciencias Naturales
            </button>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center justify-center gap-3">
            💧 Ciclo del Agua en 3D.
          </h1>
          <p className="text-xl md:text-2xl text-blue-700 dark:text-blue-300">
            Simulación interactiva del ciclo hidrológico
          </p>
          
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <span className="px-5 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-base font-bold">
              🔄 {totalCycles} ciclos completados
            </span>
            <span className="px-5 py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-base font-bold">
              ⚡ {particles.length} partículas activas
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 md:p-6">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full border-2 border-blue-200 dark:border-blue-700 rounded-xl bg-gradient-to-b from-sky-100 to-blue-50 dark:from-slate-900 dark:to-slate-800"
                style={{ touchAction: 'none' }}
              />
              
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-base font-semibold text-gray-700 dark:text-gray-300">
                      🔄 Rotación Horizontal.
                    </label>
                    <span className="text-base text-blue-600 dark:text-blue-400 font-bold">
                      {rotationY}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={rotationY}
                    onChange={(e) => setRotationY(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-base font-semibold text-gray-700 dark:text-gray-300">
                      ↕️ Rotación Vertical.
                    </label>
                    <span className="text-base text-blue-600 dark:text-blue-400 font-bold">
                      {rotationX}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-90"
                    max="90"
                    value={rotationX}
                    onChange={(e) => setRotationX(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-cyan-50 dark:from-slate-800 dark:to-cyan-900/20 rounded-2xl shadow-xl p-6 border-2 border-cyan-100 dark:border-cyan-800">
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-5 flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                Filtrar por Fase
              </h3>
              <div className="grid grid-cols-5 gap-3">
                <button
                  onClick={() => setSelectedPhase('all')}
                  className={`py-4 px-4 rounded-xl font-bold text-base transition-all duration-300 shadow-md ${
                    selectedPhase === 'all'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white scale-110 shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:scale-105'
                  }`}
                >
                  Todas
                </button>
                {(Object.keys(phaseInfo) as WaterPhase[]).map((phase) => (
                  <button
                    key={phase}
                    onClick={() => setSelectedPhase(phase)}
                    className={`py-4 px-4 rounded-xl font-bold text-2xl transition-all duration-300 shadow-md ${
                      selectedPhase === phase
                        ? 'scale-110 shadow-xl'
                        : 'hover:scale-110 bg-white dark:bg-gray-700'
                    }`}
                    style={{
                      backgroundColor: selectedPhase === phase ? phaseInfo[phase].color : undefined,
                      color: selectedPhase === phase ? 'white' : undefined
                    }}
                    title={phaseInfo[phase].title}
                  >
                    {phaseInfo[phase].emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <WaterCycleControls
              isPlaying={isPlaying}
              speed={speed}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              onSpeedChange={setSpeed}
              onReset={() => {
                setRotationX(-20);
                setRotationY(30);
                setSpeed(1);
                setSelectedPhase('all');
              }}
            />

            <div className="bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/20 rounded-2xl shadow-2xl p-8 border-2 border-purple-100 dark:border-purple-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                  <span className="text-4xl">📚</span>
                  Información de las Fases
                </h2>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-4xl font-bold transition-transform hover:scale-110"
                >
                  {showInfo ? '➖' : '➕'}
                </button>
              </div>
              
              {showInfo && (
                <div className="space-y-5">
                  {(Object.keys(phaseInfo) as WaterPhase[]).map((phase, index) => (
                    <div
                      key={phase}
                      className="p-6 rounded-2xl border-3 transition-all hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl"
                      style={{
                        borderWidth: '3px',
                        borderColor: phaseInfo[phase].color,
                        backgroundColor: `${phaseInfo[phase].color}15`,
                        animationDelay: `${index * 0.1}s`
                      }}
                      onClick={() => setSelectedPhase(phase)}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-5xl bg-white dark:bg-slate-700 p-3 rounded-xl shadow-md">
                          {phaseInfo[phase].emoji}
                        </div>
                        <h3 className="font-bold text-2xl text-gray-800 dark:text-white">
                          {phaseInfo[phase].title}
                        </h3>
                      </div>
                      <p className="text-lg text-gray-700 dark:text-gray-200 mb-3 leading-relaxed font-medium">
                        {phaseInfo[phase].description}
                      </p>
                      <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl">
                        <p className="text-base text-gray-600 dark:text-gray-300 italic leading-relaxed">
                          ℹ️ {phaseInfo[phase].detailedInfo}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 rounded-2xl shadow-2xl p-8 text-white border-2 border-blue-400">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-4xl bg-white/20 p-2 rounded-xl">📊</span>
                Estadísticas en Tiempo Real
              </h2>
              <div className="space-y-6">
                {(Object.keys(phaseInfo) as WaterPhase[]).map((phase) => {
                  const count = particles.filter(p => p.phase === phase).length;
                  const percentage = ((count / particles.length) * 100).toFixed(1);
                  return (
                    <div key={phase} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-all">
                      <div className="flex justify-between items-center text-xl mb-4">
                        <span className="font-bold flex items-center gap-3">
                          <span className="text-4xl bg-white/20 p-2 rounded-lg">{phaseInfo[phase].emoji}</span>
                          <span className="text-white drop-shadow-lg">{phaseInfo[phase].title}</span>
                        </span>
                        <span className="font-bold text-2xl bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                          {count} <span className="text-lg">({percentage}%)</span>
                        </span>
                      </div>
                      <div className="relative w-full bg-white/20 rounded-full h-5 overflow-hidden shadow-inner">
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-white to-blue-100 rounded-full transition-all duration-500 shadow-lg flex items-center justify-end pr-3"
                          style={{ width: `${percentage}%` }}
                        >
                          {parseFloat(percentage) > 15 && (
                            <span className="text-blue-700 font-bold text-sm">{percentage}%</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-6 border-t-2 border-white/30">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-3xl mb-2">💧</div>
                    <div className="text-2xl font-bold">{particles.length}</div>
                    <div className="text-sm opacity-90">Total Partículas</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-3xl mb-2">🔄</div>
                    <div className="text-2xl font-bold">{totalCycles}</div>
                    <div className="text-sm opacity-90">Ciclos Completos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}