import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AgregarEjercicioDTO, EjercicioDTO } from "./interfaces/ejercicio.interface";

@Injectable({ providedIn: 'root' })
export class EjercicioService {
  private baseUrl = `${environment.apiUrl}/Ejercicio`;

  constructor(private http: HttpClient) { }

  // Traer todos los ejercicios
  getAll(): Observable<EjercicioDTO[]> {
    return this.http.get<EjercicioDTO[]>(this.baseUrl);
  }

  // Traer un ejercicio por ID
  getById(id: number): Observable<EjercicioDTO> {
    return this.http.get<EjercicioDTO>(`${this.baseUrl}/${id}`);
  }

  // Crear nuevo ejercicio
  create(ejercicio: AgregarEjercicioDTO): Observable<EjercicioDTO> {
    return this.http.post<EjercicioDTO>(this.baseUrl, ejercicio);
  }

  // Actualizar un ejercicio existente
  update(id: number, ejercicio: AgregarEjercicioDTO): Observable<EjercicioDTO> {
    return this.http.put<EjercicioDTO>(`${this.baseUrl}/${id}`, ejercicio);
  }
}
