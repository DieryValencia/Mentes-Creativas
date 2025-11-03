import { motion } from "framer-motion";

export default function CienciasNaturales() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-green-600 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-green-600 dark:text-green-400">
          Ciencias Naturales 🌿
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-slate-600 dark:text-slate-300">
          Explora el mundo natural a través de la biología, química y física. Descubre los fenómenos que gobiernan nuestro planeta y la vida que lo habita.
        </p>
        <div className="space-x-4">
          <button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:scale-105 transition">
            Experimentar
          </button>
          <button className="border border-green-600 text-green-600 dark:text-green-400 bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white transition">
            Ver Experimentos
          </button>
        </div>
      </motion.div>
    </div>
  );
}