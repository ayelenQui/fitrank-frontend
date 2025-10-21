/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ActivarCuentaDTO {
  token?: string | null;
  password?: string | null;
}

export interface ActivarResponseDTO {
  email?: string | null;
  mensaje?: string | null;
}

export interface ActualizarEjercicioAsignadoDTO {
  /** @format int64 */
  id?: number;
  /** @format int32 */
  orden?: number;
  observaciones?: string | null;
  /** @format int32 */
  sesion?: number;
  /** @format int64 */
  rutinaId?: number;
  /** @format int64 */
  ejercicioId?: number;
  /** @format int64 */
  socioId?: number;
}

export interface ActualizarEjercicioRealizadoDTO {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  ejercicioId?: number;
  /** @format int64 */
  socioId?: number;
  /** @format int64 */
  rutinaId?: number;
}

export interface ActualizarPuntajeDTO {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  serieRealizadaId?: number;
  motivo?: string | null;
  /** @format date-time */
  fecha?: string;
  /** @format int32 */
  valor?: number;
}

export interface ActualizarRutinaDTO {
  /** @format int64 */
  id?: number;
  nombre?: string | null;
  /** @format int32 */
  frecuencia?: number | null;
  /** @format int64 */
  dificultadId?: number;
}

export interface ActualizarRutinaEjercicioDTO {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  rutinaId?: number;
  /** @format int64 */
  ejercicioId?: number;
  /** @format int32 */
  numeroDeSesion?: number;
  /** @format int32 */
  orden?: number;
}

export interface ActualizarSerieAsignadaDTO {
  /** @format int64 */
  id?: number;
  /** @format int32 */
  peso?: number;
  /** @format int32 */
  repeticiones?: number;
  /** @format int32 */
  rir?: number;
  /** @format int32 */
  nroSerie?: number;
  /** @format int64 */
  ejercicioAsignadoId?: number;
}

export interface ActualizarSerieRealizadaDTO {
  /** @format int64 */
  id?: number;
  /** @format int32 */
  repeticiones?: number;
  /** @format double */
  peso?: number;
  /** @format int32 */
  rir?: number;
  /** @format int32 */
  numeroDeSerie?: number;
  /** @format int64 */
  ejercicioRealizadoId?: number;
}

export interface AgregarConfiguracionGrupoMuscularDTO {
  /** @format int32 */
  grupoMuscularId?: number;
  /** @format double */
  multiplicadopeso?: number;
  /** @format double */
  multiplicadorRepeticiones?: number;
}

export interface AgregarDificultadDTO {
  descripcion?: string | null;
}

export interface AgregarEjercicioAsignadoDTO {
  /** @format int32 */
  orden?: number;
  observaciones?: string | null;
  /** @format int32 */
  sesion?: number;
  /** @format int64 */
  rutinaId?: number;
  /** @format int64 */
  ejercicioId?: number;
  /** @format int64 */
  socioId?: number;
}

export interface AgregarEjercicioDTO {
  nombre?: string | null;
  urlVideo?: string | null;
  /** @format int64 */
  grupoMuscularId?: number;
}

export interface AgregarEjercicioRealizadoDTO {
  /** @format int64 */
  ejercicioId?: number;
  /** @format int64 */
  socioId?: number;
  /** @format int64 */
  rutinaId?: number;
}

export interface AgregarGrupoMuscularDTO {
  nombre?: string | null;
}

export interface AgregarPuntajeDTO {
  /** @format int64 */
  serieRealizadaId?: number;
  motivo?: string | null;
  /** @format date-time */
  fecha?: string;
  /** @format int32 */
  valor?: number;
}

export interface AgregarRutinaDTO {
  nombre?: string | null;
  /** @format int32 */
  frecuencia?: number | null;
  /** @format int64 */
  dificultadId?: number;
}

export interface AgregarRutinaEjercicioDTO {
  /** @format int64 */
  rutinaId?: number;
  /** @format int64 */
  ejercicioId?: number;
  /** @format int32 */
  numeroDeSesion?: number;
  /** @format int32 */
  orden?: number;
}

export interface AgregarSerieAsignadaDTO {
  /** @format int32 */
  peso?: number;
  /** @format int32 */
  repeticiones?: number;
  /** @format int32 */
  rir?: number;
  /** @format int32 */
  nroSerie?: number;
  /** @format int64 */
  ejercicioAsignadoId?: number;
}

export interface AgregarSerieRealizadaDTO {
  /** @format int32 */
  repeticiones?: number;
  /** @format double */
  peso?: number;
  /** @format int32 */
  rir?: number;
  /** @format int32 */
  numeroDeSerie?: number;
  /** @format int64 */
  ejercicioRealizadoId?: number;
}

