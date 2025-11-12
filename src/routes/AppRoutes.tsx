import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";

// Views
import HomePage from "../views/HomePage";
import LayoutsView from "../views/LayoutsView";
import Descomposicion from "../views/Descomposicion";
import CienciasNaturales from "../views/CienciasNaturales";
import CienciasSociales from "../views/CienciasSociales";
import CicloDelAgua from "../views/CicloDelAgua";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />        
        <Route path="layouts" element={<LayoutsView />} />
          <Route path="matematicas/descomposicion" element={<Descomposicion />} />
          <Route path="ciencias-naturales" element={<CienciasNaturales />} />
          <Route path="ciclo-del-agua" element={<CicloDelAgua />} />
          <Route path="ciencias-sociales" element={<CienciasSociales />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
  );
}
