import React from "react";
import { motion } from "framer-motion";
import GloboInteractivo from "../components/GloboInteractivo";

const CienciasSociales: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      {/* Encabezado único */}
      <header className="pt-10 pb-6 text-center">
        <motion.h1
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-yellow-300"
        >
          Ciencias Sociales: Nuestro Planeta
        </motion.h1>
        <p className="text-blue-200 mt-2">
          ¡Explora el mundo en 3D, aprende sobre los continentes y cuida nuestro planeta!
        </p>
      </header>

      {/* Globo y paneles */}
      <main className="px-4 pb-20 flex justify-center">
        <GloboInteractivo />
      </main>
    </div>
  );
};

export default CienciasSociales;