export interface AgregarSesionRealizadaDeEjerciciosDTO {
  /** @format date-time */
  fecha?: string;
  /** @format date-span */
  duracion?: string;
  /** @format int64 */
  numeroDeSesion?: number;
}

export interface AgregarSocioDTO {
  nombre?: string | null;
  apellido?: string | null;
}

export interface AuthResponseDTO {
  token?: string | null;
  user?: UsuarioAuthDTO;
}

export interface ConfiguracionGrupoMuscularDTO {
  /** @format int64 */
  id?: number;
  /** @format int32 */
  grupoMuscularId?: number;
  /** @format double */
  multiplicadopeso?: number;
  /** @format double */
  multiplicadorRepeticiones?: number;
}

export interface CreatePersonaDTO {
  nombre?: string | null;
  /** @format int32 */
  edad?: number;
}

export interface DificultadDTO {
  /** @format int32 */
  id?: number;
  descripcion?: string | null;
}

export interface EjercicioDTO {
  /** @format int64 */
  id?: number;
  nombre?: string | null;
  urlVideo?: string | null;
  /** @format int64 */
  grupoMuscularId?: number;
}

export interface EmailDTO {
  /** @format int32 */
  usuarioId?: number;
  /**
   * @format email
   * @minLength 1
   */
  emailDestinatario: string;
}

export interface EmailResponseDTO {
  success?: boolean;
  mensaje?: string | null;
}

export interface FallbackEfectivoDTO {
  /** @format int32 */
  invitacionId?: number;
  confirmarEfectivo?: boolean;
}

export interface GenerarInvitacionDTO {
  /** @minLength 1 */
  nombre: string;
  apellidos?: string | null;
  /** @format int32 */
  dni?: number;
  /**
   * @format email
   * @minLength 1
   */
  email: string;
  telefono?: string | null;
  /** @minLength 1 */
  metodoPago: string;
  /** @format double */
  monto?: number;
  periodo?: string | null;
}

export interface GrupoMuscularDTO {
  /** @format int64 */
  id?: number;
  nombre?: string | null;
}

export interface InvitacionResponseDTO {
  success?: boolean;
  qrImage?: string | null;
  tokenInvitacion?: string | null;
  mensaje?: string | null;
  /** @format int32 */
  invitacionId?: number;
}

export interface LoginDTO {
  /**
   * @format email
   * @minLength 1
   */
  email: string;
  /** @minLength 1 */
  password: string;
}

export interface QrValidationDTO {
  /** @minLength 1 */
  qrData: string;
  /** @format int32 */
  gymId?: number | null;
  observaciones?: string | null;
}

export interface QrValidationResponseDTO {
  valido?: boolean;
  mensaje?: string | null;
  user?: UsuarioAuthDTO;
  /** @format int32 */
  asistenciaId?: number | null;
}

export interface RegisterDTO {
  /** @minLength 1 */
  nombre: string;
  apellidos?: string | null;
  /** @format int32 */
  dni?: number;
  /** @format date-time */
  fechaNacimiento?: string;
  telefono?: string | null;
  /**
   * @format email
   * @minLength 1
   */
  correo: string;
  username?: string | null;
  /** @minLength 1 */
  password: string;
  /** @format int32 */
  alturaCm?: number;
  /** @format double */
  pesoKg?: number;
  nivel?: string | null;
  rol?: string | null;
}

export interface RegisterInvitacionDTO {
  /** @minLength 1 */
  tokenInvitacion: string;
  /** @minLength 1 */
  password: string;
  username?: string | null;
  /** @format date-time */
  fechaNacimiento?: string;
  /** @format int32 */
  alturaCm?: number;
  /** @format double */
  pesoKg?: number;
  nivel?: string | null;
}

export interface SesionRealizadaDeEjerciciosDTO {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  fecha?: string;
  /** @format date-span */
  duracion?: string;
  /** @format int32 */
  numeroDeSesion?: number;
}

export interface SocioDTO {
  /** @format int64 */
  id?: number;
  nombre?: string | null;
  apellido?: string | null;
}

export interface UpdatePersonaDTO {
  /** @format int32 */
  id?: number;
  nombre?: string | null;
  /** @format int32 */
  edad?: number;
}

export interface UsuarioAuthDTO {
  /** @format int64 */
  id?: number;
  nombre?: string | null;
  apellidos?: string | null;
  correo?: string | null;
  username?: string | null;
  rol?: string | null;
  /** @format date-time */
  cuotaPagadaHasta?: string | null;
  tieneCuotaPagada?: boolean;
  qrToken?: string | null;
}

export interface ValidarActivacionDTO {
  token?: string | null;
}

export interface WeatherForecast {
  /** @format date */
  date?: string;
  /** @format int32 */
  temperatureC?: number;
  /** @format int32 */
  temperatureF?: number;
  summary?: string | null;
}
