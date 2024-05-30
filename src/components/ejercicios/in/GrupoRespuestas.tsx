import React from "react";
import RespuestaItem from "./RespuestaItem";
import type { Respuesta } from "@interfaces/Respuesta";

interface GrupoRespuestasProps {
  respuestas: Respuesta[];
  selectedResponses: Respuesta[];
  onSelect: (respuesta: Respuesta) => void;
}

const GrupoRespuestas: React.FC<GrupoRespuestasProps> = ({
  respuestas,
  selectedResponses,
  onSelect,
}) => (
  <div className="flex flex-col gap-4 h-full justify-evenly">
    {respuestas.map((respuesta, index) => (
      <RespuestaItem
        key={index}
        respuesta={respuesta}
        index={index}
        isSelected={selectedResponses.includes(respuesta)}
        onClick={() => onSelect(respuesta)}
      />
    ))}
  </div>
);

export default GrupoRespuestas;
