import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearRutinaDTO, EditarRutinaDTO, RutinaDTO } from './interfaces/rutina.interface.rest';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {
  private apiUrl = `${environment.apiUrl}/rutina`;

  constructor(private http: HttpClient) { }

  crearRutina(rutina: CrearRutinaDTO): Observable<any> {
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

  editarRutina(id: number, rutina: EditarRutinaDTO): Observable<RutinaDTO> {
    return this.http.put<RutinaDTO>(`${this.apiUrl}/${id}`, rutina);
  }

  eliminarRutina(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
