import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Solicitud } from './interfaces/solicitud.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
   private apiUrl = `${environment.apiUrl}/Solicitudes`;

  constructor(private http: HttpClient) {}

  obtenerTodasLasSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.apiUrl);
  }
}