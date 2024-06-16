import React, { useState } from "react";

import type { Tema } from "@interfaces/Tema";

import { insertTema } from "@services/temas";
import { updateTema } from "@services/temas";

import AgregarItem from "@components/ejercicios/formulario/AgregarItem";

interface Props {
  tema?: Tema;
  editing?: boolean;
}

const FormularioTema: React.FC<Props> = ({ tema, editing }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(editing || false);
  const [errors, setErrors] = useState({
    titulo: "",
    descripcion: "",
  });

  const handleToggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const titulo = formData.get("titulo") as string;
    const descripcion = formData.get("descripcion") as string;

    let currentErrors = {
      titulo: "",
      descripcion: "",
    };

    if (titulo.length <= 0) {
      currentErrors.titulo = "El título no puede estar vacío";
    }

    if (descripcion.length < 10) {
      currentErrors.descripcion =
        "La descripción debe tener más de 10 caracteres";
    }

    const hasErrors = Object.values(currentErrors).some(
      (error) => error !== ""
    );

    if (!hasErrors) {
      if (!editing) {
        await insertTema({ titulo, descripcion });
      } else {
        await updateTema({ id: tema?.id, titulo, descripcion });
      }
      window.location.reload();
    } else {
      setErrors(currentErrors);
    }
  };

  return (
    <div>
      {!editing && (
        <AgregarItem handleClick={handleToggleFormulario} text="Agregar tema" />
      )}
      {mostrarFormulario && (
        <form
          className="flex flex-col rounded-xl border-4 border-gray-600 bg-slate-900 p-20 mb-2 gap-5 w-full"
          onSubmit={handleSubmit}
        >
          <header>
            <h1 className="text-4xl font-bold text-wrap text-white truncate">
              {editing ? "Editar tema" : "Crear tema"}
            </h1>
          </header>

          <input
            type="text"
            className="inputs rounded-xl relative text-xl p-5 text-center resize-none h-auto w-full bg-gray-400 text-black hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white transition-all duration-500 ease-in-out"
            placeholder="Agrega el título del tema"
            defaultValue={tema?.titulo}
            name="titulo"
          />
          {errors.titulo && <span>{errors.titulo}</span>}

          <textarea
            className="inputs rounded-xl relative text-xl p-5 text-center resize-none h-auto w-full bg-gray-400 text-black hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white transition-all duration-500 ease-in-out"
            id="descripcion"
            placeholder="Agrega la descripción del tema"
            defaultValue={tema?.descripcion}
            name="descripcion"
          />
          {errors.descripcion && (
            <span className="text-red-500">{errors.descripcion}</span>
          )}
          <button
            className="rounded-xl p-3 bg-green-700 border-gray-950 text-white mt-4 w-full md:w-1/4 mx-auto hover:text-gray-300 hover:bg-zinc-800 transition-all duration-500"
            type="submit"
          >
            {editing ? "Editar" : "Crear"}
          </button>
        </form>
      )}
    </div>
  );
};

export default FormularioTema;
