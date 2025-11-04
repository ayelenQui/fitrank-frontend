export interface AsistenciaDetalleUsuarioDTO {
  fecha: string;
  horaEntrada: string;
  horaSalida?: string | null;
  observaciones?: string | null;
  gimnasioNombre: string;
}

export interface SocioDTO {
  id: number;
  nombre: string;
  apellido: string;
  nivel: string;
  fotoUrl?: string | null;
  cuotaPagadaHasta?: string | null;
  gimnasioNombre?: string | null;
  gimnasioId?: number;
  altura?: number;
  peso?: number;
  puntaje?: number;
  dni?: number;
  nombreUsuario?: string;
  sexo?: string;
  qrToken?: string;
}

export interface DetalleUsuarioAsistenciaRespuestaDTO {
  exito: boolean;
  mensaje: string;
  socio: SocioDTO | null;
  asistencias: AsistenciaDetalleUsuarioDTO[];
}

export interface AsistenciaListadoDTO {
  id: number;
  nombreSocio: string;
  gimnasioNombre: string;
  fecha: string;
  horaEntrada: string;
  horaSalida?: string;
  observaciones: string;
}
export interface SocioInactivoDTO {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;             
  gimnasioId: number;
  diasSinAsistir: number;
        
}
