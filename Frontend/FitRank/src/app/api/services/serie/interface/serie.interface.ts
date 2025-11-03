export interface SerieDTO {
  id: number;
  numeroDeSerie: number;
  duracion: string | null;      
  repeticiones: number | null;
  peso: number | null;
  ejercicioAsignadoId: number;

}

export interface AgregarSerieDTO {
  numeroDeSerie: number;
  duracion?: string | null;
  repeticiones?: number | null;
  peso?: number | null;
  ejercicioAsignadoId: number;
}

export interface ActualizarSerieDTO {
  id: number;
  numeroDeSerie: number;
  duracion?: string | null;
  repeticiones?: number | null;
  peso?: number | null;
  ejercicioAsignadoId: number;
}
