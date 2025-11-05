import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsistenciaListadoDTO, DetalleUsuarioAsistenciaRespuestaDTO, SocioInactivoDTO } from './interface/asistencia.interface';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private apiUrl = 'https://localhost:7226/api/Asistencia';

  constructor(private http: HttpClient) { }


  validarQR(qrData: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/validar-qr`, { qrData });
  }


  getDetalleUsuarioAsistencia(usuarioId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/detalle-usuarioAsistencia/${usuarioId}`, { headers });
  }

  getTodasAsistencias(token: string): Observable<AsistenciaListadoDTO[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<AsistenciaListadoDTO[]>(`${this.apiUrl}/todas`, { headers });

  }

  getSociosInactivos(token: string, dias: number = 5) {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<SocioInactivoDTO[]>(
      `${this.apiUrl}/socios-inactivos/${dias}`,
      { headers }
    );
  }


}
