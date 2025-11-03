import { motion } from "framer-motion";

export default function Descomposicion() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-purple-600 dark:text-purple-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-600 dark:text-purple-400">
          Descomposición 🔧
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-slate-600 dark:text-slate-300">
          Aprende a descomponer números en sus factores primos y componentes básicos. Esta técnica es fundamental para resolver problemas matemáticos complejos.
        </p>
        <div className="space-x-4">
          <button className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:scale-105 transition">
            Calcular
          </button>
          <button className="border border-purple-600 text-purple-600 dark:text-purple-400 bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition">
            Ejemplos
          </button>
        </div>
      </motion.div>
    </div>
  );
}