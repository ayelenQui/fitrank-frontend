import { SerieAsignadaCreateDTO } from "../../services/serieAsignada/interfaces/serieAsignada.interface.rest";

export interface AgregarEjercicioAsignadoDTO {
  orden: number;
  observaciones?: string;
  sesion: number;
  rutinaId: number;
  ejercicioId: number;
  socioId: number;
}
export interface EjercicioAsignadoCompletoDTO {
  orden: number;
  observaciones?: string;
  sesion: number;
  ejercicioId: number;
  series: SerieAsignadaCreateDTO[];
}

export interface EjercicioAsignadoDTO {
  id: number;
  orden: number;
  observaciones?: string;
  sesion: number;
  rutinaId: number;
  ejercicioId: number;
  socioId: number;

  // Relaciones opcionales que suelen venir en el GET expandido
  rutina?: {
    id: number;
    nombre: string;
    frecuencia: number;
    dificultadId: number;
  };
  ejercicio?: {
    id: number;
    nombre: string;
    urlVideo?: string;
    grupoMuscularId: number;
  }
}
