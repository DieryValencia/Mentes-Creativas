import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CienciasSociales from "./CienciasSociales";

// Mock del componente GloboInteractivo (evita renderizar el canvas 3D)
jest.mock("../components/GloboInteractivo", () => () => (
  <div data-testid="mock-globo">🌍 Globo 3D simulado</div>
));

describe("CienciasSociales Component", () => {
  it("debe renderizar el título correctamente", () => {
    render(<CienciasSociales />);
    const titulo = screen.getByText(/Ciencias Sociales: Nuestro Planeta/i);
    expect(titulo).toBeInTheDocument();
  });

  it("debe mostrar la descripción principal", () => {
    render(<CienciasSociales />);
    const descripcion = screen.getByText(
      /¡Explora el mundo en 3D, aprende sobre los continentes y cuida nuestro planeta!/i
    );
    expect(descripcion).toBeInTheDocument();
  });

  it("debe renderizar el globo interactivo simulado", () => {
    render(<CienciasSociales />);
    const globo = screen.getByTestId("mock-globo");
    expect(globo).toBeInTheDocument();
  });
});


