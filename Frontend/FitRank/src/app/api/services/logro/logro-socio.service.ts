import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LogroSocio {
  logroId: number;
  nombre: string;
  nombreClave: string;
  descripcion: string;
  imagen: string;
  fechaOtorgado?: string | Date;
  puntos: number;
}

@Injectable({
  providedIn: 'root'
})
export class LogrosSocioService {

  private baseUrl = `${environment.apiUrl}/socios`; // api/LogroSocio

  constructor(private http: HttpClient) {}

  obtenerLogrosObtenidos(socioId: number, gimnasioId: number): Observable<LogroSocio[]> {
    // GET api/LogroSocio?socioId=1&gimnasioId=2
    return this.http.get<LogroSocio[]>(
      `${this.baseUrl}/${socioId}/gimnasios/${gimnasioId}/logrossocio`
    );
  }
}
