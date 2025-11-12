import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CienciasNaturales() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl"
      >
        <div className="w-36 h-36 mx-auto mb-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shadow-xl">
          <svg
            className="w-20 h-20 text-green-600 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>

        <h2 className="text-5xl md:text-6xl font-extrabold mb-5 text-green-600 dark:text-green-400">
          Ciencias Naturales 🌿
        </h2>
        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-slate-700 dark:text-slate-300 leading-relaxed">
          Explora el mundo natural a través de la biología, química y física. 
          Descubre los fenómenos que gobiernan nuestro planeta y la vida que lo habita.
        </p>

        {/* Tarjeta principal del Ciclo del Agua */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
          className="max-w-3xl mx-auto mb-10"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 p-10">
            {/* Efectos de fondo */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-36 -mt-36"></div>
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full blur-3xl -ml-28 -mb-28"></div>
            
            <div className="relative z-10">
              <div className="text-8xl mb-6 animate-bounce">💧</div>
              <h3 className="text-4xl font-bold text-white mb-4">
                Ciclo del Agua en 3D
              </h3>
              <p className="text-xl text-white/95 mb-8 leading-relaxed max-w-xl mx-auto">
                Explora de forma interactiva las cuatro fases del ciclo hidrológico: 
                <span className="font-semibold"> evaporación, condensación, precipitación y acumulación.</span>
              </p>
              
              {/* Grid de características */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 text-left hover:bg-white/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">🎮</span>
                    <span className="font-bold text-white text-lg">Interactivo</span>
                  </div>
                  <p className="text-base text-white/90 leading-relaxed">
                    Controla la velocidad, rotación y visualiza cada fase
                  </p>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 text-left hover:bg-white/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">📊</span>
                    <span className="font-bold text-white text-lg">Estadísticas</span>
                  </div>
                  <p className="text-base text-white/90 leading-relaxed">
                    Observa datos en tiempo real y ciclos completados
                  </p>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 text-left hover:bg-white/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">🎨</span>
                    <span className="font-bold text-white text-lg">Visual 3D</span>
                  </div>
                  <p className="text-base text-white/90 leading-relaxed">
                    200 partículas animadas con efectos realistas
                  </p>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 text-left hover:bg-white/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">📚</span>
                    <span className="font-bold text-white text-lg">Educativo</span>
                  </div>
                  <p className="text-base text-white/90 leading-relaxed">
                    Aprende con información científica detallada
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/ciclo-del-agua')}
                className="w-full bg-white text-blue-600 font-bold text-xl px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">🚀</span>
                Comenzar Exploración
              </button>
            </div>
          </div>
        </motion.div>

        {/* Sección informativa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="text-5xl mb-4">☀️☀️</div>
            <h4 className="font-bold text-xl mb-3 text-slate-800 dark:text-white">Evaporación</h4>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              El sol calienta el agua de océanos y ríos, transformándola en vapor que asciende a la atmósfera
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="text-5xl mb-4">☁️☁️</div>
            <h4 className="font-bold text-xl mb-3 text-slate-800 dark:text-white">Condensación</h4>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              El vapor se enfría en la atmósfera y forma pequeñas gotas que crean las nubes
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="text-5xl mb-4">🌧️🌧️</div>
            <h4 className="font-bold text-xl mb-3 text-slate-800 dark:text-white">Precipitación</h4>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Las gotas se hacen pesadas y caen como lluvia, nieve o granizo hacia la tierra
            </p>
          </motion.div>
        </div>

        {/* Botón alternativo */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/ciclo-del-agua')}
          className="border-2 border-green-600 text-green-600 dark:text-green-400 bg-white dark:bg-slate-800 font-bold text-lg px-8 py-4 rounded-2xl hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white transition-all shadow-lg"
        >
          Ver Simulación Completa
        </motion.button>
      </motion.div>
    </div>
  );
}