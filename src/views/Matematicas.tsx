import { motion } from "framer-motion";

export default function Matematicas() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-blue-600 dark:text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-600 dark:text-blue-400">
          Matemáticas 📊
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-slate-600 dark:text-slate-300">
          Explora conceptos matemáticos fundamentales. Este tema incluye el subtema <span className="font-bold text-blue-600 dark:text-blue-400">Descomposición</span> para análisis detallado de números.
        </p>
        <div className="space-x-4">
          <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:scale-105 transition">
            Practicar
          </button>
          <button className="border border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition">
            Ver Ejercicios
          </button>
        </div>
      </motion.div>
    </div>
  );
}