export interface ObtenerGrupoMuscularDTO {
  id: number;
  nombre: string;
  imagen?: string;
}

export interface AgregarGrupoMuscularDTO {
  nombre: string;
  imagen?: string;
}

export interface ActualizarGrupoMuscularDTO {
  id: number;
  nombre: string;
  imagen?: string;
}
