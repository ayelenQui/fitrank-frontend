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

  // CREATE - Crear un nuevo socio
  createSocio(socio: CreateSocioRequest): Observable<Socio> {
    return this.http.post<Socio>(this.apiUrl, socio, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  // READ - Obtener todos los socios
  getAllSocios(): Observable<Socio[]> {
    return this.http.get<Socio[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // READ - Obtener socios con paginación
  getSociosPaginated(page: number = 1, pageSize: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    
    return this.http.get<any>(this.apiUrl, { params })
      .pipe(catchError(this.handleError));
  }

  // READ - Obtener un socio por ID
  getSocioById(id: number): Observable<Socio> {
    return this.http.get<Socio>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // READ - Obtener socio por email
  getSocioByEmail(email: string): Observable<Socio> {
    const params = new HttpParams().set('email', email);
    return this.http.get<Socio>(`${this.apiUrl}/email`, { params })
      .pipe(catchError(this.handleError));
  }

  // READ - Obtener socios por gimnasio
  getSociosByGimnasio(gimnasioId: number): Observable<Socio[]> {
    return this.http.get<Socio[]>(`${this.apiUrl}/gimnasio/${gimnasioId}`)
      .pipe(catchError(this.handleError));
  }

  // READ - Buscar socios por nombre de usuario
  searchSociosByNombre(nombreUsuario: string): Observable<Socio[]> {
    const params = new HttpParams().set('nombreUsuario', nombreUsuario);
    return this.http.get<Socio[]>(`${this.apiUrl}/search`, { params })
      .pipe(catchError(this.handleError));
  }

  // UPDATE - Actualizar un socio completo
  updateSocio(id: number, socio: UpdateSocioRequest): Observable<Socio> {
    return this.http.put<Socio>(`${this.apiUrl}/${id}`, socio, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  // UPDATE - Actualización parcial de un socio
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

  // ✅ Agregar nueva medida corporal
  agregarMedida(socioId: number, dto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Socio/${socioId}/medidas`, dto);
  }
  // UPDATE - Actualizar foto de perfil
  updateFotoPerfil(id: number, fotoDePerfil: string): Observable<Socio> {
    const body = { fotoDePerfil };
    return this.http.patch<Socio>(`${this.apiUrl}/${id}/foto`, body, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  // UPDATE - Cambiar contraseña
  changePassword(id: number, currentPassword: string, newPassword: string): Observable<any> {
    const body = { currentPassword, newPassword };
    return this.http.patch<any>(`${this.apiUrl}/${id}/password`, body, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  // DELETE - Eliminar un socio
  deleteSocio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // DELETE - Eliminar múltiples socios
  deleteMultipleSocios(ids: number[]): Observable<any> {
    const body = { ids };
    return this.http.request('delete', this.apiUrl, { 
      body: body, 
      headers: this.getHttpOptions().headers 
    }).pipe(catchError(this.handleError));
  }

  // UTILITY - Verificar si el email existe
  checkEmailExists(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.http.get<boolean>(`${this.apiUrl}/check-email`, { params })
      .pipe(catchError(this.handleError));
  }

  // UTILITY - Verificar si el nombre de usuario existe
  checkUsernameExists(nombreUsuario: string): Observable<boolean> {
    const params = new HttpParams().set('nombreUsuario', nombreUsuario);
    return this.http.get<boolean>(`${this.apiUrl}/check-username`, { params })
      .pipe(catchError(this.handleError));
  }

  // UTILITY - Obtener estadísticas del socio
  getSocioStats(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/stats`)
      .pipe(catchError(this.handleError));
  }
}
