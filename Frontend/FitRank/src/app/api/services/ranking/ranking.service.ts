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
          username: item.username ?? item.Username ?? '',  // ✅ Fallback: camel o Pascal
          Totalpuntos: item.TotalPuntos ?? item.totalPuntos ?? 0,  // ✅ Number, fallback
          Nivel: item.Nivel ?? item.nivel ?? ''  // ✅ Fallback
        }))
      )
    );
  }
  getRankingGrupoMuscular(): Observable<MostrarRankingDTOGrupo[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Grupomuscular`).pipe(
      map(data =>
        data.map(item => ({
          username: item.username ?? item.Username ?? '',  // ✅ Fallback
          Totalpuntos: item.TotalPuntos ?? item.totalPuntos ?? 0,  // ✅ Number
          Nivel: item.Nivel ?? item.nivel ?? '',  // ✅ Fallback
          GrupoMuscular: (item.GrupoMuscular ?? item.grupoMuscular ?? 0) as number,  // ✅ Number para enum (default 0=pecho), fallback y casteo
          Nombre: item.Nombre ?? item.nombre ?? '',  // ✅ Fallback, string
          divisionPorGrupo: item.DivisionPorGrupo ?? item.divisionPorGrupo ?? ''  // ✅ Agregada para matching con interfaz (fallback Pascal/camel)
        }))
      )
    );
  }
  // Optional: Method to get user initial for avatar
  getUserInitial(userName: string): string {
    return userName ? userName.charAt(0).toUpperCase() : '?';
  }
}
