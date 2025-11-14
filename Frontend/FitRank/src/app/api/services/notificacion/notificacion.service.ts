import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    EnviarMasivaDTO,
    EnviarMasivaResponse,
    HistorialNoti,
  NotificacionDTO,
  NotificacionesRespuestaDTO, NotificacionIndividualDTO, NotificacionMasivaDTO, UsuarioNotificacion
} from './interface/notificacion.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private apiUrl = 'https://localhost:7226/api/Notificacion';

  constructor(private http: HttpClient) { }

  // 🔹 Obtener mis notificaciones (Socio)
  getMisNotificaciones(): Observable<NotificacionesRespuestaDTO> {
    return this.http.get<NotificacionesRespuestaDTO>(
      `${this.apiUrl}/usuario`
    );
  }

  // 🔹 Enviar notificación de retención (Admin → Socio)
  enviarNotificacionRetencion(socioId: number): Observable<{
    exito: boolean;
    mensaje: string;
    notificacion?: NotificacionDTO;
  }> {
    return this.http.post<{
      exito: boolean;
      mensaje: string;
      notificacion?: NotificacionDTO;
    }>(
      `${this.apiUrl}/retener/${socioId}`,
      {}
    );
  }

  // 🔹 Marcar como leída
  marcarComoLeida(notificacionId: number): Observable<{
    exito: boolean;
    mensaje: string;
  }> {
    return this.http.put<{ exito: boolean; mensaje: string }>(
      `${this.apiUrl}/marcar-leida/${notificacionId}`,
      {}
    );
  }

  // 🔹 Eliminar
  eliminarNotificacion(notificacionId: number): Observable<{
    exito: boolean;
    mensaje: string;
  }> {
    return this.http.delete<{ exito: boolean; mensaje: string }>(
      `${this.apiUrl}/eliminar/${notificacionId}`
    );
  }

  
  getHistorial() {
    return this.http.get<HistorialNoti[]>(`${this.apiUrl}/historial`);
  }

  enviarIndividual(dto: { usuarioReceptorId: number; titulo: string; mensaje: string }) {
    return this.http.post(`${this.apiUrl}/enviar`, dto);
  }

  enviarMasiva(dto: EnviarMasivaDTO) {
    return this.http.post<EnviarMasivaResponse>(`${this.apiUrl}/masiva`, dto);
  }


  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }
  getUsuariosParaNotificar(): Observable<UsuarioNotificacion[]> {
    return this.http.get<UsuarioNotificacion[]>(`${this.apiUrl}/usuarios`);
  }

}


