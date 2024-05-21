import { getSession } from "auth-astro/server";
import { getUsuario } from "./usuario";
import type { Usuario } from "@interfaces/Usuario";

export const getSesion = async (
  req: Request
): Promise<Usuario | null | false> => {
  const session = await getSession(req);
  if (!session) {
    return false;
  }

  const sessionUser = session ? session.user : null;
  const { email, name, image } = sessionUser || {};

  const nombre = name?.split(" ")[0];
  const apellidos = name?.split(" ").slice(1).join(" ");
  const usuarios = await getUsuario(nombre, apellidos);

  if (usuarios == null) {
    return null;
  }

  const usuario = usuarios[0];
  usuario.email = email;
  usuario.image = image;

  return usuario;
};
