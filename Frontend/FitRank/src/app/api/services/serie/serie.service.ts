import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SerieDTO, AgregarSerieDTO, ActualizarSerieDTO } from './interface/serie.interface';

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  private apiUrl = 'https://localhost:7226/api/Serie';

  constructor(private http: HttpClient) { }


  obtenerTodas(): Observable<SerieDTO[]> {
    return this.http.get<SerieDTO[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<SerieDTO> {
    return this.http.get<SerieDTO>(`${this.apiUrl}/${id}`);
  }


  crear(serie: AgregarSerieDTO): Observable<SerieDTO> {
    return this.http.post<SerieDTO>(this.apiUrl, serie);
  }

  
  actualizar(id: number, serie: ActualizarSerieDTO): Observable<SerieDTO> {
    return this.http.put<SerieDTO>(`${this.apiUrl}/${id}`, serie);
  }

 
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
