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

   // Obtener reportes de un gimnasio
  obtenerReportesDeGimnasio(gimnasioId: number): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.apiUrl}/gimnasio/${gimnasioId}`);
  }

  // Obtener reporte por id
  obtenerReportePorId(id: number): Observable<Reporte> {
    return this.http.get<Reporte>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo reporte
  agregarReporte(reporte: AgregarReporte): Observable<Reporte> {
    return this.http.post<Reporte>(`${this.apiUrl}/agregar`, reporte);
  }

  // Actualizar un reporte
  actualizarReporte(reporte: ActualizarReporte): Observable<Reporte> {
    return this.http.put<Reporte>(`${this.apiUrl}/editar/${reporte.id}`, reporte);
  }

  // Eliminar un reporte
  eliminarReporte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Desactivar reporte (marcar como concluido)
  desactivarReporte(id: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/desactivar/${id}`, null, {
      responseType: 'text'
    });
  }

  // reportes.service.ts
obtenerReportesPorUsuario(usuarioId: number): Observable<Reporte[]> {
  return this.http.get<Reporte[]>(`${this.apiUrl}/usuario/${usuarioId}`);
}

  obtenerReportesActivos(gimnasioId: number): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.apiUrl}/gimnasio/${gimnasioId}/activos`);
  }

  // Obtener reportes inactivos de un gimnasio
  obtenerReportesInactivos(gimnasioId: number): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.apiUrl}/gimnasio/${gimnasioId}/inactivos`);
  }

}
