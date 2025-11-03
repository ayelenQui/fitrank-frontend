
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';  // guarda token después de login

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7226/api/Auth';  
  constructor(private http: HttpClient) { }

  login(Email: string, Password: string): Observable<{ token: string; user: any }> {
    const body = { Email, Password };
    return this.http.post<{ token: string; user: any }>(`${this.baseUrl}/login`, body).pipe(
      tap(response => {
        if (response.token) {
          const mappedUser = {
            Id: response.user.id,
            Nombre: response.user.nombre,
            Apellidos: response.user.apellidos,
            Username: response.user.username,
            Rol: response.user.rol,
            CuotaPagadaHasta: response.user.cuotaPagadaHasta
          };
          localStorage.setItem('jwt_token', response.token);
          localStorage.setItem('user', JSON.stringify(mappedUser));


        }
      })
    );
  }

  isAdmin(): boolean {
    const user = this.obtenerUser();
    if (user && user.Rol) {
      console.log('Rol del usuario:', user.Rol); 
      return user.Rol.toLowerCase() === 'admin'; 
    }
    return false;
  }

 
  registerWithInvitacion(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register-invitacion`, data);
  }


  validarTokenActivacion(token: string): Observable<{ valido: boolean; mensaje?: string }> {
    const body = { token };
    return this.http.post<{ valido: boolean; mensaje?: string }>(
      `${this.baseUrl}/validar-activacion`,
      body
    );
  }


  activarCuenta(token: string, password: string): Observable<{ email: string; mensaje: string }> {
    const body = { token, password };
    return this.http.post<{ email: string; mensaje: string }>(
      `${this.baseUrl}/activar-cuenta`,
      body
    );
  }


  
  guardarToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  obtenerUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
  }

  
  isLoggedIn(): boolean {
    return !!this.obtenerToken();
  }


}
