

export interface MostrarRankingDTO {
  username: string;
  Totalpuntos: number;
  Nivel: string;
}

export interface MostrarRankingDTOGrupo {
  username: string;
  Totalpuntos: number;
  Nivel: string;
  GrupoMuscular: number;
  Nombre: string;
  divisionPorGrupo: string; 

}
export enum GrupoMuscularFrontend {
  Pecho = 0,    // pecho
  Espalda = 1,
  Piernas = 2,
  Hombros = 3,
  Brazos = 4,
  Abdomen = 5,  // Abdomen
  Gluteo = 6,   // gluteo
  Cardio = 7
}
