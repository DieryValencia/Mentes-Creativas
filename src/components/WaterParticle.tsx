// Tipos y utilidades para partículas del ciclo del agua

export type WaterPhase = 'evaporation' | 'condensation' | 'precipitation' | 'collection';

export interface Particle {
  id: number;
  x: number;
  y: number;
  z: number;
  phase: WaterPhase;
  velocity: {
    x: number;
    y: number;
    z: number;
  };
  opacity: number;
}

// Constantes del sistema
export const PARTICLE_CONFIG = {
  COUNT: 150,
  SIZE_MIN: 2,
  SIZE_MAX: 5,
  OPACITY_MIN: 0.5,
  OPACITY_MAX: 1.0,
  SPACE_BOUNDS: {
    x: { min: -250, max: 250 },
    y: { min: -150, max: 150 },
    z: { min: -150, max: 150 }
  }
};

// Configuración de fases
export const PHASE_CONFIG: Record<WaterPhase, {
  color: string;
  transitionHeight?: number;
  transitionProbability?: number;
}> = {
  evaporation: {
    color: 'rgba(59, 130, 246, ',
    transitionHeight: 100
  },
  condensation: {
    color: 'rgba(139, 92, 246, ',
    transitionProbability: 0.005
  },
  precipitation: {
    color: 'rgba(6, 182, 212, ',
    transitionHeight: -120
  },
  collection: {
    color: 'rgba(14, 165, 233, ',
    transitionProbability: 0.01
  }
};

/**
 * Crea una partícula inicial para el ciclo del agua
 * @param id - Identificador único de la partícula
 * @returns Nueva partícula con propiedades iniciales
 */
export function createParticle(id: number): Particle {
  return {
    id,
    x: Math.random() * 400 - 200,
    y: Math.random() * 300 - 150,
    z: Math.random() * 200 - 100,
    phase: 'evaporation',
    velocity: {
      x: (Math.random() - 0.5) * 0.5,
      y: Math.random() * 1 + 0.5,
      z: (Math.random() - 0.5) * 0.5
    },
    opacity: Math.random() * 0.5 + 0.5
  };
}

/**
 * Actualiza la posición y estado de una partícula según su fase
 * @param particle - Partícula a actualizar
 * @param speed - Multiplicador de velocidad
 * @returns Partícula actualizada
 */
export function updateParticle(particle: Particle, speed: number): Particle {
  let newParticle = { ...particle };
  
  switch (particle.phase) {
    case 'evaporation':
      newParticle = updateEvaporationPhase(newParticle, speed);
      break;
    case 'condensation':
      newParticle = updateCondensationPhase(newParticle, speed);
      break;
    case 'precipitation':
      newParticle = updatePrecipitationPhase(newParticle, speed);
      break;
    case 'collection':
      newParticle = updateCollectionPhase(newParticle, speed);
      break;
  }

  // Aplicar límites del espacio 3D
  newParticle = applySpaceBounds(newParticle);
  
  return newParticle;
}

// Funciones auxiliares para cada fase
function updateEvaporationPhase(particle: Particle, speed: number): Particle {
  const updated = { ...particle };
  updated.y += particle.velocity.y * speed;
  updated.x += particle.velocity.x * speed;
  
  if (updated.y > PHASE_CONFIG.evaporation.transitionHeight!) {
    updated.phase = 'condensation';
    updated.velocity.y = (Math.random() - 0.5) * 0.3;
  }
  
  return updated;
}

function updateCondensationPhase(particle: Particle, speed: number): Particle {
  const updated = { ...particle };
  updated.x += particle.velocity.x * speed;
  updated.y += particle.velocity.y * speed * 0.3;
  updated.z += (Math.random() - 0.5) * 0.5 * speed;
  
  if (Math.random() < PHASE_CONFIG.condensation.transitionProbability! * speed) {
    updated.phase = 'precipitation';
    updated.velocity.y = -(Math.random() * 2 + 2);
  }
  
  return updated;
}

function updatePrecipitationPhase(particle: Particle, speed: number): Particle {
  const updated = { ...particle };
  updated.y += particle.velocity.y * speed;
  updated.x += particle.velocity.x * speed * 0.3;
  
  if (updated.y < PHASE_CONFIG.precipitation.transitionHeight!) {
    updated.phase = 'collection';
    updated.velocity.y = 0;
  }
  
  return updated;
}

function updateCollectionPhase(particle: Particle, speed: number): Particle {
  const updated = { ...particle };
  
  if (Math.random() < PHASE_CONFIG.collection.transitionProbability! * speed) {
    updated.phase = 'evaporation';
    updated.y = -130;
    updated.velocity.y = Math.random() * 1 + 0.5;
    updated.opacity = Math.random() * 0.5 + 0.5;
  }
  
  return updated;
}

function applySpaceBounds(particle: Particle): Particle {
  const bounded = { ...particle };
  const bounds = PARTICLE_CONFIG.SPACE_BOUNDS;
  
  if (bounded.x > bounds.x.max) bounded.x = bounds.x.min;
  if (bounded.x < bounds.x.min) bounded.x = bounds.x.max;
  if (bounded.z > bounds.z.max) bounded.z = bounds.z.min;
  if (bounded.z < bounds.z.min) bounded.z = bounds.z.max;
  
  return bounded;
}

/**
 * Proyecta coordenadas 3D a 2D con rotación isométrica
 * @param x - Coordenada X
 * @param y - Coordenada Y
 * @param z - Coordenada Z
 * @param rotationX - Ángulo de rotación en X (grados)
 * @param rotationY - Ángulo de rotación en Y (grados)
 * @returns Coordenadas 2D proyectadas y profundidad
 */
export function project3DTo2D(
  x: number,
  y: number,
  z: number,
  rotationX: number,
  rotationY: number
): { x: number; y: number; z: number } {
  const rotXRad = (rotationX * Math.PI) / 180;
  const rotYRad = (rotationY * Math.PI) / 180;

  // Rotación en X
  const y1 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
  const z1 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);

  // Rotación en Y
  const x2 = x * Math.cos(rotYRad) + z1 * Math.sin(rotYRad);
  const z2 = -x * Math.sin(rotYRad) + z1 * Math.cos(rotYRad);

  return { x: x2, y: y1, z: z2 };
}

/**
 * Calcula el tamaño de renderizado basado en la profundidad
 * @param z - Coordenada Z de la partícula
 * @returns Tamaño en píxeles
 */
export function calculateParticleSize(z: number): number {
  return PARTICLE_CONFIG.SIZE_MIN + (z + 150) / 50;
}