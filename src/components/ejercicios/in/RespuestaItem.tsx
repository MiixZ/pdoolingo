import React from "react";
import type { Respuesta } from "@interfaces/Respuesta";

interface RespuestaItemProps {
  respuesta: Respuesta;
  isSelected: boolean;
  index: number;
  onClick: () => void;
}

const RespuestaItem: React.FC<RespuestaItemProps> = ({
  respuesta,
  isSelected,
  index,
  onClick,
}) => (
  <div
    className={`text-3xl text-white text-center w-auto p-7 cursor-pointer hover:bg-zinc-500 hover:text-4xl rounded-xl transition-all duration-700 ease-in-out ${
      isSelected ? "bg-zinc-500" : "bg-zinc-800"
    } ${index % 2 === 0 ? "animate-spin" : "animate-spin2"}
    `}
    onClick={onClick}
  >
    {respuesta.texto}
  </div>
);

export default RespuestaItem;
