export interface NotificacionDTO {
  id: number;
  titulo: string;
  mensaje: string;
  activa: boolean;
  leido: boolean;
  fechaEnvio: string;
  usuarioEmisorId: number;
  usuarioReceptorId: number;
  usuarioEmisor?: UsuarioSimpleDTO;
  usuarioReceptor?: UsuarioSimpleDTO;
}

export interface UsuarioSimpleDTO {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}

export interface NotificacionesRespuestaDTO {
  exito: boolean;
  mensaje?: string;
  notificaciones: NotificacionDTO[];
}

export interface NotificacionIndividualDTO {
  usuarioReceptorId: number | null;
  titulo: string;
  mensaje: string;
}
export interface NotificacionMasivaDTO {
  usuarioEmisorId: number;
  titulo: string;
  mensaje: string;
}

export interface EnviarMasivaDTO {
  titulo: string;
  mensaje: string;
}

export interface NotificacionIndividualDTO {
  usuarioEmisorId: number;
  usuarioReceptorId: number | null;
  titulo: string;
  mensaje: string;
}
export interface UsuarioNotificacion {
  id: number;
  nombreCompleto: string;
  rol: string;
  fotoUrl: string;
}
export interface HistorialNoti {
  id: number;
  titulo: string;
  mensaje: string;
  fechaCreacion: string;
  emisor: string;
  receptor: string;
}

export interface EnviarMasivaResponse {
  exito: boolean;
  mensaje: string;
  cantidad: number;
}
