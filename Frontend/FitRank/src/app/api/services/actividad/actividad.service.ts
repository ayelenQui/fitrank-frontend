import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import {
  ObtenerActividadDTO,
  AgregarActividadDTO,
  ActualizarActividadDTO,
  RegistrarActividadDTO
} from '@app/api/services/actividad/interface/actividad.interface';

@Injectable({ providedIn: 'root' })
export class ActividadService {
  private apiUrl = `${environment.apiUrl}/Actividad`;

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<ObtenerActividadDTO[]> {
    return this.http.get<ObtenerActividadDTO[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<ObtenerActividadDTO> {
    return this.http.get<ObtenerActividadDTO>(`${this.apiUrl}/${id}`);
  }

  crear(dto: AgregarActividadDTO): Observable<ObtenerActividadDTO> {
    return this.http.post<ObtenerActividadDTO>(this.apiUrl, dto);
  }

  actualizar(id: number, dto: ActualizarActividadDTO): Observable<ObtenerActividadDTO> {
    return this.http.put<ObtenerActividadDTO>(`${this.apiUrl}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  registrar(dto: RegistrarActividadDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar`, dto);
  }
}
