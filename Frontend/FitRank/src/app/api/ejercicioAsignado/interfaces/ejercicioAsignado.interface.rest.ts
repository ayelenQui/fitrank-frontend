
export interface EjercicioDTO {
  id: number;
  nombre: string;
  descripcion: string;
  urlImagen: string;
  duracionEstimada: number;
  urlVideo: string;
  grupoMuscularId: number;
  nombreGrupoMuscular: string;
  maquinaId: number;
  nombreMaquina: string;
}


export interface EjercicioAsignadoDTO {
  id: number;
  orden: number;
  observaciones: string;
  ejercicioId: number;
  ejercicio: EjercicioDTO;
  sesionId: number;
}


export interface AgregarEjercicioAsignadoDTO {
  orden: number;
  observaciones: string;
  ejercicioId: number;
  sesionId: number;
}

export interface ActualizarEjercicioAsignadoDTO {
  id: number;
  orden: number;
  observaciones: string;
  ejercicioId: number;
  sesionId: number;
}
