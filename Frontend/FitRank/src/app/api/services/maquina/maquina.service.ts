import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Maquina {
  id: number;
  nombre: string;
  urlImagen: string;
  qr: string;
}

@Injectable({ providedIn: 'root' })
export class MaquinaService {
  private baseUrl = `${environment.apiUrl}/Maquina`;

  constructor(private http: HttpClient) { }

  obtenerTodas(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(this.baseUrl);
  }

  obtenerDetalles(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/detalles`);
  }

  agregar(body: any): Observable<Maquina> {
    return this.http.post<Maquina>(this.baseUrl, body);
  }
}
