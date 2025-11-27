import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  AgregarEjercicioAsignadoDTO,
  ActualizarEjercicioAsignadoDTO,
  EjercicioAsignadoDTO
} from './interfaces/ejercicioAsignado.interface.rest';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EjercicioAsignadoService {
  private apiUrl = `${environment.apiUrl}/EjercicioAsignado`;

  constructor(private http: HttpClient) { }

  /**
   * 🔹 Obtener todos los ejercicios asignados
   */
  getEjerciciosAsignados(): Observable<EjercicioAsignadoDTO[]> {
    return this.http.get<EjercicioAsignadoDTO[]>(this.apiUrl);
  }


  getEjercicioAsignadoById(id: number): Observable<EjercicioAsignadoDTO> {
    return this.http.get<EjercicioAsignadoDTO>(`${this.apiUrl}/${id}`);
  }

  
  createEjercicioAsignado(dto: AgregarEjercicioAsignadoDTO): Observable<EjercicioAsignadoDTO> {
    return this.http.post<EjercicioAsignadoDTO>(this.apiUrl, dto);
  }

  
  updateEjercicioAsignado(id: number, dto: ActualizarEjercicioAsignadoDTO): Observable<EjercicioAsignadoDTO> {
    return this.http.put<EjercicioAsignadoDTO>(`${this.apiUrl}/${id}`, dto);
  }

 
  deleteEjercicioAsignado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
  getBySesionId(sesionId: number): Observable<EjercicioAsignadoDTO[]> {
    return this.http.get<EjercicioAsignadoDTO[]>(this.apiUrl).pipe(
      map(ejercicios => ejercicios.filter(e => e.sesionId === sesionId))
    );
  }
}
