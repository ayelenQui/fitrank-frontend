import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, map} from "rxjs";
import { AgregarEjercicioAsignadoDTO, EjercicioAsignadoDTO } from "../ejercicioAsignado/interfaces/ejercicioAsignado.interface.rest";
import { environment } from "../../../../src/environments/environment";
@Injectable({
  providedIn: 'root'
})

export class EjercicioAsignadoService {
  private apiUrl = environment.apiUrl + '/EjercicioAsignado';
  constructor(private http: HttpClient) { }
  getEjerciciosAsignados(): Observable<EjercicioAsignadoDTO[]> {
    return this.http.get<EjercicioAsignadoDTO[]>(this.apiUrl);
  }
  getEjercicioAsignadoById(id: number): Observable<EjercicioAsignadoDTO> {
    return this.http.get<EjercicioAsignadoDTO>(`${this.apiUrl}/${id}`);
  }
  createEjercicioAsignado(ejercicioAsignado: AgregarEjercicioAsignadoDTO): Observable<AgregarEjercicioAsignadoDTO> {
    return this.http.post<AgregarEjercicioAsignadoDTO>(this.apiUrl, ejercicioAsignado);
  }
  updateEjercicioAsignado(id: number, ejercicioAsignado: AgregarEjercicioAsignadoDTO): Observable<AgregarEjercicioAsignadoDTO> {
    return this.http.put<AgregarEjercicioAsignadoDTO>(`${this.apiUrl}/${id}`, ejercicioAsignado);
  }
  deleteEjercicioAsignado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getByRutinaId(rutinaId: number): Observable<EjercicioAsignadoDTO[]> {
    return this.http.get<EjercicioAsignadoDTO[]>(this.apiUrl).pipe(
      map(ejercicios => ejercicios.filter(e => e.rutinaId === rutinaId))
    );
  }

}
