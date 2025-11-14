import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsistenciaListadoDTO, SocioInactivoDTO } from './interface/asistencia.interface';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private apiUrl = 'https://localhost:7226/api/Asistencia';

  constructor(private http: HttpClient) { }

  validarQR(qrData: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/validar-qr`, { qrData });
  }

  getDetalleUsuarioAsistencia(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detalle-usuarioAsistencia/${usuarioId}`);
  }

  getTodasAsistencias(): Observable<AsistenciaListadoDTO[]> {
    return this.http.get<AsistenciaListadoDTO[]>(`${this.apiUrl}/todas`);
  }

  getSociosInactivos(dias: number = 5): Observable<SocioInactivoDTO[]> {
    return this.http.get<SocioInactivoDTO[]>(`${this.apiUrl}/socios-inactivos/${dias}`);
  }
}
