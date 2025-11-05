export interface AgregarPuntajeDTO {
  serieRealizadaId: number;
  motivo: string;
  fecha: string;
  valor: number;
}

export interface ObtenerPuntajeDTO {
  id: number;
  serieRealizadaId: number;
  motivo: string;
  fecha: string;
  valor: number;
  serieRealizada?: {
    id: number;
    ejercicioRealizadoId: number;
  };
}

export interface ActualizarPuntajeDTO {
  id: number;
  serieRealizadaId: number;
  motivo: string;
  fecha: string;
  valor: number;
}

export interface PuntajePorGrupoDTO {
  grupoMuscularId: number;
  puntaje: number;
}

export interface PuntajeTotalDTO {
  socioId: number;
  puntajeTotal: number;
  puntajePorGrupo: PuntajePorGrupoDTO[];
}

export interface EstadisticaCorporalSocioDTO {
  imc: number;
  clasificacionImc: string;
  peso: number;
  altura: number;
  fechaMedicion: string;
}
