export interface EjercicioDTO {
  id: number;
  maquinaId?: number;
  nombre: string;
  grupoMuscular: GrupoMuscular;
  dificultad: Dificultad;
  series: number;
  repeticiones: number;
  peso: number;
  descansoSegundos: number;
  esSerieCompuesta: boolean;
  esOpcional: boolean;
  diaAsignado: number; // DayOfWeek → number 0-6
  observaciones: string;
  videoUrl: string;
  tipoEntrenamiento: string;
}

export interface CrearEjercicioDTO {
  rutinaId?: number;
  maquinaId?: number;
  nombre: string;
  grupoMuscular: GrupoMuscular;
  dificultad: Dificultad;
  series: number;
  repeticiones: number;
  peso: number;
  descansoSegundos: number;
  esSerieCompuesta: boolean;
  esOpcional: boolean;
  diaAsignado: number; // DayOfWeek → number
  observaciones: string;
  videoUrl: string;
  tipoEntrenamiento: string;
}

export enum GrupoMuscular {
  Pecho = 0,
  Espalda = 1,
  Piernas = 2,
  Hombros = 3,
  Brazos = 4,
  Abdomen = 5,
  Gluteo = 6,
  Cardio = 7
}


export enum Dificultad {
  MuyFacil = 0,
  Facil = 1,
  Intermedio = 2,
  Dificil = 3,
  MuyDificil = 4
}


