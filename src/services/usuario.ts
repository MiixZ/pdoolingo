import type { Usuario } from "@interfaces/Usuario";
import { url } from "./comun";

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

  const data = await response.json();
  const usuario = data.data as Usuario[];

  return usuario;
};

export const getUsuarioID = async (
  id: string | null
): Promise<Usuario | null> => {
  const result = await fetch(url + `usuarios/${id}`);

  return (await result.json()).data as Usuario;
};
