import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AgregarPuntajeDTO, ObtenerPuntajeDTO, ActualizarPuntajeDTO, EstadisticaCorporalSocioDTO, PuntajeTotalDTO, PuntajePorGrupoDTO } from './interface/puntaje.interface';



@Injectable({ providedIn: 'root' })
export class PuntajeService {
  private apiUrl = `${environment.apiUrl}/Puntaje`;

  constructor(private http: HttpClient) {}

  // 🔹 Métodos CRUD base (por si los usás en otras partes)
  getAll(): Observable<ObtenerPuntajeDTO[]> {
    return this.http.get<ObtenerPuntajeDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<ObtenerPuntajeDTO> {
    return this.http.get<ObtenerPuntajeDTO>(`${this.apiUrl}/${id}`);
  }

  crear(payload: AgregarPuntajeDTO): Observable<ObtenerPuntajeDTO> {
    return this.http.post<ObtenerPuntajeDTO>(this.apiUrl, payload);
  }

  actualizar(payload: ActualizarPuntajeDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${payload.id}`, payload);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🧠 NUEVOS métodos para los casos de uso del controlador

  /** 🔹 Devuelve estadísticas corporales del socio */
  obtenerEstadisticaCorporal(socioId: number): Observable<EstadisticaCorporalSocioDTO> {
    return this.http.get<EstadisticaCorporalSocioDTO>(`${this.apiUrl}/${socioId}/estadisticas`);
  }

  /** 🔹 Devuelve puntaje total y por grupo muscular */
  obtenerPuntajeTotal(socioId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${socioId}/puntaje-total`);
  }

  /** 🔹 Devuelve el puntaje combinado (total + por grupo) */
  obtenerPuntajeCombinado(socioId: number): Observable<PuntajeTotalDTO> {
    return this.http.get<PuntajeTotalDTO>(`${this.apiUrl}/${socioId}/puntaje-combinado`);
  }

  /** 🔹 Devuelve puntaje solo por grupo muscular */
  obtenerPuntajePorGrupo(socioId: number): Observable<PuntajePorGrupoDTO[]> {
    return this.http.get<PuntajePorGrupoDTO[]>(`${this.apiUrl}/${socioId}/puntaje-por-grupo`);
  }

  /** 🔹 Devuelve el ranking de todos los socios */
  obtenerRanking(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ranking`);
  }
}
