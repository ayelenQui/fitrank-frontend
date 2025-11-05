// 🔹 Representa una notificación individual
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

// 🔹 Usuario simplificado (para mostrar nombre o email en las notificaciones)
export interface UsuarioSimpleDTO {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}

// 🔹 Respuesta al obtener notificaciones
export interface NotificacionesRespuestaDTO {
  exito: boolean;
  mensaje?: string;
  notificaciones: NotificacionDTO[];
}

