import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EjercicioDTO } from '../../services/ejercicio/interfaces/ejercicio.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EjercicioService {
  private baseUrl = `${environment.apiUrl}/Ejercicio`;

  constructor(private http: HttpClient) { }

  // GET todos los ejercicios
  obtenerEjercicios(): Observable<EjercicioDTO[]> {
    return this.http.get<EjercicioDTO[]>(this.baseUrl);
  }

  // POST crear ejercicio (sin id)
  crearEjercicio(data: Omit<EjercicioDTO, 'id'>): Observable<EjercicioDTO> {
    return this.http.post<EjercicioDTO>(this.baseUrl, data);
  }
}
