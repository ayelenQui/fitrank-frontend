
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
            CuotaPagadaHasta: response.user.cuotaPagadaHasta,
            GimnasioId: response.user.gimnasioId ?? response.user.GimnasioId ?? null
          };
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(mappedUser));


        }
      })
    );
  }

isAdmin(): boolean {
  const user = this.obtenerUser();
  return !!user?.rol && user.rol.toLowerCase() === 'admin';
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
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

 obtenerUser(): any {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    const u = JSON.parse(userStr);
    // Normalizo claves para que el resto del código use camelCase
    return {
      id: u.id ?? u.Id ?? null,
      nombre: u.nombre ?? u.Nombre ?? null,
      apellidos: u.apellidos ?? u.Apellidos ?? null,
      username: u.username ?? u.Username ?? null,
      rol: (u.rol ?? u.Rol ?? '').toString(),
      cuotaPagadaHasta: u.cuotaPagadaHasta ?? u.CuotaPagadaHasta ?? null,
      // si alguna vez guardás nivel:
      nivel: u.nivel ?? u.Nivel ?? null,
      gimnasioId: u.gimnasioId ?? u.GimnasioId ?? null
    };
  } catch {
    return null;
  }
}


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  
  isLoggedIn(): boolean {
    return !!this.obtenerToken();
  }


}
