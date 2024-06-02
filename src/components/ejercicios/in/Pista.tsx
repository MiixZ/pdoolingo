import React, { useCallback } from "react";

import type { Ejercicio } from "@interfaces/Ejercicio";
import type { Usuario } from "@interfaces/Usuario";

import { getUsuarioID, usarPistaPorVida } from "@services/usuario";

interface PistaProps {
  ejercicio?: Ejercicio;
  PistaUsed?: boolean;
  onClick?: () => void;
  id_usuario?: string | null;
}

const Pista: React.FC<PistaProps> = ({
  ejercicio,
  PistaUsed,
  onClick,
  id_usuario,
}) => {
  const handleClick = useCallback(async () => {
    const usuario = await getUsuarioID(id_usuario);

    console.log("usuario", usuario);

    if (!usuario || usuario.vidas < (ejercicio?.coste_pista ?? 0)) {
      return;
    }

    if (ejercicio?.tipo_coste_pista === "vidas") {
      await usarPistaPorVida(id_usuario, ejercicio.coste_pista);
    }
    if (onClick) {
      onClick();
    }
  }, [PistaUsed, ejercicio, id_usuario, onClick]);

  return (
    <span
      className={`flex flex-col rounded-xl p-3 text-center text-white w-full lg:w-1/4 ${
        PistaUsed
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer bg-lime-800"
      }`}
      onClick={PistaUsed ? undefined : handleClick}
    >
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
