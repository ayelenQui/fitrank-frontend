export interface AgregarRutinaDTO {
  nombre: string;
  frecuencia: number;
  dificultadId: number;
}
export interface RutinaDTO {
  id: number;
  nombre: string;
  frecuencia: number | null;
  dificultadId: number;
  dificultad?: { id: number; descripcion: string | null } | null; // puede venir null
}
