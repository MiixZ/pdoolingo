export interface Usuario {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  DNI: string;
  vidas: number;
  tipo: string;
  image: string | null | undefined;
}
