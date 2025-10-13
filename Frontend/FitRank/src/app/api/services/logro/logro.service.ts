import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogroRest } from './interfaces/logro.rest';
import { LogroCrearRest } from './interfaces/logro.crear.rest';

@Injectable({ providedIn: 'root' })
export class LogroService {
    private baseUrl ='https://localhost:7226/api/logro'
  private http = inject(HttpClient);

  listar(): Observable<LogroRest[]> {
    return this.http.get<LogroRest[]>(`${this.baseUrl}`);
  }

  crear(payload: LogroCrearRest): Observable<number | unknown> {
// Si tu API devuelve el id creado (CreatedAtAction), podrías tiparlo como { id: number } o similar.
return this.http.post(`${this.baseUrl}`, payload);
}
}