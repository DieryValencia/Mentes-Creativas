import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Views
import HomePage from "../views/HomePage";
import LayoutsView from "../views/LayoutsView";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />        
        <Route path="layouts" element={<LayoutsView />} />
       
      </Route>
    </Routes>
  );
}