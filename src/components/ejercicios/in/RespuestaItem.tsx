import React, { useState, useEffect } from "react";
import type { Respuesta } from "@interfaces/Respuesta";

interface RespuestaItemProps {
  respuesta: Respuesta;
  isSelected: boolean;
  index: number;
  onClick: () => void;
  dragAndDrop?: boolean;
  onDragStart?: (event: React.DragEvent, respuesta: Respuesta) => void;
}

const pezBackground = "bg-sky-700";
const normalBackground = "bg-zinc-800";

const RespuestaItem: React.FC<RespuestaItemProps> = ({
  respuesta,
  isSelected,
  index,
  onClick,
  dragAndDrop,
  onDragStart,
}) => {
  return (
    <div
      className={`text-sm lg:text-xl xl:text-2xl 2xl:text-3xl text-white text-center w-auto p-7 cursor-pointer hover:bg-zinc-500 rounded-xl transition-all duration-700 ease-in-out ${
        isSelected
          ? "bg-zinc-500"
          : dragAndDrop
          ? pezBackground
          : normalBackground
      } ${
        dragAndDrop
          ? index % 2 === 0
            ? "animate-moveLeftRight"
            : "animate-moveUpDown"
          : index % 2 === 0
          ? "animate-spin"
          : "animate-spin2"
      }`}
      onClick={onClick}
      draggable={dragAndDrop}
      onDragStart={(event) => onDragStart && onDragStart(event, respuesta)}
    >
      {respuesta.texto}
    </div>
  );
};

export default RespuestaItem;
