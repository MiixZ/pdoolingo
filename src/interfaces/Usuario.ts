export interface Usuario {
  id?: string;
  nombre: string;
  apellidos: string;
  email: string;
  DNI: string;
  vidas: number;
  tipo: string;
  racha: number;
  grupo: number;
  image?: string | null | undefined;
}
