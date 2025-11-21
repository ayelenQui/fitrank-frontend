import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Solicitud } from './interfaces/solicitud.interface';
import { AgregarProfesorDTO, ProfesorDTO, ActualizarProfesorDTO, RutinaProfesorDTO, EstadisticasProfesoresDTO } from './interfaces/profesor.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
   private apiUrl = `${environment.apiUrl}/Profesor`;

  constructor(private http: HttpClient) {}


 
  obtenerProfesores(): Observable<ProfesorDTO[]> {
    return this.http.get<ProfesorDTO[]>(this.apiUrl);
  }


  obtenerProfesorPorId(id: number): Observable<ProfesorDTO> {
    return this.http.get<ProfesorDTO>(`${this.apiUrl}/${id}`);
  }

  agregarProfesor(dto: AgregarProfesorDTO): Observable<ProfesorDTO> {
    return this.http.post<ProfesorDTO>(this.apiUrl, dto);
  }

  
  actualizarProfesor(id: number, dto: ActualizarProfesorDTO): Observable<ProfesorDTO> {
    return this.http.put<ProfesorDTO>(`${this.apiUrl}/${id}`, dto);
  }

 
  eliminarProfesor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obtenerRutinasPorProfesor(profesorId: number): Observable<RutinaProfesorDTO[]> {
    return this.http.get<RutinaProfesorDTO[]>(`${this.apiUrl}/profesor/${profesorId}`);
  }
  obtenerEstadisticas(): Observable<EstadisticasProfesoresDTO> {
    return this.http.get<EstadisticasProfesoresDTO>(`${this.apiUrl}/estadisticas`);
  }
}
