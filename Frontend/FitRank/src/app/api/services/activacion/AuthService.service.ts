
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';  // guarda token después de login

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7226/api/auth';  
  constructor(private http: HttpClient) { }

 
  registerWithInvitacion(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register-invitacion`, data);
  }

  validarTokenActivacion(token: string): Observable<{ valido: boolean; mensaje?: string }> {
    const body = { token };
    return this.http.post<{ valido: boolean; mensaje?: string }>(`${this.baseUrl}/validar-activacion`, body);
  }

  activarCuenta(token: string, password: string): Observable<{ email: string; mensaje: string }> {
    const body = { token, password };
    return this.http.post<{ email: string; mensaje: string }>(`${this.baseUrl}/activar-cuenta`, body);
  }


  login(email: string, password: string): Observable<{ token: string; user: any }> {
    const body = { email, password };
    return this.http.post<{ token: string; user: any }>(`${this.baseUrl}/login`, body).pipe(
      tap(response => {
       
        if (response.token) {
          localStorage.setItem('jwt_token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
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
  isAdmin(): boolean {
    const user = this.obtenerUser();
    return user?.role === 'Admin';
  }
}
