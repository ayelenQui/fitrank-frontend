export interface SesionDTO {
  id: number;
  numeroDeSesion: number;
  nombre: string;
  rutinaId: number;
  rutinaNombre: string;
}

export interface AgregarSesionDTO {
  numeroDeSesion: number;
  nombre: string;
  rutinaId: number;
}

export interface ActualizarSesionDTO {
  id: number;
  numeroDeSesion: number;
  nombre: string;
  rutinaId: number;
}
