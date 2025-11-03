import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AgregarEntrenamientoDTO, EntrenamientoDTO } from '@app/api/services/entrenamiento/interface/entrenamiento.interface';

@Injectable({ providedIn: 'root' })
export class EntrenamientoService {
  private apiUrl = `${environment.apiUrl}/Entrenamiento`;

  constructor(private http: HttpClient) { }

  crearEntrenamiento(dto: AgregarEntrenamientoDTO): Observable<EntrenamientoDTO> {
    return this.http.post<EntrenamientoDTO>(this.apiUrl, dto);
  }

}
