import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AgregarEntrenamientoDTO, EntrenamientoDTO } from '@app/api/services/entrenamiento/interface/entrenamiento.interface';
import { EntrenamientoHistorialDTO } from './interface/entrenamientoHistorial.interface';

@Injectable({ providedIn: 'root' })
export class EntrenamientoService {
  private apiUrl = `${environment.apiUrl}/Entrenamiento`;

  constructor(private http: HttpClient) { }

  crearEntrenamiento(dto: AgregarEntrenamientoDTO): Observable<EntrenamientoDTO> {
    return this.http.post<EntrenamientoDTO>(this.apiUrl, dto);
  }

  getEntrenamientoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  actualizarEntrenamiento(id: number, dto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, dto);
  }

  eliminarEntrenamiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getHistorialDeSocio(socioId: number): Observable<any[]> {
    return this.http.get<EntrenamientoHistorialDTO[]>(`${this.apiUrl}/socio/${socioId}/historial`);
  }

  getHistorialAlumnosDelProfesor(profesorId: number, nombre?: string) {
    let url = `${this.apiUrl}/profesor/${profesorId}/historial`;

    if (nombre && nombre.trim().length > 0) {
      url += `?nombre=${nombre}`;
    }

    return this.http.get<EntrenamientoHistorialDTO[]>(url);
  }
}
