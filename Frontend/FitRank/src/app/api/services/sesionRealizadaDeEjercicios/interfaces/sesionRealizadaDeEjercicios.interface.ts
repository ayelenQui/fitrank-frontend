export interface SesionRealizadaDeEjerciciosDTO {
  id: number;
  fecha: string;
  duracion: string; // formato hh:mm:ss
  numeroDeSesion: number;
}

export interface CrearSesionRealizadaDeEjerciciosDTO {
  fecha: string;
  duracion: string;
  numeroDeSesion: number;
}
