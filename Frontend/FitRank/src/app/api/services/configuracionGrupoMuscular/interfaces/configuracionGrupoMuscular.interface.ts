export interface ConfiguracionGrupoMuscularDTO {
  Id: number;
  GrupoMuscularId: number;
  MultiplicadorPeso: number;
  MultiplicadorRepeticiones: number;
  FactorProgresion: number;
}

export interface AgregarConfiguracionGrupoMuscularDTO {
  GrupoMuscularId: number;
  MultiplicadorPeso: number;
  MultiplicadorRepeticiones: number;
  FactorProgresion: number;
}
