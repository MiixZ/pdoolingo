import React, { useState } from "react";
import AgregarItem from "@components/ejercicios/formulario/AgregarItem";

import { url } from "@services/comun";

interface Props {
  editing?: boolean;
  grupo: number;
}

const FormularioExcel: React.FC<Props> = ({ editing, grupo }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(editing || false);
  const [fileError, setFileError] = useState("");

  const handleToggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const file = formData.get("csvFile") as File;

    if (!file) {
      setFileError("Por favor, selecciona un archivo CSV.");
      return;
    }

    if (file.type !== "text/csv") {
      setFileError("El archivo debe estar en formato CSV.");
      return;
    }

    formData.append("grupo", grupo.toString());

    const response = await fetch(url + "usuarios/loadcsv", {
      method: "POST",
      body: formData,
    });

    window.location.reload();
  };

  return (
    <div>
      <AgregarItem
        handleClick={handleToggleFormulario}
        text="Agregar estudiantes CSV"
      />
      {mostrarFormulario && (
        <form
          className="flex flex-col rounded-xl border-4 border-gray-600 bg-slate-900 p-20 mb-2 gap-5 w-full"
          onSubmit={handleFileUpload}
        >
          <header>
            <h1 className="text-4xl font-bold text-wrap text-white truncate">
              {editing
                ? "Editar estudiantes"
                : "Agrega estudiantes desde un archivo CSV"}
            </h1>
          </header>

          <input
            className="inputs rounded-xl relative text-xl p-5 text-center resize-none h-auto w-full bg-gray-400 text-black hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white transition-all duration-500 ease-in-out"
            type="file"
            name="csvFile"
            accept=".csv"
          />
          {fileError && <span className="text-red-500">{fileError}</span>}

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

export default FormularioExcel;
