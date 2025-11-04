import { render, screen } from "@testing-library/react";
import Matematicas from "./Matematicas";

test("renderiza el componente Matematicas correctamente", () => {
  render(<Matematicas />);
  expect(screen.getByText(/Matemáticas 📊/i)).toBeInTheDocument();
});

test("muestra el subtema Descomposición", () => {
  render(<Matematicas />);
  expect(screen.getByText(/Descomposición/i)).toBeInTheDocument();
});

test("contiene botones de Practicar y Ver Ejercicios", () => {
  render(<Matematicas />);
  expect(screen.getByRole("button", { name: /Practicar/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Ver Ejercicios/i })).toBeInTheDocument();
});