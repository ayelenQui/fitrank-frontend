import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CrearSesionRealizadaDeEjerciciosDTO,
  SesionRealizadaDeEjerciciosDTO
} from './interfaces/sesionRealizadaDeEjercicios.interface';

@Injectable({ providedIn: 'root' })
export class SesionRealizadaDeEjerciciosService {
  private apiUrl = `${environment.apiUrl}/SesionRealizadaDeEjercicios`;

  constructor(private http: HttpClient) { }

  crear(payload: CrearSesionRealizadaDeEjerciciosDTO): Observable<SesionRealizadaDeEjerciciosDTO> {
    return this.http.post<SesionRealizadaDeEjerciciosDTO>(this.apiUrl, payload);
  }

  getAll(): Observable<SesionRealizadaDeEjerciciosDTO[]> {
    return this.http.get<SesionRealizadaDeEjerciciosDTO[]>(this.apiUrl);
  }
}
