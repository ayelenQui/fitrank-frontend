import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AgregarRutinaDTO, RutinaCompletaDTO, RutinaDTO, RutinaRequestDTO } from './interfaces/rutina.interface.rest';

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

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getRutinasPorSocio(socioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map((rutinas: any[]) => rutinas.filter(r => r.socioId === socioId))
    );
  }

  getRutinaCompletaPorSocio(socioId: number): Observable<RutinaCompletaDTO[]> {
    const url = `${this.apiUrl}/socio/${socioId}/detalle`;
    console.log('🌐 GET:', url);
    return this.http.get<RutinaCompletaDTO[]>(url);
  }
  // 🔹 Obtener rutina completa por ID
  getRutinaCompletaPorId(rutinaId: number): Observable<RutinaCompletaDTO> {
    return this.http.get<RutinaCompletaDTO>(`${this.apiUrl}/detalle/${rutinaId}`);
  }

  generarRutinaIA(idSocio: number, data: RutinaRequestDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/generar?idSocio=${idSocio}`, data);
  }
}
