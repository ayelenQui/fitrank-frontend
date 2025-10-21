import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service'; 
@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  
  [x: string]: any;
  sociosActivos = 250;
  clasesEnCurso = 15;
  ingresos = 12500;

  ranking = [
    { nombre: 'Carlos', puntos: 1200 },
    { nombre: 'Sofía', puntos: 1150 },
    { nombre: 'Diego', puntos: 1100 },
  ];

  abandonos = [
    { nombre: 'Laura', dias: 30 },
    { nombre: 'Martín', dias: 45 },
    { nombre: 'Ana', dias: 60 },
  ];

  notificaciones = [
    { tipo: 'Clase', mensaje: 'Nueva clase de yoga disponible' },
    { tipo: 'Socio', mensaje: 'Nuevo socio registrado' },
  ];

  actividad = [
    { nombre: 'Juan', accion: 'Ingreso', hora: '10:00 AM' },
    { nombre: 'María', accion: 'Clase de spinning', hora: '10:15 AM' },
    { nombre: 'Pedro', accion: 'Salida', hora: '11:30 AM' },
  ];
  irAGenerarInvitacion() {
    this.router.navigate(['/admin-invitacion']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}


