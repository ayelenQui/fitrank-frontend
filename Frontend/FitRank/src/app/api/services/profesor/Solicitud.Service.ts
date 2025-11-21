import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Solicitud } from './interfaces/solicitud.interface';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = `${environment.apiUrl}/Solicitudes`;

  constructor(private http: HttpClient) { }

  obtenerPendientes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/pendientes`);
  }
  tomarSolicitud(solicitudId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(`${this.apiUrl}/tomar`, { solicitudId }, { headers });
  }



}
