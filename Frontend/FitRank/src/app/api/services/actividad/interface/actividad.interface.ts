export interface AgregarActividadDTO {
  id?: number;
  duracion: string;
  repeticiones: number;
  peso?: number;
  punto: number;
  serieId: number;
  entrenamientoId: number;
  ejercicioAsignadoId: number;
}
export interface ActividadDTO {
  id: number;
  duracion: string;
  repeticiones: number;
  peso: number;
  punto: number;
  serieId: number;
  entrenamientoId: number;
  ejercicioAsignadoId: number;
}
