import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsistenciaListadoDTO, SocioInactivoDTO } from './interface/asistencia.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private apiUrl = `${environment.apiUrl}/Asistencia`;

  constructor(private http: HttpClient) { }


  validarQR(qr: string): Observable<any> {
    const payload = {
      qrData: qr,
      gimnasioId: null,
      observaciones: null
    };

    return this.http.post<any>(
      `${this.apiUrl}/validar-qr`,
      JSON.stringify(payload),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }


  getDetalleUsuarioAsistencia(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detalle-usuarioAsistencia/${usuarioId}`);
  }

  getTodasAsistencias(): Observable<AsistenciaListadoDTO[]> {
    return this.http.get<AsistenciaListadoDTO[]>(`${this.apiUrl}/todas`);
  }

  getSociosInactivos(dias: number = 5): Observable<SocioInactivoDTO[]> {
    return this.http.get<SocioInactivoDTO[]>(`${this.apiUrl}/socios-inactivos/${dias}`);
  }
  getOcupacionActual() {
    return this.http.get<{ personasDentro: number }>(
      `${this.apiUrl}/ocupacion-actual`
    );
  }


}
