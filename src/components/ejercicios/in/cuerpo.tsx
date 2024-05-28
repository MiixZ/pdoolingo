import React, { useState } from "react";
import { keyframes } from "@emotion/react";

import type { Ejercicio } from "@interfaces/Ejercicio";
import type { Respuesta } from "@interfaces/Respuesta";

interface EjercicioComponentProps {
  ejercicio?: Ejercicio | null;
  respuestas?: Respuesta[];
}

const EjercicioComponent: React.FC<EjercicioComponentProps> = ({
  ejercicio,
  respuestas,
}) => {
  const [selectedResponses, setSelectedResponses] = useState<Respuesta[]>([]);

  const handleSelect = (respuesta: Respuesta) => {
    // Lógica para manejar la selección de respuestas
  };

  const handleDragStart = (event: React.DragEvent, respuesta: Respuesta) => {
    // Lógica para manejar el inicio del arrastre
  };

  const handleDrop = (event: React.DragEvent) => {
    // Lógica para manejar la acción de soltar
  };

  const renderFlecha = () => (
    <div className="flex rounded-xl p-10 bg-slate-700 justify-between">
      <div className="flex flex-col gap-4">
        {respuestas?.map((respuesta, index) => (
          <div
            key={index}
            className="text-3xl text-white text-center w-auto p-7 cursor-pointer hover:bg-zinc-500 hover:text-4xl bg-zinc-800 rounded-xl transition-all duration-700 ease-in-out animate-spin"
            onClick={() => handleSelect(respuesta)}
          >
            {respuesta.texto}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {respuestas?.map((respuesta, index) => (
          <div
            key={index}
            className="text-3xl text-white text-center w-auto p-7 cursor-pointer hover:bg-zinc-500 hover:text-4xl bg-zinc-800 rounded-xl transition-all duration-700 ease-in-out animate-spin"
            onClick={() => handleSelect(respuesta)}
          >
            {respuesta.texto}
          </div>
        ))}
      </div>
    </div>
  );

  const renderUnir = () => (
    <div className="unir-container">
      {respuestas?.map((respuesta, index) => (
        <div
          key={index}
          className="response"
          draggable
          onDragStart={(event) => handleDragStart(event, respuesta)}
        >
          {respuesta.texto}
        </div>
      ))}
      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        Arrastra aquí
      </div>
    </div>
  );

  return (
    <div className="ejercicio-component">
      {ejercicio?.tipo === "flecha" && renderFlecha()}
      {ejercicio?.tipo === "unir" && renderUnir()}
    </div>
  );
};

export default EjercicioComponent;
