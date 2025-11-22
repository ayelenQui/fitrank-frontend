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

  // ✔ Crear nueva medida
  agregar(dto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar`, dto);
  }

  // ✔ Actualizar medida existente
  actualizar(id: number, dto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar?id=${id}`, dto);
  }

  // ✔ Obtener una medida específica
  obtenerPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // ✔ Obtener historial del socio
  obtenerHistorial(socioId?: number): Observable<any> {
    if (socioId)
      return this.http.get(`${this.apiUrl}/historial?socioId=${socioId}`);

    // Si es socio logueado, backend infiere el ID
    return this.http.get(`${this.apiUrl}/historial`);
  }

  // ✔ Eliminar medida
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }
}
