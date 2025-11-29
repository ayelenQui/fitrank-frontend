import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LogroGimnasio {
  gimnasioId: number;
  logroId: number;
  estaHabilitado: boolean;

  nombre: string;
  nombreClave: string;
  descripcion: string;
  imagen: string;
}

export interface LogroAdminView {
  gimnasioId: number;
  logroId: number;
  nombre: string;
  nombreClave: string;
  descripcion: string;
  imagen: string;
  estaHabilitado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LogrosGimnasioService {

  private baseUrl = `${environment.apiUrl}/gimnasios`; // api/LogroGimnasio

  constructor(private http: HttpClient) {}

  obtenerPorGimnasio(gimnasioId: number): Observable<LogroGimnasio[]> {
    // GET api/LogroGimnasio?gimnasioId=1
    return this.http.get<LogroGimnasio[]>(`${this.baseUrl}/${gimnasioId}/logrosgimnasio`);
  }

  actualizarEstado(
    gimnasioId: number,
    logroId: number,
    estaActivo: boolean
  ): Observable<LogroGimnasio> {
    // PUT api/LogroGimnasio/{logroId}?gimnasioId=1
    return this.http.put<LogroGimnasio>(
      `${this.baseUrl}/${gimnasioId}/logrosgimnasio/${logroId}`,
      {
        gimnasioId,
        logroId,
        estaActivo // mapea con ActualizarLogroGimnasioDTO.EstaActivo
      }
    );
  }
}
