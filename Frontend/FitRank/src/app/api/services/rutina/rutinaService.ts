import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AgregarRutinaDTO, CrearSolicitudRutinaProfesorDTO, RutinaCompletaDTO, RutinaDTO, RutinaRequestDTO } from './interfaces/rutina.interface.rest';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {
 
  private apiUrl = `${environment.apiUrl}/Rutina`;
  private apiUrlSolicitudes = `${environment.apiUrl}/solicitudes`;

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
    return this.http.get<RutinaCompletaDTO[]>(url);
  }
  
  getRutinaCompletaPorId(rutinaId: number): Observable<RutinaCompletaDTO> {
    return this.http.get<RutinaCompletaDTO>(`${this.apiUrl}/detalle/${rutinaId}`);
  }

  generarRutinaIA(idSocio: number, data: RutinaRequestDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/generar?idSocio=${idSocio}`, data);
  }

solicitarRutinaAsistida(socioId: number, data: CrearSolicitudRutinaProfesorDTO): Observable<any> {
  return this.http.post(`${this.apiUrlSolicitudes}?socioId=${socioId}`, data);
}

  actualizarEstado(solicitudId: number): Observable<any> {
    return this.http.put(`${this.apiUrlSolicitudes}/${solicitudId}/terminar`, {});
  }
  //para el socio

  // getFavoritas(socioId: number) {
  //   return this.http.get<any[]>(`${this.apiUrl}/rutina/favoritas/${socioId}`);
  // }
  //para el admin el global
  getFavoritasGimnasio(gimnasioId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/rutina/favoritas/gimnasio/${gimnasioId}`);
  }


    /**  Marcar o desmarcar como favorita */
  cambiarFavorita(rutinaId: number, favorita: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/rutina/${rutinaId}/favorita?favorita=${favorita}`, {});
  }

  /**  Cambiar estado (activa / inactiva) */
  cambiarEstado(rutinaId: number, activa: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/rutina/${rutinaId}/estado?activa=${activa}`, {});
  }

  /**  Obtener favoritas del socio */
  getFavoritas(socioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rutina/favoritas/${socioId}`);
  }

}
