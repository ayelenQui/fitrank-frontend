import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Socio, CreateSocioRequest, UpdateSocioRequest,SocioDTO } from './interfaces/socio.interface';


@Injectable({
  providedIn: 'root'
})
export class SocioApiService {
  private apiUrl = `${environment.apiUrl}/Socio`;

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en SocioApiService:', error);
    return throwError(() => error);
  }


  createSocio(socio: CreateSocioRequest): Observable<Socio> {
    return this.http.post<Socio>(this.apiUrl, socio, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }


  getAllSocios(): Observable<Socio[]> {
    return this.http.get<Socio[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getSociosPaginated(page: number = 1, pageSize: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    
    return this.http.get<any>(this.apiUrl, { params })
      .pipe(catchError(this.handleError));
  }


  getSocioById(id: number): Observable<Socio> {
    return this.http.get<Socio>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

 
  getSocioByEmail(email: string): Observable<Socio> {
    const params = new HttpParams().set('email', email);
    return this.http.get<Socio>(`${this.apiUrl}/email`, { params })
      .pipe(catchError(this.handleError));
  }

 
  getSociosByGimnasio(gimnasioId: number): Observable<Socio[]> {
    return this.http.get<Socio[]>(`${this.apiUrl}/gimnasio/${gimnasioId}`)
      .pipe(catchError(this.handleError));
  }


  searchSociosByNombre(nombreUsuario: string): Observable<Socio[]> {
    const params = new HttpParams().set('nombreUsuario', nombreUsuario);
    return this.http.get<Socio[]>(`${this.apiUrl}/search`, { params })
      .pipe(catchError(this.handleError));
  }

  updateSocio(id: number, socio: UpdateSocioRequest): Observable<Socio> {
    return this.http.put<Socio>(`${this.apiUrl}/${id}`, socio, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }


  patchSocio(id: number, changes: Partial<UpdateSocioRequest>): Observable<Socio> {
    return this.http.patch<Socio>(`${this.apiUrl}/${id}`, changes, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  getTodosLosSocios(): Observable<SocioDTO[]> {
    return this.http.get<SocioDTO[]>(`${this.apiUrl}`);
  }


 
  obtenerPerfilCompleto(socioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/completo/${socioId}`);
  }


  actualizarPerfil(socioId: number, dto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar-perfil/${socioId}`, dto);
  }


  agregarMedida(socioId: number, dto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Socio/${socioId}/medidas`, dto);
  }

  updateFotoPerfil(id: number, fotoDePerfil: string): Observable<Socio> {
    const body = { fotoDePerfil };
    return this.http.patch<Socio>(`${this.apiUrl}/${id}/foto`, body, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }


  changePassword(id: number, currentPassword: string, newPassword: string): Observable<any> {
    const body = { currentPassword, newPassword };
    return this.http.patch<any>(`${this.apiUrl}/${id}/password`, body, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  deleteSocio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }


  deleteMultipleSocios(ids: number[]): Observable<any> {
    const body = { ids };
    return this.http.request('delete', this.apiUrl, { 
      body: body, 
      headers: this.getHttpOptions().headers 
    }).pipe(catchError(this.handleError));
  }

 
  checkEmailExists(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.http.get<boolean>(`${this.apiUrl}/check-email`, { params })
      .pipe(catchError(this.handleError));
  }


  checkUsernameExists(nombreUsuario: string): Observable<boolean> {
    const params = new HttpParams().set('nombreUsuario', nombreUsuario);
    return this.http.get<boolean>(`${this.apiUrl}/check-username`, { params })
      .pipe(catchError(this.handleError));
  }


  getSocioStats(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/stats`)
      .pipe(catchError(this.handleError));
  }
}
