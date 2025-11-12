import { motion } from "framer-motion";

export const figures = [
  {
    name: "cubo",
    label: "Cubo",
    faces: 6,
    edges: 12,
    vertices: 8,
    description: "Un cubo tiene 6 caras cuadradas, 12 aristas y 8 vértices"
  },
  {
    name: "piramide",
    label: "Pirámide Triangular",
    faces: 4,
    edges: 6,
    vertices: 4,
    description: "Una pirámide triangular tiene 3 caras triangulares y 1 cara triangular (base), 6 aristas y 4 vértices"
  },
  {
    name: "cono",
    label: "Cono",
    faces: 2,
    edges: 1,
    vertices: 1,
    description: "Un cono tiene 1 cara circular (base) y 1 cara curva lateral, 1 arista circular y 1 vértice (ápice)"
  }
];

interface DescomposicionFigureProps {
  selectedFigure: string;
}

export default function DescomposicionFigure({ selectedFigure }: DescomposicionFigureProps) {
  const currentFigure = figures.find(f => f.name === selectedFigure) || figures[0];

  const render3DFigure = () => {
    switch (currentFigure.name) {
      case "cubo":
        return (
          <div className="flex items-center justify-center h-64" style={{ perspective: '1000px' }}>
            <motion.div
              className="relative w-40 h-40"
              style={{
                transformStyle: 'preserve-3d'
              }}
              animate={{
                rotateX: [-20, -20, -20],
                rotateY: [30, 390, 30]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Cara frontal - Verde tropical */}
              <div
                className="absolute w-full h-full bg-gradient-to-br from-emerald-300 to-emerald-500 border-2 border-emerald-800 flex items-center justify-center text-white font-bold"
                style={{ transform: 'translateZ(80px)' }}
              >
                <span className="text-sm">Frontal</span>
              </div>

              {/* Cara trasera - Azul tropical */}
              <div
                className="absolute w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-cyan-800 flex items-center justify-center text-white font-bold"
                style={{ transform: 'translateZ(-80px) rotateY(180deg)' }}
              >
                <span className="text-sm">Trasera</span>
              </div>

              {/* Cara derecha - Naranja tropical */}
              <div
                className="absolute w-full h-full bg-gradient-to-br from-lime-300 to-lime-500 border-2 border-orange-800 flex items-center justify-center text-white font-bold"
                style={{ transform: 'rotateY(90deg) translateZ(80px)' }}
              >
                <span className="text-sm">Derecha</span>
              </div>

              {/* Cara izquierda - Verde-azul tropical */}
              <div
                className="absolute w-full h-full bg-gradient-to-br from-teal-300 to-teal-500 border-2 border-teal-800 flex items-center justify-center text-white font-bold"
                style={{ transform: 'rotateY(-90deg) translateZ(80px)' }}
              >
                <span className="text-sm">Izquierda</span>
              </div>

              {/* Cara superior - Amarillo tropical */}
              <div
                className="absolute w-full h-full bg-gradient-to-br from-green-300 to-green-500 border-2 border-yellow-600 flex items-center justify-center text-white font-bold"
                style={{ transform: 'rotateX(90deg) translateZ(80px)' }}
              >
                <span className="text-sm">Superior</span>
              </div>

              {/* Cara inferior - Verde oscuro tropical */}
              <div
                className="absolute w-full h-full bg-gradient-to-br from-green-700 to-green-900 border-2 border-green-900 flex items-center justify-center text-white font-bold"
                style={{ transform: 'rotateX(-90deg) translateZ(80px)' }}
              >
                <span className="text-sm">Inferior</span>
              </div>
            </motion.div>
          </div>
        );

      case "piramide":
        return (
          <div className="flex items-center justify-center h-64" style={{ perspective: '1000px' }}>
            <motion.div
              className="relative w-48 h-48"
              style={{
                transformStyle: 'preserve-3d'
              }}
              animate={{
                rotateX: [-15, -15, -15],
                rotateY: [25, 385, 25]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Base triangular completamente cerrada */}
              <div
                className="absolute"
                style={{
                  transform: 'rotateX(90deg) translateZ(-20px)',
                  width: 0,
                  height: 0,
                  borderLeft: '85px solid transparent',
                  borderRight: '85px solid transparent',
                  borderBottom: '145px solid rgba(71, 49, 31, 1)',
                  transformOrigin: 'center bottom',
                  left: '50%',
                  marginLeft: '-85px',
                  filter: 'drop-shadow(0 0 8px rgb(251, 146, 60)))'
                }}
              />

              {/* Cara frontal completamente cerrada */}
              <div
                className="absolute"
                style={{
                  transform: ' translateZ(42px) rotateX(-58deg)',
                  width: 0,
                  height: 0,
                  borderLeft: '85px solid transparent',
                  borderRight: '85px solid transparent',
                  borderBottom: '145px solid rgb(251, 146, 60))',
                  transformOrigin: 'center bottom',
                  left: '50%',
                  marginLeft: '-85px',
                  filter: 'drop-shadow(0 0 8px rgb(251, 146, 60)))'
                }}
              />

              {/* Cara derecha completamente cerrada */}
              <div
                className="absolute"
                style={{
                  transform: 'rotateY(120deg) translateZ(42px) rotateX(-58deg)',
                  width: 0,
                  height: 0,
                  borderLeft: '85px solid transparent',
                  borderRight: '85px solid transparent',
                  borderBottom: '145px solid rgb(251, 146, 60)',
                  transformOrigin: 'center bottom',
                  left: '50%',
                  marginLeft: '-85px',
                  filter: 'drop-shadow(0 0 8px rgb(251, 146, 60))'
                }}
              />

              {/* Cara izquierda completamente cerrada */}
              <div
                className="absolute"
                style={{
                  transform: 'rotateY(-120deg) translateZ(42px) rotateX(-58deg)',
                  width: 0,
                  height: 0,
                  borderLeft: '85px solid transparent',
                  borderRight: '85px solid transparent',
                  borderBottom: '145px solid rgb(251, 146, 60)',
                  transformOrigin: 'center bottom',
                  left: '50%',
                  marginLeft: '-85px',
                  filter: 'drop-shadow(0 0 8px rgb(251, 146, 60))'
                }}
              />

              {/* Vértice superior con sombra */}

            </motion.div>
          </div>
        );

      case "cono":
        return (
          <div className="flex items-center justify-center h-64" style={{ perspective: '1000px' }}>
            <motion.div
              className="relative w-48 h-56"
              style={{
                transformStyle: 'preserve-3d'
              }}
              animate={{
                rotateX: [-10, -10, -10],
                rotateY: [15, 375, 15]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Base circular del cono */}
              <div
                className="absolute rounded-full bg-gradient-to-br from-lime-300 to-lime-500 border-2 border-orange-700"
                style={{
                  transform: 'rotateX(90deg) translateZ(-28px)',
                  width: '160px',
                  height: '160px',
                  left: '50%',
                  top: '85%',
                  marginLeft: '-80px',
                  marginTop: '-80px',
                  filter: 'drop-shadow(0 8px 16px rgba(251, 146, 60, 0.4))'
                }}
              />

              {/* Cara lateral frontal del cono */}
              <div
                className="absolute bg-gradient-to-b from-orange-500 to-orange-700 border-2 border-orange-800"
                style={{
                  transform: 'translateZ(28px)',
                  width: '0',
                  height: '0',
                  borderLeft: '80px solid transparent',
                  borderRight: '80px solid transparent',
                  borderBottom: '140px solid rgb(251, 146, 60)',
                  left: '50%',
                  top: '5%',
                  marginLeft: '-80px',
                  transformOrigin: 'center bottom',
                  filter: 'drop-shadow(0 0 12px rgba(251, 146, 60, 0.5))'
                }}
              />

              {/* Cara lateral derecha del cono */}
              <div
                className="absolute bg-gradient-to-b from-orange-600 to-orange-800 border-2 border-orange-900"
                style={{
                  transform: 'rotateY(60deg) translateZ(28px)',
                  width: '0',
                  height: '0',
                  borderLeft: '80px solid transparent',
                  borderRight: '80px solid transparent',
                  borderBottom: '140px solid rgb(234, 88, 12)',
                  left: '50%',
                  top: '5%',
                  marginLeft: '-80px',
                  transformOrigin: 'center bottom',
                  filter: 'drop-shadow(0 0 8px rgba(234, 88, 12, 0.4))'
                }}
              />

              {/* Cara lateral izquierda del cono */}
              <div
                className="absolute bg-gradient-to-b from-orange-600 to-orange-800 border-2 border-orange-900"
                style={{
                  transform: 'rotateY(-60deg) translateZ(28px)',
                  width: '0',
                  height: '0',
                  borderLeft: '80px solid transparent',
                  borderRight: '80px solid transparent',
                  borderBottom: '140px solid rgb(234, 88, 12)',
                  left: '50%',
                  top: '5%',
                  marginLeft: '-80px',
                  transformOrigin: 'center bottom',
                  filter: 'drop-shadow(0 0 8px rgba(234, 88, 12, 0.4))'
                }}
              />

              {/* Vértice del cono (ápice) */}
              <div
                className="absolute w-8 h-8 bg-gradient-to-br from-orange-200 to-orange-400 rounded-full border-2 border-orange-500 shadow-xl"
                style={{
                  transform: 'translateZ(98px)',
                  left: '50%',
                  top: '3%',
                  marginLeft: '-16px',
                  filter: 'drop-shadow(0 0 12px rgba(252, 211, 77, 0.8))'
                }}
              >
                <div className="absolute top-1 left-1 w-3 h-3 bg-white/90 rounded-full"></div>
              </div>

              {/* Borde circular de la base (visible desde ciertos ángulos) */}
              <div
                className="absolute rounded-full border-4 border-orange-800/60"
                style={{
                  transform: 'rotateX(90deg) translateZ(-30px) scale(0.95)',
                  width: '152px',
                  height: '152px',
                  left: '50%',
                  top: '85%',
                  marginLeft: '-76px',
                  marginTop: '-76px'
                }}
              />
            </motion.div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {render3DFigure()}
      <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2 mt-4">
        {currentFigure.label}
      </h4>
      <p className="text-sm text-purple-600 dark:text-purple-400 animate-pulse">
        🔄 Rotación continua 360°
      </p>
    </div>
  );
}