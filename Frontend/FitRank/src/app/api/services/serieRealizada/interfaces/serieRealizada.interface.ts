export interface SerieRealizadaDTO {
  id: number;
  repeticiones: number;
  peso: number;
  rir: number;
  numeroDeSerie: number;
  ejercicioRealizadoId: number;
}

export interface CrearSerieRealizadaDTO {
  repeticiones: number;
  peso: number;
  rir: number;
  numeroDeSerie: number;
  ejercicioRealizadoId: number;
}
