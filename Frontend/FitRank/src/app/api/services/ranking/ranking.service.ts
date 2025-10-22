import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';  
@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private apiUrl = `${environment.apiUrl}/Ranking`;

  constructor(private http: HttpClient) { }

  obtenerRankingGeneral(cantidad: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/top/${cantidad}`);
  }

  obtenerPuntajePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/puntaje`);
  }
}