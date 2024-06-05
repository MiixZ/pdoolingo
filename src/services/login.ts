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

  const nombreCompleto = name ?? "";
  const emailUsuario = email ?? "";

  const usuarios = await getUsuario(nombreCompleto, emailUsuario);

  if (usuarios == null) {
    return null;
  }

  const usuario = usuarios[0];
  usuario.image = image;

  return usuario;
};
