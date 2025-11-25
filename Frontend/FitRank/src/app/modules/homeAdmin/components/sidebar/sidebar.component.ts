import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  isSidebarOpen = false;


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

 
  items = [
    { label: 'Dashboard', route: 'resumen' },
    { label: 'Socios', route: 'socios' },
    { label: 'Profesores', route: 'profesores' },
    { label: 'Pagos', route: 'pagos' },
    { label: 'Ranking', route: 'ranking' },
    { label: 'Accesos QR', route: 'accesos' },
    { label: 'Notificaciones', route: 'notificaciones' },
    { label: 'Abandono', route: 'abandono' },
    { label: 'Logros', route: 'logros-admin' },
    { label: 'Máquinas y Ejercicios', route: 'maquina-ejercicio' },
    { label: 'Personalizacion', route: 'configuracion-gimnasio' },
    { label: 'Reportes', route: 'reportes-admin' }
  ];
}

