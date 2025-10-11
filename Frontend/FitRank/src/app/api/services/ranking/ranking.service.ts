import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';  
import { MostrarRankingDTO, MostrarRankingDTOGrupo } from './interfaces/ranking.interface';  
@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private apiUrl = `${environment.apiUrl}/Ranking`;
  constructor(private http: HttpClient) { }
  getRanking(): Observable<MostrarRankingDTO[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map(data =>
        data.map(item => ({
          username: item.username ?? item.username ?? '',
          Totalpuntos: item.TotalPuntos ?? item.totalPuntos ?? 0,
          Nivel: item.Nivel ?? item.nivel ?? ''
        }))
      )
    );
  }

  getRankingGrupoMuscular(): Observable<MostrarRankingDTOGrupo[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Grupomuscular`).pipe(
      map(data =>
        data.map(item => ({
          username: item.username ?? item.username ?? '',
          Totalpuntos: item.TotalPuntos ?? item.totalPuntos ?? 0,
          Nivel: item.Nivel ?? item.nivel ?? '',
          GrupoMuscular: item.GrupoMuscular ?? item.grupoMuscular ?? '',
          Nombre: item.Nombre ?? item.nombre ?? ''
        }))
      )
    );
  }
  // Optional: Method to get user initial for avatar
  getUserInitial(userName: string): string {
    return userName ? userName.charAt(0).toUpperCase() : '?';
  }


}

