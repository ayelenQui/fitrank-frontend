import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Participante {
  nombre: string;
  puntaje: number;
}

export interface Torneo {
  id: number;
  nombre: string;
  participantes?: Participante[];
}

@Injectable({
  providedIn: 'root'
})
export class TorneosService {

  private baseUrl = `${environment.apiUrl}/torneos`;

  constructor(private http: HttpClient) { }

  crearTorneo(nombre: string): Observable<Torneo> {
    return this.http.post<Torneo>(`${this.baseUrl}`, { nombre });
  }

  agregarParticipante(torneoId: number, participante: Participante): Observable<Participante[]> {
    return this.http.post<Participante[]>(`${this.baseUrl}/${torneoId}/participantes`, participante);
  }

  obtenerRanking(torneoId: number): Observable<Participante[]> {
    return this.http.get<Participante[]>(`${this.baseUrl}/${torneoId}/ranking`);
  }

  listarTorneos(): Observable<Torneo[]> {
    return this.http.get<Torneo[]>(this.baseUrl);
  }
}
