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
  onReset
}: WaterCycleControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Controles</h2>
      
      {/* Botones de control */}
      <div className="space-y-4">
        {/* Play/Pause */}
        <button
          onClick={onPlayPause}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          aria-label={isPlaying ? 'Pausar simulación' : 'Iniciar simulación'}
        >
          {isPlaying ? (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Pausar
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Reproducir
            </>
          )}
        </button>

        {/* Control de velocidad */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              Velocidad de simulación
            </label>
            <span className="text-sm font-semibold text-blue-600">
              {speed.toFixed(1)}x
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            aria-label="Control de velocidad"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Lento</span>
            <span>Normal</span>
            <span>Rápido</span>
          </div>
        </div>

        {/* Botón de reset */}
        <button
          onClick={onReset}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          aria-label="Reiniciar vista"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reiniciar Vista
        </button>

        {/* Instrucciones */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            💡 Instrucciones
          </h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Usa los controles deslizantes para rotar la vista</li>
            <li>• Ajusta la velocidad para ver mejor cada fase</li>
            <li>• Observa cómo las partículas cambian de color</li>
            <li>• Pausa para analizar un momento específico</li>
          </ul>
        </div>
      </div>
    </div>
  );
}