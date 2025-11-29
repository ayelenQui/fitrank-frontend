export interface EntrenamientoHistorialDTO {
  idEntrenamiento: number;
  fecha: string;
  nombreSesion: string;
  duracion: string | null;
  puntosTotales: number;
  nombreRutina: string;
  nombreSocio : string;
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
  timestamp: number;
  fecha: string; // se recibe como string ISO
  peso?: number | null;
  repeticiones?: number | null;
}
 