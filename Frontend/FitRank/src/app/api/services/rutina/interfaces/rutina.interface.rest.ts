// src/app/api/interfaces/rutina.interfaces.ts

export interface DificultadDTO {
  id: number;
  descripcion: string;
}

export interface RutinaDTO {
  id: number;
  nombre: string;
  frecuencia: number;
  dificultadId: number;
  dificultad?: DificultadDTO | null;
}

export interface RutinaCreateDTO {
  nombre: string;
  frecuencia: number;
  dificultadId: number;
}

export interface EjercicioDTO {
  id: number;
  nombre: string;
  urlVideo: string;
  grupoMuscularId: number;
}

export interface RutinaEjercicioDTO {
  id: number;
  rutinaId: number;
  rutina?: RutinaDTO | null;
  ejercicioId: number;
  ejercicio?: EjercicioDTO | null;
  numeroDeSesion: number;
  orden: number;
}

export interface EjercicioAsignadoDTO {
  id?: number;
  orden: number;
  observaciones?: string;
  sesion: number;
  rutinaId: number;
  ejercicioId: number;
  socioId: number;
}

export interface SerieAsignadaDTO {
  id?: number;
  peso: number;
  repeticiones: number;
  rir: number; // Repeticiones en reserva
  nroSerie: number;
  ejercicioAsignadoId: number;
}
