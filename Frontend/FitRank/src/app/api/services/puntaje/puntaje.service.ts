import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AgregarPuntajeDTO, ObtenerPuntajeDTO, ActualizarPuntajeDTO } from './interface/puntaje.interface';

@Injectable({ providedIn: 'root' })
export class PuntajeService {
  private apiUrl = `${environment.apiUrl}/Puntaje`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ObtenerPuntajeDTO[]> {
    return this.http.get<ObtenerPuntajeDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<ObtenerPuntajeDTO> {
    return this.http.get<ObtenerPuntajeDTO>(`${this.apiUrl}/${id}`);
  }

  crear(payload: AgregarPuntajeDTO): Observable<ObtenerPuntajeDTO> {
    return this.http.post<ObtenerPuntajeDTO>(this.apiUrl, payload);
  }

  actualizar(payload: ActualizarPuntajeDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${payload.id}`, payload);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
