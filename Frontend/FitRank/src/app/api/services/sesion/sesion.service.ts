import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private apiUrl = 'https://localhost:7226/api/Sesion';

  constructor(private http: HttpClient) { }

 
  obtenerTodas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerPorRutina(rutinaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/por-rutina/${rutinaId}`);
  }

  
  crear(dto: { nombre: string; numeroDeSesion: number; rutinaId: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
