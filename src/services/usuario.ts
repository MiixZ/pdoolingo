import type { Usuario } from "@interfaces/Usuario";
import { url } from "./comun";

export const getUsuario = async (email: string | undefined) => {
  const pet = url + "usuarios/nombre";

  const body = {
    email: email,
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
  id: string | null | undefined
): Promise<Usuario | null> => {
  const result = await fetch(url + `usuarios/${id}`);

  return (await result.json()).data as Usuario;
};

export const getUsuariosByGrupo = async (
  id_grupo: number | null | undefined
): Promise<Usuario[] | null> => {
  const result = await fetch(url + `usuarios/grupo/${id_grupo}`);

  return (await result.json()).data as Usuario[];
};

export const updateVidas = async (
  id_usuario: string | null | undefined,
  coste: number
): Promise<Usuario | null> => {
  const usuario = await getUsuarioID(id_usuario);

  if (!usuario) return null;

  const body = {
    vidas: usuario.vidas - coste,
    racha: 0,
  };

  const result = await fetch(url + `usuarios/${id_usuario}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const user = await result.json();

  return user.data as Usuario;
};

export const updateRacha = async (
  id_usuario: string | null | undefined
): Promise<number | null> => {
  const usuario = await getUsuarioID(id_usuario);

  if (!usuario) return null;

  const body = {
    racha: usuario.racha + 1,
  };

  const result = await fetch(url + `usuarios/${id_usuario}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const user = await result.json();

  return user.data.racha as number;
};

export const deleteUsuario = async (
  id: string | null | undefined
): Promise<boolean> => {
  const resultUI = await fetch(url + `usuarios-insignias/${id}`, {
    method: "DELETE",
  });

  const resultUE = await fetch(url + `usuarios-ejercicios/usuario/${id}`, {
    method: "DELETE",
  });

  const result = await fetch(url + `usuarios/${id}`, {
    method: "DELETE",
  });

  return (await result.json()).success as boolean;
};
