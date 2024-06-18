import React, { useState } from "react";

import { insertGrupo } from "@services/temas";

import AgregarItem from "@components/ejercicios/formulario/AgregarItem";

interface Grupo {
  id?: number;
  codigo: string;
}

interface Props {
  grupo?: Grupo;
  editing?: boolean;
}

const FormularioGrupo: React.FC<Props> = ({ grupo, editing }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(editing || false);
  const [errors, setErrors] = useState({
    codigo: "",
  });

  const handleToggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const codigo = formData.get("codigo") as string;

    let currentErrors = {
      codigo: "",
    };

    if (codigo.length <= 0) {
      currentErrors.codigo =
        "El código no puede estar vacío, potencialmente debe tener el formato: '23/24-A";
    }

    const hasErrors = Object.values(currentErrors).some(
      (error) => error !== ""
    );

    if (!hasErrors) {
      if (!editing) {
        await insertGrupo({ codigo });
      }
      //window.location.reload();
    } else {
      setErrors(currentErrors);
    }
  };

  return (
    <div>
      <AgregarItem handleClick={handleToggleFormulario} text="Agregar grupo" />
      {mostrarFormulario && (
        <form
          className="flex flex-col rounded-xl border-4 border-gray-600 bg-slate-900 p-20 mb-2 gap-5 m-auto w-full lg:w-3/5"
          onSubmit={handleSubmit}
        >
          <header>
            <h1 className="text-4xl font-bold text-wrap text-white truncate">
              {editing ? "Editar grupo" : "Crear grupo"}
            </h1>
          </header>

          <input
            type="text"
            className="inputs rounded-xl relative text-xl p-5 text-center resize-none h-auto w-full bg-gray-400 text-black hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white transition-all duration-500 ease-in-out"
            name="codigo"
            placeholder="Código (ej: 23/24-A)"
            defaultValue={grupo?.codigo}
          />
          <button
            className="rounded-xl p-3 bg-green-700 border-gray-950 text-white mt-4 w-full md:w-1/4 mx-auto hover:text-gray-300 hover:bg-zinc-800 transition-all duration-500"
            type="submit"
          >
            {editing ? "Editar" : "Crear"}
          </button>
        </form>
      )}
      {errors.codigo && <p>{errors.codigo}</p>}
    </div>
  );
};

export default FormularioGrupo;
