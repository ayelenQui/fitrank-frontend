export interface SesionRealizadaDeEjerciciosDTO {
  id: number;
  fecha: string;
  duracion: string;
  numeroDeSesion: number;
}

export interface CrearSesionRealizadaDeEjerciciosDTO {
  fecha: string;
  duracion: string;
  numeroDeSesion: number;
}
