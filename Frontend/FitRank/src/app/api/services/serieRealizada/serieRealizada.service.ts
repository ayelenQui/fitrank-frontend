import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearSerieRealizadaDTO, SerieRealizadaDTO } from '../../services/serieRealizada/interfaces/serieRealizada.interface';

@Injectable({ providedIn: 'root' })
export class SerieRealizadaService {
  private apiUrl = `${environment.apiUrl}/SerieRealizada`;

  constructor(private http: HttpClient) { }

  crear(payload: CrearSerieRealizadaDTO): Observable<SerieRealizadaDTO> {
    return this.http.post<SerieRealizadaDTO>(this.apiUrl, payload);
  }

  getAll(): Observable<SerieRealizadaDTO[]> {
    return this.http.get<SerieRealizadaDTO[]>(this.apiUrl);
  }

  getByEjercicioRealizado(id: number): Observable<SerieRealizadaDTO[]> {
    return this.http.get<SerieRealizadaDTO[]>(`${this.apiUrl}/ejercicio/${id}`);
  }
}
