import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearEjercicioRealizadoDTO, EjercicioRealizadoDTO } from './interfaces/ejercicioRealizado.interface.rest';

@Injectable({ providedIn: 'root' })
export class EjercicioRealizadoService {
  private apiUrl = `${environment.apiUrl}/EjercicioRealizado`;

  constructor(private http: HttpClient) { }

  crear(payload: CrearEjercicioRealizadoDTO): Observable<EjercicioRealizadoDTO> {
    return this.http.post<EjercicioRealizadoDTO>(this.apiUrl, payload);
  }

  getAll(): Observable<EjercicioRealizadoDTO[]> {
    return this.http.get<EjercicioRealizadoDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<EjercicioRealizadoDTO> {
    return this.http.get<EjercicioRealizadoDTO>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
