
export interface AgregarEjercicioDTO {
 nombre: string,
 descripcion: string,
 urlImagen: string,
 duracionEstimada: number,
 urlVideo: string,
 grupoMuscularId: number,
 maquinaId: number
}

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
