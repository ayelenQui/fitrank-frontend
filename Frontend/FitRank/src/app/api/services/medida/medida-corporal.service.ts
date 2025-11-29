import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedidaCorporalService {

  private apiUrl = `${environment.apiUrl}/MedidaCorporal`;

  constructor(private http: HttpClient) { }

  agregar(dto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar`, dto);
  }

  actualizar(id: number, dto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar?id=${id}`, dto);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  obtenerHistorial(socioId?: number): Observable<any> {
    if (socioId)
      return this.http.get(`${this.apiUrl}/historial?socioId=${socioId}`);

    return this.http.get(`${this.apiUrl}/historial`);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }
}
