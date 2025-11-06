interface WaterCycleControlsProps {
  isPlaying: boolean;
  speed: number;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
  onReset: () => void;
}

export default function WaterCycleControls({
  isPlaying,
  speed,
  onPlayPause,
  onSpeedChange,
  onReset,
}: WaterCycleControlsProps) {
  // ✅ Uso real de `speed` (ESLint lo reconocerá aquí)
  const displaySpeed = speed.toFixed(1);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-2xl p-8 border-2 border-blue-100 dark:border-blue-800">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
        <span className="text-4xl">🎮</span>
        Controles
      </h2>

      <div className="space-y-6">
        <button
          onClick={onPlayPause}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xl py-5 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
          aria-label={isPlaying ? "Pausar simulación" : "Iniciar simulación"}
        >
          {isPlaying ? (
            <>
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Pausar
            </>
          ) : (
            <>
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Reproducir
            </>
          )}
        </button>

        <div className="bg-white dark:bg-slate-700 rounded-xl p-5 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <label className="text-lg font-bold text-gray-700 dark:text-gray-200">
              ⚡ Velocidad de simulación
            </label>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-4 py-1 rounded-full">
              {displaySpeed}x
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full h-4 bg-gradient-to-r from-blue-200 to-cyan-200 dark:from-blue-800 dark:to-cyan-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            aria-label="Control de velocidad"
          />
          <div className="flex justify-between text-sm font-semibold text-gray-600 dark:text-gray-400 mt-3">
            <span>🐢 Lento</span>
            <span>🚶 Normal</span>
            <span>🚀 Rápido</span>
          </div>
        </div>

        <button
          onClick={onReset}
          className="w-full bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 dark:from-gray-600 dark:to-gray-700 dark:hover:from-gray-700 dark:hover:to-gray-800 text-gray-800 dark:text-white font-bold text-lg py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg transform hover:scale-105"
          aria-label="Reiniciar vista"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reiniciar Vista
        </button>

        <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl border-2 border-blue-200 dark:border-blue-700 shadow-inner">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-3">
            <span className="text-3xl">💡</span>
            Instrucciones
          </h3>
          <ul className="text-base text-blue-800 dark:text-blue-200 space-y-3 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-xl">🔄</span>
              <span>Usa los controles deslizantes para rotar la vista</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-xl">⚡</span>
              <span>Ajusta la velocidad para ver mejor cada fase</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-xl">🎨</span>
              <span>Observa cómo las partículas cambian de color</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-xl">⏸️</span>
              <span>Pausa para analizar un momento específico</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
