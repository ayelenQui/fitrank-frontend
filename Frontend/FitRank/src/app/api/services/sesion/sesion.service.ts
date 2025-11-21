import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private apiUrl = `${environment.apiUrl}/Sesion`;

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
