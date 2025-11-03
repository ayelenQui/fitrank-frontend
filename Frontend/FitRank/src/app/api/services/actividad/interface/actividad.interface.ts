export interface AgregarActividadDTO {
  id?: number;
  duracion: Date;
  repeticiones: number;
  peso?: number;
  punto: number;
  serieId: number;
  entrenamientoId: number;
  ejercicioAsignadoId: number;
}
export interface ActividadDTO {
  id: number;
  duracion: Date;
  repeticiones: number;
  peso: number;
  punto: number;
  serieId: number;
  entrenamientoId: number;
  ejercicioAsignadoId: number;
}
