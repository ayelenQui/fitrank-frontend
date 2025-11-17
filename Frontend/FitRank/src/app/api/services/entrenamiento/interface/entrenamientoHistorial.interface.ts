export interface EntrenamientoHistorialDTO {
  idEntrenamiento: number;
  fecha: string; // en JSON llegará como string ISO
  nombreSesion: string;
  duracion: string | null; // TimeSpan se recibe como string
  puntosTotales: number;
  actividades: ActividadHistorialDTO[];
}

export interface ActividadHistorialDTO {
  idActividad: number;
  idEjercicioAsignado: number;
  nombreEjercicio: string;
  urlImagen?: string | null;
  repeticiones?: number | null;
  peso?: number | null;
  punto?: number | null;
  progresoHistorico: ProgresoEjercicioDTO[];
}

export interface ProgresoEjercicioDTO {
  fecha: string; // se recibe como string ISO
  peso?: number | null;
  repeticiones?: number | null;
}
 