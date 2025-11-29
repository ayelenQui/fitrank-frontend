import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActualizarReporte, AgregarReporte, Reporte } from './interfaces/reportes.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = `${environment.apiUrl}/reporte`;

    constructor(private http: HttpClient) { }

  obtenerReportesDeGimnasio(gimnasioId: number): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.apiUrl}/gimnasio/${gimnasioId}`);
  }

  obtenerReportePorId(id: number): Observable<Reporte> {
    return this.http.get<Reporte>(`${this.apiUrl}/${id}`);
  }

  agregarReporte(reporte: AgregarReporte): Observable<Reporte> {
    return this.http.post<Reporte>(`${this.apiUrl}/agregar`, reporte);
  }

  actualizarReporte(reporte: ActualizarReporte): Observable<Reporte> {
    return this.http.put<Reporte>(`${this.apiUrl}/editar/${reporte.id}`, reporte);
  }

  eliminarReporte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  desactivarReporte(id: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/desactivar/${id}`, null, {
      responseType: 'text'
    });
  }

obtenerReportesPorUsuario(usuarioId: number): Observable<Reporte[]> {
  return this.http.get<Reporte[]>(`${this.apiUrl}/usuario/${usuarioId}`);
}

  obtenerReportesActivos(gimnasioId: number): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.apiUrl}/gimnasio/${gimnasioId}/activos`);
  }

  obtenerReportesInactivos(gimnasioId: number): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.apiUrl}/gimnasio/${gimnasioId}/inactivos`);
  }

}
