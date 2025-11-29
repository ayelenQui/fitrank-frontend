import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SerieAsignadaCreateDTO } from './interfaces/serieAsignada.interface.rest';
import { environment } from 'src/environments/environment'; 
@Injectable({
  providedIn: 'root'

})

export class SerieAsignadaService {
  private apiUrl = `${environment.apiUrl}/SerieAsignada`;
  constructor(private http: HttpClient) { }
  crearSerie(serie: SerieAsignadaCreateDTO): Observable<any> {
    return this.http.post(this.apiUrl, serie);
  }
  listarSeriesPorEjercicioAsignado(id: number): Observable<SerieAsignadaCreateDTO[]> {
    return this.http.get<SerieAsignadaCreateDTO[]>(`${this.apiUrl}/por-ejercicio/${id}`);
  }
  getAll(): Observable<SerieAsignadaCreateDTO[]> {
    return this.http.get<SerieAsignadaCreateDTO[]>(this.apiUrl);
  }

}



