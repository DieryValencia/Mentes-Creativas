import { motion } from "framer-motion";

export default function CienciasSociales() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-orange-600 dark:text-orange-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-orange-600 dark:text-orange-400">
          Ciencias Sociales 🌍
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-slate-600 dark:text-slate-300">
          Comprende las sociedades humanas, su historia, geografía y cultura. Explora cómo interactuamos como comunidad global y construimos nuestro futuro.
        </p>
        <div className="space-x-4">
          <button className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:scale-105 transition">
            Explorar
          </button>
          <button className="border border-orange-600 text-orange-600 dark:text-orange-400 bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl hover:bg-orange-600 hover:text-white dark:hover:bg-orange-600 dark:hover:text-white transition">
            Ver Casos de Estudio
          </button>
        </div>
      </motion.div>
    </div>
  );
}