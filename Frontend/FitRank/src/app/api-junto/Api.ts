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

import {
  ActivarCuentaDTO,
  ActivarResponseDTO,
  ActualizarEjercicioAsignadoDTO,
  ActualizarEjercicioRealizadoDTO,
  ActualizarPuntajeDTO,
  ActualizarRutinaDTO,
  ActualizarRutinaEjercicioDTO,
  ActualizarSerieAsignadaDTO,
  ActualizarSerieRealizadaDTO,
  AgregarConfiguracionGrupoMuscularDTO,
  AgregarDificultadDTO,
  AgregarEjercicioAsignadoDTO,
  AgregarEjercicioDTO,
  AgregarEjercicioRealizadoDTO,
  AgregarGrupoMuscularDTO,
  AgregarPuntajeDTO,
  AgregarRutinaDTO,
  AgregarRutinaEjercicioDTO,
  AgregarSerieAsignadaDTO,
  AgregarSerieRealizadaDTO,
  AgregarSesionRealizadaDeEjerciciosDTO,
  AgregarSocioDTO,
  AuthResponseDTO,
  ConfiguracionGrupoMuscularDTO,
  CreatePersonaDTO,
  DificultadDTO,
  EjercicioDTO,
  EmailDTO,
  EmailResponseDTO,
  FallbackEfectivoDTO,
  GenerarInvitacionDTO,
  GrupoMuscularDTO,
  InvitacionResponseDTO,
  LoginDTO,
  QrValidationDTO,
  QrValidationResponseDTO,
  RegisterDTO,
  RegisterInvitacionDTO,
  SesionRealizadaDeEjerciciosDTO,
  SocioDTO,
  UpdatePersonaDTO,
  ValidarActivacionDTO,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Admin
   * @name AdminGenerarInvitacionCreate
   * @request POST:/api/Admin/generar-invitacion
   * @secure
   */
  adminGenerarInvitacionCreate = (
    data: GenerarInvitacionDTO,
    params: RequestParams = {},
  ) =>
    this.request<InvitacionResponseDTO, any>({
      path: `/api/Admin/generar-invitacion`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AdminFallbackEfectivoCreate
   * @request POST:/api/Admin/fallback-efectivo
   * @secure
   */
  adminFallbackEfectivoCreate = (
    data: FallbackEfectivoDTO,
    params: RequestParams = {},
  ) =>
    this.request<InvitacionResponseDTO, any>({
      path: `/api/Admin/fallback-efectivo`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AdminEnviarEmailQrCreate
   * @request POST:/api/Admin/enviar-email-qr
   * @secure
   */
  adminEnviarEmailQrCreate = (data: EmailDTO, params: RequestParams = {}) =>
    this.request<EmailResponseDTO, any>({
      path: `/api/Admin/enviar-email-qr`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AdminValidarQrCreate
   * @request POST:/api/Admin/validar-qr
   * @secure
   */
  adminValidarQrCreate = (data: QrValidationDTO, params: RequestParams = {}) =>
    this.request<QrValidationResponseDTO, any>({
      path: `/api/Admin/validar-qr`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthLoginCreate
   * @request POST:/api/Auth/login
   * @secure
   */
  authLoginCreate = (data: LoginDTO, params: RequestParams = {}) =>
    this.request<AuthResponseDTO, any>({
      path: `/api/Auth/login`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthRegisterCreate
   * @request POST:/api/Auth/register
   * @secure
   */
  authRegisterCreate = (data: RegisterDTO, params: RequestParams = {}) =>
    this.request<AuthResponseDTO, any>({
      path: `/api/Auth/register`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthRegisterInvitacionCreate
   * @request POST:/api/Auth/register-invitacion
   * @secure
   */
  authRegisterInvitacionCreate = (
    data: RegisterInvitacionDTO,
    params: RequestParams = {},
  ) =>
    this.request<AuthResponseDTO, any>({
      path: `/api/Auth/register-invitacion`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthValidarActivacionCreate
   * @request POST:/api/Auth/validar-activacion
   * @secure
   */
  authValidarActivacionCreate = (
    data: ValidarActivacionDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/Auth/validar-activacion`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthActivarCuentaCreate
   * @request POST:/api/Auth/activar-cuenta
   * @secure
   */
  authActivarCuentaCreate = (
    data: ActivarCuentaDTO,
    params: RequestParams = {},
  ) =>
    this.request<ActivarResponseDTO, any>({
      path: `/api/Auth/activar-cuenta`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ConfiguracionGrupoMuscular
   * @name ConfiguracionGrupoMuscularList
   * @request GET:/api/ConfiguracionGrupoMuscular
   * @secure
   */
  configuracionGrupoMuscularList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/ConfiguracionGrupoMuscular`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ConfiguracionGrupoMuscular
   * @name ConfiguracionGrupoMuscularCreate
   * @request POST:/api/ConfiguracionGrupoMuscular
   * @secure
   */
  configuracionGrupoMuscularCreate = (
    data: AgregarConfiguracionGrupoMuscularDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/ConfiguracionGrupoMuscular`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ConfiguracionGrupoMuscular
   * @name ConfiguracionGrupoMuscularDetail
   * @request GET:/api/ConfiguracionGrupoMuscular/{id}
   * @secure
   */
  configuracionGrupoMuscularDetail = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/ConfiguracionGrupoMuscular/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ConfiguracionGrupoMuscular
   * @name ConfiguracionGrupoMuscularUpdate
   * @request PUT:/api/ConfiguracionGrupoMuscular/{id}
   * @secure
   */
  configuracionGrupoMuscularUpdate = (
    id: number,
    data: ConfiguracionGrupoMuscularDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/ConfiguracionGrupoMuscular/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ConfiguracionGrupoMuscular
   * @name ConfiguracionGrupoMuscularDelete
   * @request DELETE:/api/ConfiguracionGrupoMuscular/{id}
   * @secure
   */
  configuracionGrupoMuscularDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/ConfiguracionGrupoMuscular/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dificultad
   * @name DificultadList
   * @request GET:/api/Dificultad
   * @secure
   */
  dificultadList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Dificultad`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dificultad
   * @name DificultadCreate
   * @request POST:/api/Dificultad
   * @secure
   */
  dificultadCreate = (data: AgregarDificultadDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Dificultad`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dificultad
   * @name DificultadDetail
   * @request GET:/api/Dificultad/{id}
   * @secure
   */
  dificultadDetail = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Dificultad/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dificultad
   * @name DificultadUpdate
   * @request PUT:/api/Dificultad/{id}
   * @secure
   */
  dificultadUpdate = (
    id: number,
    data: DificultadDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/Dificultad/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dificultad
   * @name DificultadDelete
   * @request DELETE:/api/Dificultad/{id}
   * @secure
   */
  dificultadDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Dificultad/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Ejercicio
   * @name EjercicioList
   * @request GET:/api/Ejercicio
   * @secure
   */
  ejercicioList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Ejercicio`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Ejercicio
   * @name EjercicioCreate
   * @request POST:/api/Ejercicio
   * @secure
   */
  ejercicioCreate = (data: AgregarEjercicioDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Ejercicio`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Ejercicio
   * @name EjercicioUpdate
   * @request PUT:/api/Ejercicio
   * @secure
   */
  ejercicioUpdate = (data: EjercicioDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Ejercicio`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Ejercicio
   * @name EjercicioDetail
   * @request GET:/api/Ejercicio/{id}
   * @secure
   */
  ejercicioDetail = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Ejercicio/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Ejercicio
   * @name EjercicioDelete
   * @request DELETE:/api/Ejercicio/{id}
   * @secure
   */
  ejercicioDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Ejercicio/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags EjercicioAsignado
   * @name EjercicioAsignadoList
   * @request GET:/api/EjercicioAsignado
   * @secure
   */
  ejercicioAsignadoList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/EjercicioAsignado`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags EjercicioAsignado
   * @name EjercicioAsignadoCreate
   * @request POST:/api/EjercicioAsignado
   * @secure
   */
  ejercicioAsignadoCreate = (
    data: AgregarEjercicioAsignadoDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/EjercicioAsignado`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags EjercicioAsignado
   * @name EjercicioAsignadoDetail
   * @request GET:/api/EjercicioAsignado/{id}
   * @secure
   */
  ejercicioAsignadoDetail = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/EjercicioAsignado/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags EjercicioAsignado
   * @name EjercicioAsignadoUpdate
   * @request PUT:/api/EjercicioAsignado/{id}
   * @secure
   */
  ejercicioAsignadoUpdate = (
    id: number,
    data: ActualizarEjercicioAsignadoDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/EjercicioAsignado/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags EjercicioAsignado
   * @name EjercicioAsignadoDelete
   * @request DELETE:/api/EjercicioAsignado/{id}
   * @secure
   */
  ejercicioAsignadoDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/EjercicioAsignado/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags EjercicioRealizado
   * @name EjercicioRealizadoList
   * @request GET:/api/EjercicioRealizado
   * @secure
   */
  ejercicioRealizadoList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/EjercicioRealizado`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags EjercicioRealizado
   * @name EjercicioRealizadoCreate
   * @request POST:/api/EjercicioRealizado
   * @secure
   */
  ejercicioRealizadoCreate = (
    data: AgregarEjercicioRealizadoDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/EjercicioRealizado`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags EjercicioRealizado
   * @name EjercicioRealizadoDetail
   * @request GET:/api/EjercicioRealizado/{id}
   * @secure
   */
  ejercicioRealizadoDetail = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/EjercicioRealizado/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags EjercicioRealizado
   * @name EjercicioRealizadoUpdate
   * @request PUT:/api/EjercicioRealizado/{id}
   * @secure
   */
  ejercicioRealizadoUpdate = (
    id: number,
    data: ActualizarEjercicioRealizadoDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/EjercicioRealizado/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags EjercicioRealizado
   * @name EjercicioRealizadoDelete
   * @request DELETE:/api/EjercicioRealizado/{id}
   * @secure
   */
  ejercicioRealizadoDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/EjercicioRealizado/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags GrupoMuscular
   * @name GrupoMuscularList
   * @request GET:/api/GrupoMuscular
   * @secure
   */
  grupoMuscularList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/GrupoMuscular`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags GrupoMuscular
   * @name GrupoMuscularCreate
   * @request POST:/api/GrupoMuscular
   * @secure
   */
  grupoMuscularCreate = (
    data: AgregarGrupoMuscularDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/GrupoMuscular`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags GrupoMuscular
   * @name GrupoMuscularDetail
   * @request GET:/api/GrupoMuscular/{id}
   * @secure
   */
  grupoMuscularDetail = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/GrupoMuscular/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags GrupoMuscular
   * @name GrupoMuscularUpdate
   * @request PUT:/api/GrupoMuscular/{id}
   * @secure
   */
  grupoMuscularUpdate = (
    id: number,
    data: GrupoMuscularDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/GrupoMuscular/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags GrupoMuscular
   * @name GrupoMuscularDelete
   * @request DELETE:/api/GrupoMuscular/{id}
   * @secure
   */
  grupoMuscularDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/GrupoMuscular/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Persona
   * @name PersonaList
   * @request GET:/api/Persona
   * @secure
   */
  personaList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Persona`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Persona
   * @name PersonaCreate
   * @request POST:/api/Persona
   * @secure
   */
  personaCreate = (data: CreatePersonaDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Persona`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Persona
   * @name PersonaDetail
   * @request GET:/api/Persona/{id}
   * @secure
   */
  personaDetail = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Persona/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Persona
   * @name PersonaUpdate
   * @request PUT:/api/Persona/{id}
   * @secure
   */
  personaUpdate = (
    id: number,
    data: UpdatePersonaDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/Persona/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Persona
   * @name PersonaDelete
   * @request DELETE:/api/Persona/{id}
   * @secure
   */
  personaDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Persona/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Puntaje
   * @name PuntajeList
   * @request GET:/api/Puntaje
   * @secure
   */
  puntajeList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Puntaje`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Puntaje
   * @name PuntajeCreate
   * @request POST:/api/Puntaje
   * @secure
   */
  puntajeCreate = (data: AgregarPuntajeDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Puntaje`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Puntaje
   * @name PuntajeDetail
   * @request GET:/api/Puntaje/{id}
   * @secure
   */
  puntajeDetail = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Puntaje/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Puntaje
   * @name PuntajeUpdate
   * @request PUT:/api/Puntaje/{id}
   * @secure
   */
  puntajeUpdate = (
    id: number,
    data: ActualizarPuntajeDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/Puntaje/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Puntaje
   * @name PuntajeDelete
   * @request DELETE:/api/Puntaje/{id}
   * @secure
   */
  puntajeDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Puntaje/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Rutina
   * @name RutinaList
   * @request GET:/api/Rutina
   * @secure
   */
  rutinaList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Rutina`,
      method: "GET",
      secure: true,
      ...params,
    });
    
  /**
   * No description
   *
   * @tags Rutina
   * @name RutinaCreate
   * @request POST:/api/Rutina
   * @secure
   */
  rutinaCreate = (data: AgregarRutinaDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Rutina`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
    
  /**
   * No description
   *
   * @tags Rutina
   * @name RutinaUpdate
   * @request PUT:/api/Rutina
   * @secure
   */
  rutinaUpdate = (data: ActualizarRutinaDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Rutina`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Rutina
   * @name RutinaDetail
   * @request GET:/api/Rutina/{id}
   * @secure
   */
  rutinaDetail = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Rutina/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Rutina
   * @name RutinaDelete
   * @request DELETE:/api/Rutina/{id}
   * @secure
   */
  rutinaDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Rutina/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RutinaEjercicio
   * @name RutinaEjercicioList
   * @request GET:/api/RutinaEjercicio
   * @secure
   */
  rutinaEjercicioList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/RutinaEjercicio`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RutinaEjercicio
   * @name RutinaEjercicioCreate
   * @request POST:/api/RutinaEjercicio
   * @secure
   */
  rutinaEjercicioCreate = (
    data: AgregarRutinaEjercicioDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/RutinaEjercicio`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags RutinaEjercicio
   * @name RutinaEjercicioDetail
   * @request GET:/api/RutinaEjercicio/{id}
   * @secure
   */
  rutinaEjercicioDetail = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/RutinaEjercicio/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RutinaEjercicio
   * @name RutinaEjercicioUpdate
   * @request PUT:/api/RutinaEjercicio/{id}
   * @secure
   */
  rutinaEjercicioUpdate = (
    id: number,
    data: ActualizarRutinaEjercicioDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/RutinaEjercicio/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags RutinaEjercicio
   * @name RutinaEjercicioDelete
   * @request DELETE:/api/RutinaEjercicio/{id}
   * @secure
   */
  rutinaEjercicioDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/RutinaEjercicio/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags SerieAsignada
   * @name SerieAsignadaList
   * @request GET:/api/SerieAsignada
   * @secure
   */
  serieAsignadaList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/SerieAsignada`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags SerieAsignada
   * @name SerieAsignadaCreate
   * @request POST:/api/SerieAsignada
   * @secure
   */
  serieAsignadaCreate = (
    data: AgregarSerieAsignadaDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/SerieAsignada`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SerieAsignada
   * @name SerieAsignadaDetail
   * @request GET:/api/SerieAsignada/{id}
   * @secure
   */
  serieAsignadaDetail = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/SerieAsignada/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags SerieAsignada
   * @name SerieAsignadaUpdate
   * @request PUT:/api/SerieAsignada/{id}
   * @secure
   */
  serieAsignadaUpdate = (
    id: number,
    data: ActualizarSerieAsignadaDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/SerieAsignada/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SerieAsignada
   * @name SerieAsignadaDelete
   * @request DELETE:/api/SerieAsignada/{id}
   * @secure
   */
  serieAsignadaDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/SerieAsignada/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags SerieRealizada
   * @name SerieRealizadaList
   * @request GET:/api/SerieRealizada
   * @secure
   */
  serieRealizadaList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/SerieRealizada`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags SerieRealizada
   * @name SerieRealizadaCreate
   * @request POST:/api/SerieRealizada
   * @secure
   */
  serieRealizadaCreate = (
    data: AgregarSerieRealizadaDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/SerieRealizada`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SerieRealizada
   * @name SerieRealizadaDetail
   * @request GET:/api/SerieRealizada/{id}
   * @secure
   */
  serieRealizadaDetail = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/SerieRealizada/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags SerieRealizada
   * @name SerieRealizadaUpdate
   * @request PUT:/api/SerieRealizada/{id}
   * @secure
   */
  serieRealizadaUpdate = (
    id: number,
    data: ActualizarSerieRealizadaDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/SerieRealizada/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SerieRealizada
   * @name SerieRealizadaDelete
   * @request DELETE:/api/SerieRealizada/{id}
   * @secure
   */
  serieRealizadaDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/SerieRealizada/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags SesionRealizadaDeEjercicios
   * @name SesionRealizadaDeEjerciciosList
   * @request GET:/api/SesionRealizadaDeEjercicios
   * @secure
   */
  sesionRealizadaDeEjerciciosList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/SesionRealizadaDeEjercicios`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags SesionRealizadaDeEjercicios
   * @name SesionRealizadaDeEjerciciosCreate
   * @request POST:/api/SesionRealizadaDeEjercicios
   * @secure
   */
  sesionRealizadaDeEjerciciosCreate = (
    data: AgregarSesionRealizadaDeEjerciciosDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/SesionRealizadaDeEjercicios`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SesionRealizadaDeEjercicios
   * @name SesionRealizadaDeEjerciciosDetail
   * @request GET:/api/SesionRealizadaDeEjercicios/{id}
   * @secure
   */
  sesionRealizadaDeEjerciciosDetail = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/SesionRealizadaDeEjercicios/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags SesionRealizadaDeEjercicios
   * @name SesionRealizadaDeEjerciciosUpdate
   * @request PUT:/api/SesionRealizadaDeEjercicios/{id}
   * @secure
   */
  sesionRealizadaDeEjerciciosUpdate = (
    id: number,
    data: SesionRealizadaDeEjerciciosDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/SesionRealizadaDeEjercicios/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SesionRealizadaDeEjercicios
   * @name SesionRealizadaDeEjerciciosDelete
   * @request DELETE:/api/SesionRealizadaDeEjercicios/{id}
   * @secure
   */
  sesionRealizadaDeEjerciciosDelete = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/SesionRealizadaDeEjercicios/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Socio
   * @name SocioList
   * @request GET:/api/Socio
   * @secure
   */
  socioList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Socio`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Socio
   * @name SocioCreate
   * @request POST:/api/Socio
   * @secure
   */
  socioCreate = (data: AgregarSocioDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Socio`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Socio
   * @name SocioDetail
   * @request GET:/api/Socio/{id}
   * @secure
   */
  socioDetail = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Socio/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Socio
   * @name SocioUpdate
   * @request PUT:/api/Socio/{id}
   * @secure
   */
  socioUpdate = (id: number, data: SocioDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Socio/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Socio
   * @name SocioDelete
   * @request DELETE:/api/Socio/{id}
   * @secure
   */
  socioDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Socio/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
