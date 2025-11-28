import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenApiService {

  private apiUrl = `${environment.apiUrl}/Imagen`;

  constructor(private http: HttpClient) { }

  subirImagen(archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append("Archivo", archivo); 

    return this.http.post(`${this.apiUrl}/subir`, formData);
  }
}
