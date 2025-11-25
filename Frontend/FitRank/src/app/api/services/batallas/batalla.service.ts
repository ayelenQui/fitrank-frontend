import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CrearBatallaDTO, HistorialBatallaDTO, ProgresoBatallaDTO } from './interface/batalla.interface';

@Injectable({
  providedIn: 'root'
})
export class BatallaService {

  private apiUrl = `${environment.apiUrl}/Batalla`;

  constructor(private http: HttpClient) {}

  crear(dto: CrearBatallaDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, dto);
  }

  aceptar(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/aceptar/${id}`, {});
  }

  rechazar(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/rechazar/${id}`, {});
  }

  obtenerActivas(socioId: number): Observable<HistorialBatallaDTO[]> {
  return this.http.get<HistorialBatallaDTO[]>(
    `${this.apiUrl}/activas/${socioId}`
  );
}

obtenerPendientes(id: number): Observable<HistorialBatallaDTO[]> {
  return this.http.get<HistorialBatallaDTO[]>(
    `${this.apiUrl}/pendientes/${id}`
  );
}

  progreso(id: number): Observable<ProgresoBatallaDTO> {
    return this.http.get<ProgresoBatallaDTO>(`${this.apiUrl}/progreso/${id}`);
  }

  finalizar(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/finalizar`, {});
  }

  historial(socioId: number): Observable<HistorialBatallaDTO[]> {
  return this.http.get<HistorialBatallaDTO[]>(
    `${this.apiUrl}/historial/${socioId}`
  );
}
}
