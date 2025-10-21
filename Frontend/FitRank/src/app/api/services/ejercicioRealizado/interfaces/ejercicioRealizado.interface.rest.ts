import { SerieRealizadaDTO } from "../../serieRealizada/interfaces/serieRealizada.interface";

export interface EjercicioRealizadoDTO {
  id: number;
  ejercicioId: number;
  socioId: number;
  rutinaId: number;
  fecha?: string;
  seriesRealizadas?: SerieRealizadaDTO[];
}

export interface CrearEjercicioRealizadoDTO {
  ejercicioId: number;
  socioId: number;
  rutinaId: number;
}
