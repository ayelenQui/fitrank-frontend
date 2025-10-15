import { CrearEjercicioDTO, EjercicioDTO } from "../../ejercicio/interfaces/ejercicio.interface";

export interface CrearRutinaDTO {
usuarioId: number;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  diasPorSemana: number;
  ejercicios: CrearEjercicioDTO[];
}

export interface EditarRutinaDTO {
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  diasPorSemana: number;
  ejercicios: CrearEjercicioDTO[]; // se pueden editar o reemplazar
}

export interface RutinaDTO {
  id: number;
  idUsuario: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  diasPorSemana: number;
  bloques: BloqueDTO[];
  ejercicios: EjercicioDTO[];
}

export interface BloqueDTO {
  id: number;
  rutinaId: number;
  ejercicioId: number;
  dia: number; // DayOfWeek → número 0-6
  seriesRecomendadas: number;
  repeticionesRecomendadas: number;
  pesoRecomendado: number;
  rirRecomendado: number;
  notas?: string;
}