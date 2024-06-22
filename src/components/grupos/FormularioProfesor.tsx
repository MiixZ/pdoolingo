import React, { useState } from "react";

import { insertUsuario } from "@services/usuario";

import AgregarItem from "@components/ejercicios/formulario/AgregarItem";

interface Props {
  editing?: boolean;
  grupo: number;
}

const FormularioProfesor: React.FC<Props> = ({ editing, grupo }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(editing || false);
  const [errors, setErrors] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    DNI: "",
  });

  const handleToggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const nombre = formData.get("nombre") as string;
    const email = formData.get("email") as string;
    const apellidos = formData.get("apellidos") as string;
    const DNI = formData.get("DNI") as string;

    let currentErrors = {
      nombre: "",
      apellidos: "",
      email: "",
      DNI: "",
    };

    if (nombre.length <= 0) {
      currentErrors.nombre = "El nombre no puede estar vacío";
    }

    if (apellidos.length <= 0) {
      currentErrors.apellidos = "Los apellidos no pueden estar vacío";
    }

    if (email.length <= 0) {
      currentErrors.email = "El email no puede estar vacío";
    }

    if (DNI.length <= 0) {
      currentErrors.DNI = "El DNI no puede estar vacío";
    }

    const hasErrors = Object.values(currentErrors).some(
      (error) => error !== ""
    );

    const tipo = "profesor";

    if (!hasErrors) {
      if (!editing) {
        await insertUsuario({
          nombre,
          apellidos,
          email,
          DNI,
          tipo,
          grupo,
          vidas: 5,
          racha: 0,
        });
      }
      window.location.reload();
    } else {
      setErrors(currentErrors);
    }
  };

  return (
    <div>
      <AgregarItem
        handleClick={handleToggleFormulario}
        text="Agregar profesor"
      />
      {mostrarFormulario && (
        <form
          className="flex flex-col rounded-xl border-4 border-gray-600 bg-slate-900 p-20 mb-2 gap-5 w-full"
          onSubmit={handleSubmit}
        >
          <header>
            <h1 className="text-4xl font-bold text-wrap text-white truncate">
              {editing ? "Editar profesor" : "Agrega un profesor"}
            </h1>
          </header>

          <input
            className="inputs rounded-xl relative text-xl p-5 text-center resize-none h-auto w-full bg-gray-400 text-black hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white transition-all duration-500 ease-in-out"
            type="email"
            id="email"
            placeholder="Agrega el email del profesor"
            name="email"
            required
          />
          <span>{errors.email}</span>

          <input
            className="inputs rounded-xl relative text-xl p-5 text-center resize-none h-auto w-full bg-gray-400 text-black hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white transition-all duration-500 ease-in-out"
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Agrega el nombre del profesor"
            required
          />
          <span>{errors.nombre}</span>

          <input
            className="inputs rounded-xl relative text-xl p-5 text-center resize-none h-auto w-full bg-gray-400 text-black hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white transition-all duration-500 ease-in-out"
            type="text"
            id="apellidos"
            placeholder="Agrega los apellidos del profesor"
            name="apellidos"
          />
          <span>{errors.apellidos}</span>

          <input
            className="inputs rounded-xl relative text-xl p-5 text-center resize-none h-auto w-full bg-gray-400 text-black hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white transition-all duration-500 ease-in-out"
            type="text"
            id="DNI"
            placeholder="Agrega el DNI del profesor"
            name="DNI"
          />
          <span>{errors.DNI}</span>

          <button
            className="rounded-xl p-3 bg-green-700 border-gray-950 text-white mt-4 w-full xl:w-1/4 mx-auto hover:text-gray-300 hover:bg-zinc-800 transition-all duration-500"
            type="submit"
          >
            {editing ? "Editar" : "Agregar"}
          </button>
        </form>
      )}
    </div>
  );
};

export default FormularioProfesor;
