import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Ejercicio, EjercicioRealizadoDTOEntrada, EjercicioRealizadoDTOSalida } from '../../services/registroentrenamiento/interfaces/registroentrenamiento.interface'; 
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EjercicioRealizadoService {
  private apiUrl = `${environment.apiUrl}/EjercicioRealizado`;

  constructor(private http: HttpClient) { }

  // Traer ejercicios por usuario
  getEjerciciosPorUsuario(usuarioId: number): Observable<EjercicioRealizadoDTOSalida[]> {
    return this.http.get<EjercicioRealizadoDTOSalida[]>(`${this.apiUrl}/Usuario/${usuarioId}`);
  }

  // Registrar nuevo ejercicio
  registrarEjercicio(dto: EjercicioRealizadoDTOEntrada): Observable<EjercicioRealizadoDTOSalida> {
    return this.http.post<EjercicioRealizadoDTOSalida>(`${this.apiUrl}/registrar`, dto);
  }
}
