export interface AgregarActividadDTO {
  Duracion: string;
  Repeticiones: number;
  Peso?: number;
  Punto: number;
  SerieId: number;
  EntrenamientoId: number;
  EjercicioAsignadoId: number;
}
export interface ObtenerActividadDTO {
  Id: number;
  Duracion?: string;
  Repeticiones?: number;
  Peso?: number;
  Punto?: number;
  SerieId: number;
  EntrenamientoId: number;
  EjercicioAsignadoId: number;
}

export interface ActualizarActividadDTO {
  Id: number;
  Duracion?: string;
  Repeticiones?: number;
  Peso?: number;
  Punto?: number;
  EjercicioAsignadoId: number;
  EntrenamientoId: number;
  SerieId: number;
}

export interface ObtenerActividadConPuntajeDTO {
  SerieId: number;
  NombreEjercicio: string;
  Repeticiones: number;
  Peso: number;
  Puntos: number;
  PesoAjustado: boolean;
  MensajeAdvertencia?: string;
}

export interface RegistrarActividadDTO {
  SerieId: number;
  NumeroSerie: number;
  Repeticiones: number;
  Peso: number;
  Duracion?: string;
}