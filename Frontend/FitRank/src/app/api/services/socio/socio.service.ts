import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Socio {
  id: number;
  nombre: string;
  email: string;
  membresia: string;
  estado: 'Activo' | 'Inactivo';
  puntos: number;
  fechaAlta: string;
  avatar: string;
}

@Injectable({ providedIn: 'root' })
export class SocioService {
  private socios: Socio[] = [
    {
      id: 1,
      nombre: 'Carlos López',
      email: 'carlos@example.com',
      membresia: 'Premium',
      estado: 'Activo',
      puntos: 1250,
      fechaAlta: '2024-01-10',
      avatar: 'assets/img/avatar1.png'
    },
    {
      id: 2,
      nombre: 'Sofía Rodríguez',
      email: 'sofia@example.com',
      membresia: 'Estándar',
      estado: 'Activo',
      puntos: 980,
      fechaAlta: '2024-03-21',
      avatar: 'assets/img/avatar2.png'
    },
    {
      id: 3,
      nombre: 'Diego Pérez',
      email: 'diego@example.com',
      membresia: 'Básico',
      estado: 'Inactivo',
      puntos: 450,
      fechaAlta: '2023-11-05',
      avatar: 'assets/img/avatar3.png'
    }
  ];

  getSocios(): Observable<Socio[]> {
    return of(this.socios);
  }

  getSocioById(id: number): Observable<Socio | undefined> {
    return of(this.socios.find(s => s.id === id));
  }
}
