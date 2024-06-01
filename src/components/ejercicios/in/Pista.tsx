import React from "react";

import type { Ejercicio } from "@interfaces/Ejercicio";

interface PistaProps {
  ejercicio?: Ejercicio;
}

const Pista: React.FC<PistaProps> = ({ ejercicio }) => {
  return (
    <span className="flex flex-col rounded-xl bg-lime-800 p-3 text-center text-white w-full lg:w-1/4">
      <span className="text-2xl">¡Pista! 🕵️‍♂️</span>
      <span className="flex gap-2 w-auto mx-auto items-center justify-center">
        {(() => {
          switch (ejercicio?.tipo_coste_pista) {
            case "vidas":
              return (
                <>
                  <p>COSTE:</p>
                  <span>{ejercicio.coste_pista} Vida(s)</span>
                </>
              );
            case "experiencia":
              return (
                <>
                  <p>COSTE:</p>
                  <span>{ejercicio.coste_pista} XP</span>
                </>
              );
            default:
              return null;
          }
        })()}
      </span>
    </span>
  );
};

export default Pista;
