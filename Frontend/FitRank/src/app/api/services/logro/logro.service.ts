import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogroRest } from './interfaces/logro.rest';
import { LogroCrearRest } from './interfaces/logro.crear.rest';
import { LogroUsuarioDto } from '../socio/interfaces/socio-logro.rest';

@Injectable({ providedIn: 'root' })
export class LogroService {
    private baseUrl ='https://localhost:7226/api'
  private http = inject(HttpClient);

  listar(): Observable<LogroRest[]> {
    return this.http.get<LogroRest[]>(`${this.baseUrl}/logro`);
  }

  crear(payload: LogroCrearRest): Observable<number | unknown> {
    return this.http.post(`${this.baseUrl}`, payload);
  }

  misLogros(socioId: number, gimnasioId: number): Observable<LogroUsuarioDto[]>{
    return this.http.get<LogroUsuarioDto[]>(`${this.baseUrl}/socios/${socioId}/gimnasios/${gimnasioId}/logros`);
  }
}