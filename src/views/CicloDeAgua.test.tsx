import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CicloDelAgua from './CicloDelAgua';

// Mock del canvas para que funcione en tests
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    clearRect: jest.fn(),
    fillRect: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    stroke: jest.fn(),
    createRadialGradient: jest.fn(() => ({
      addColorStop: jest.fn(),
    })),
    createLinearGradient: jest.fn(() => ({
      addColorStop: jest.fn(),
    })),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    translate: jest.fn(),
  })) as any;
});

describe('CicloDelAgua - Simulación del Ciclo del Agua', () => {
  test('debe renderizar todos los elementos esenciales de la simulación', () => {
    render(
      <BrowserRouter>
        <CicloDelAgua />
      </BrowserRouter>
    );

    // Verificar título principal
    expect(screen.getByText(/Ciclo del Agua en 3D/i)).toBeInTheDocument();
    expect(screen.getByText(/Simulación interactiva del ciclo hidrológico/i)).toBeInTheDocument();

    // Verificar que existe el canvas
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();

    // Verificar controles (puede aparecer múltiples veces)
    const controlesElements = screen.getAllByText(/Controles/i);
    expect(controlesElements.length).toBeGreaterThan(0);

    // Verificar controles específicos
    expect(screen.getByText(/Pausar|Reproducir/i)).toBeInTheDocument();
    expect(screen.getByText(/Velocidad de simulación/i)).toBeInTheDocument();
    expect(screen.getByText(/Reiniciar Vista/i)).toBeInTheDocument();

    // Verificar las 4 fases (aparecen múltiples veces en la UI)
    const evaporacionElements = screen.getAllByText(/Evaporación/i);
    expect(evaporacionElements.length).toBeGreaterThan(0);
    
    const condensacionElements = screen.getAllByText(/Condensación/i);
    expect(condensacionElements.length).toBeGreaterThan(0);
    
    const precipitacionElements = screen.getAllByText(/Precipitación/i);
    expect(precipitacionElements.length).toBeGreaterThan(0);
    
    const acumulacionElements = screen.getAllByText(/Acumulación/i);
    expect(acumulacionElements.length).toBeGreaterThan(0);

    // Verificar estadísticas
    expect(screen.getByText(/Estadísticas en Tiempo Real/i)).toBeInTheDocument();
    expect(screen.getByText(/partículas activas/i)).toBeInTheDocument();
    expect(screen.getByText(/ciclos completados/i)).toBeInTheDocument();

    // Verificar controles de rotación
    expect(screen.getByText(/Rotación Horizontal/i)).toBeInTheDocument();
    expect(screen.getByText(/Rotación Vertical/i)).toBeInTheDocument();

    // Verificar navegación
    expect(screen.getByText(/Volver a Ciencias Naturales/i)).toBeInTheDocument();

    // Verificar filtros por fase
    expect(screen.getByText(/Filtrar por Fase/i)).toBeInTheDocument();
    expect(screen.getByText(/Todas/i)).toBeInTheDocument();

    // Verificar información de fases
    expect(screen.getByText(/Información de las Fases/i)).toBeInTheDocument();

    // Verificar que hay partículas (200 aparece múltiples veces)
    const particulas200 = screen.getAllByText(/200/i);
    expect(particulas200.length).toBeGreaterThan(0);
  });
});