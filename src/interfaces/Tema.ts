import type { Ejercicio } from "./Ejercicio";
import type { Insignia } from "./Insignia";

export interface Tema {
  id?: number;
  titulo?: string;
  descripcion?: string;
  n_tema?: number;
  bloqueado?: boolean;
  ejercicios?: Ejercicio[] | null;
  insignias?: Insignia[] | null;
}
