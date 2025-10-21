import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AgregarEjercicioDTO, EjercicioDTO } from "./interfaces/ejercicio.interface";

@Injectable({
  providedIn: 'root'
})

export class EjercicioService{
    private apiUrl = `${environment.apiUrl}/ejercicio`;

    constructor(private http: HttpClient){}

  getAll(): Observable<EjercicioDTO[]> {
    return this.http.get<EjercicioDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<EjercicioDTO> {
    return this.http.get<EjercicioDTO>(`${this.apiUrl}/${id}`);
  }

  create(ejercicio: AgregarEjercicioDTO): Observable<EjercicioDTO> {
    return this.http.post<EjercicioDTO>(this.apiUrl, ejercicio);
  }

  update(id: number, ejercicio: EjercicioDTO): Observable<EjercicioDTO> {
    return this.http.put<EjercicioDTO>(`${this.apiUrl}/${id}`, ejercicio);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}