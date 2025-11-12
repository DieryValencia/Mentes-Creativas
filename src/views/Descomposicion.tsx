import { motion } from "framer-motion";
import { useState } from "react";
import DescomposicionFigure, { figures } from "../components/DescomposicionFigure";

export default function Descomposicion() {
  const [selectedFigure, setSelectedFigure] = useState<string>("cubo");

  const currentFigure = figures.find(f => f.name === selectedFigure) || figures[0];


  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full"
      >
        {/* Header */}
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
          Descomposición de Figuras 🔧
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-slate-600 dark:text-slate-300">
          Explora la descomposición de figuras 3D en sus elementos fundamentales: caras, aristas y vértices.
        </p>

        {/* Selector de Figuras */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Selecciona una Figura:</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {figures.map((figure) => (
              <button
                key={figure.name}
                onClick={() => setSelectedFigure(figure.name)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedFigure === figure.name
                    ? "bg-purple-600 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                }`}
              >
                {figure.label}
              </button>
            ))}
          </div>
        </div>

        {/* Figura 3D Visual */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mx-auto max-w-lg">
            <DescomposicionFigure selectedFigure={selectedFigure} />
          </div>
        </div>

        {/* Información de Elementos */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-6">
            Elementos de la Figura
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-2">📐</div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Caras</h4>
              <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mb-2">
                {currentFigure.faces}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Superficies que forman la figura
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-2">📏</div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Aristas</h4>
              <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mb-2">
                {currentFigure.edges}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Líneas donde se encuentran caras
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-2">⚡</div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Vértices</h4>
              <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mb-2">
                {currentFigure.vertices}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Puntos donde se encuentran aristas
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
            <p className="text-purple-800 dark:text-purple-200 font-medium">
              {currentFigure.description}
            </p>
          </div>
        </div>

        {/* Fórmula de Euler */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Fórmula de Euler
          </h3>
          <div className="text-3xl font-mono bg-white dark:bg-slate-900 rounded-lg p-4 inline-block">
            C - A + V = 2
          </div>
          <p className="text-slate-600 dark:text-slate-400 mt-4">
            <strong>C</strong> = Caras, <strong>A</strong> = Aristas, <strong>V</strong> = Vértices
          </p>
          <p className="text-purple-600 dark:text-purple-400 font-medium mt-2">
            Para {currentFigure.label}: {currentFigure.faces} - {currentFigure.edges} + {currentFigure.vertices} = {currentFigure.faces - currentFigure.edges + currentFigure.vertices}
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-purple-200 dark:border-purple-800">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <svg
                className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">
                ¡DIERY VALENCIA @2025!
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Gracias por visitarnos hasta la proxima.
            </p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}