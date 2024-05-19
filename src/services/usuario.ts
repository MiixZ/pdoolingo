import { url } from "./comun";
import type { Usuario } from "../interfaces/Usuario";

export const getUsuario = async (
  nombre: string | undefined,
  apellidos: string | undefined
) => {
  const pet = url + "usuarios/nombre";

  const body = {
    nombre: nombre,
    apellidos: apellidos,
  };

  const response = await fetch(pet, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const usuario = data.data as Usuario[];

  return usuario;
};
