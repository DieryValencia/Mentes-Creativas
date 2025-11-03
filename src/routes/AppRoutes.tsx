import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Views
import HomePage from "../views/HomePage";
import LayoutsView from "../views/LayoutsView";
import Matematicas from "../views/Matematicas";
import Descomposicion from "../views/Descomposicion";
import CienciasNaturales from "../views/CienciasNaturales";
import CienciasSociales from "../views/CienciasSociales";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />        
        <Route path="layouts" element={<LayoutsView />} />
        <Route path="matematicas" element={<Matematicas />} />
        <Route path="matematicas/descomposicion" element={<Descomposicion />} />
        <Route path="ciencias-naturales" element={<CienciasNaturales />} />
        <Route path="ciencias-sociales" element={<CienciasSociales />} />
      </Route>
    </Routes>
  );
}