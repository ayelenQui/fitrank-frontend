import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SerieAsignadaCreateDTO } from './interfaces/serieAsignada.interface.rest';
@Injectable({
  providedIn: 'root'

})

export class SerieAsignadaService {
  private apiUrl = 'https://localhost:7226/api/SerieAsignada';
  constructor(private http: HttpClient) { }
  // 🔹 Crear una nueva serie
  crearSerie(serie: SerieAsignadaCreateDTO): Observable<any> {
    return this.http.post(this.apiUrl, serie);
  }
  // 🔹 Traer series de un ejercicio asignado
  listarSeriesPorEjercicioAsignado(id: number): Observable<SerieAsignadaCreateDTO[]> {
    return this.http.get<SerieAsignadaCreateDTO[]>(`${this.apiUrl}/por-ejercicio/${id}`);
  }
  getAll(): Observable<SerieAsignadaCreateDTO[]> {
    return this.http.get<SerieAsignadaCreateDTO[]>(this.apiUrl);
  }

}



