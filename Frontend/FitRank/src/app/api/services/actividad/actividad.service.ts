import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ActividadDTO, AgregarActividadDTO } from '@app/api/services/actividad/interface/actividad.interface';

@Injectable({ providedIn: 'root' })
export class ActividadService {
  private apiUrl = `${environment.apiUrl}/Actividad`;

  constructor(private http: HttpClient) { }

  crearActividad(dto: AgregarActividadDTO): Observable<ActividadDTO> {
    return this.http.post<ActividadDTO>(this.apiUrl, dto);
  }
}
