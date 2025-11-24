import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogrosGimnasioService {

  private baseUrl = environment.apiUrl + '/gimnasios';

  constructor(private http: HttpClient) { }

  
  obtenerLogros(gimnasioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${gimnasioId}/logrosgimnasio`);
  }


  actualizarLogro(gimnasioId: number, logroId: number, payload: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/${gimnasioId}/logrosgimnasio/${logroId}`,
      payload
    );
  }
}
