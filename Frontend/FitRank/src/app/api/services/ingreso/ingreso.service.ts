import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingreso } from './ingreso.interface';
import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  private url = `${environment.apiUrl}/Ingreso`;

  constructor(private http: HttpClient) { }

  obtenerPorGimnasio(): Observable<Ingreso[]> {
    return this.http.get<Ingreso[]>(`${this.url}/gimnasio`);
  }
}
