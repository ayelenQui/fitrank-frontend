import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearEjercicioRealizadoDTO, EjercicioRealizadoDTO } from './interfaces/ejercicioRealizado.interface.rest';

@Injectable({ providedIn: 'root' })
export class EjercicioRealizadoService {
  private apiUrl = `${environment.apiUrl}/EjercicioRealizado`;

  constructor(private http: HttpClient) { }

  // 🔹 Crear un nuevo ejercicio realizado
  crear(payload: CrearEjercicioRealizadoDTO): Observable<EjercicioRealizadoDTO> {
    return this.http.post<EjercicioRealizadoDTO>(this.apiUrl, payload);
  }

  // 🔹 Obtener todos
  getAll(): Observable<EjercicioRealizadoDTO[]> {
    return this.http.get<EjercicioRealizadoDTO[]>(this.apiUrl);
  }

  // 🔹 Obtener uno por ID
  getById(id: number): Observable<EjercicioRealizadoDTO> {
    return this.http.get<EjercicioRealizadoDTO>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Borrar
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
