import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  NotificacionDTO,
  NotificacionesRespuestaDTO
} from './interface/notificacion.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private apiUrl = 'https://localhost:7226/api/Notificacion';

  constructor(private http: HttpClient) { }
  getMisNotificaciones(token: string): Observable<NotificacionesRespuestaDTO> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // ✅ Cambiá esta URL
    return this.http.get<NotificacionesRespuestaDTO>(
      `${this.apiUrl}/usuario`, 
      { headers }
    );
  }


  // 🔹 Enviar notificación de retención (admin -> socio)
  enviarNotificacionRetencion(
    token: string,
    socioId: number
  ): Observable<{ exito: boolean; mensaje: string; notificacion?: NotificacionDTO }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<{ exito: boolean; mensaje: string; notificacion?: NotificacionDTO }>(
      `${this.apiUrl}/retener/${socioId}`,
      {},
      { headers }
    );
  }

  // 🔹 Marcar una notificación como leída
  marcarComoLeida(
    token: string,
    notificacionId: number
  ): Observable<{ exito: boolean; mensaje: string }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<{ exito: boolean; mensaje: string }>(
      `${this.apiUrl}/marcar-leida/${notificacionId}`,
      {},
      { headers }
    );
  }

  // 🔹 Eliminar (desactivar) notificación opcionalmente
  eliminarNotificacion(
    token: string,
    notificacionId: number
  ): Observable<{ exito: boolean; mensaje: string }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete<{ exito: boolean; mensaje: string }>(
      `${this.apiUrl}/eliminar/${notificacionId}`,
      { headers }
    );
  }
}
