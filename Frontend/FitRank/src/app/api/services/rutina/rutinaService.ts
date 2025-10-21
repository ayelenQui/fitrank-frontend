import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AgregarRutinaDTO, RutinaDTO } from './interfaces/rutina.interface.rest';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {
  private apiUrl = `${environment.apiUrl}/Rutina`;

  constructor(private http: HttpClient) { }

  crearRutina(rutina: AgregarRutinaDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}`, rutina);
  }

  listarRutinas(): Observable<RutinaDTO[]> {
    return this.http.get<RutinaDTO[]>(`${this.apiUrl}`);
  }

  listarRutinasPorUsuario(usuarioId: number): Observable<RutinaDTO[]> {
    return this.http.get<RutinaDTO[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  obtenerRutinaPorId(id: number): Observable<RutinaDTO> {
    return this.http.get<RutinaDTO>(`${this.apiUrl}/${id}`);
  }
  getRutinasPorUsuario(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/EjercicioAsignado?socioId=${userId}`);
  }


}
