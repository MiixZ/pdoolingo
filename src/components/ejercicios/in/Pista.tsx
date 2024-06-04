import React, { useCallback, useEffect, useState } from "react";

import type { Ejercicio } from "@interfaces/Ejercicio";
import type { Usuario } from "@interfaces/Usuario";

import { getUsuarioID, updateVidas } from "@services/usuario";

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
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      const fetchedUsuario = await getUsuarioID(id_usuario);
      setUsuario(fetchedUsuario);
    };

    fetchUsuario();
  }, [id_usuario]);

  const handleClick = useCallback(async () => {
    if (
      (usuario?.vidas ?? -1) < (ejercicio?.coste_pista ?? 0) &&
      ejercicio?.tipo_coste_pista === "vidas"
    ) {
      return;
    }

    if (ejercicio?.tipo_coste_pista === "vidas") {
      await updateVidas(id_usuario, ejercicio.coste_pista);
    }
    if (onClick) {
      onClick();
    }
  }, [usuario, PistaUsed, ejercicio, id_usuario, onClick]);

  return (
    <span
      className={`flex flex-col rounded-xl p-3 text-center text-white w-full lg:w-1/4 ${
        PistaUsed
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer bg-lime-800"
      }`}
      onClick={
        PistaUsed ||
        ((usuario?.vidas ?? -1) < (ejercicio?.coste_pista ?? 0) &&
          ejercicio?.tipo_coste_pista === "vidas")
          ? undefined
          : handleClick
      }
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
