import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { SignalRNotificacionesService } from '@app/api/services/notificacion/signalr-notificaciones.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private router: Router,
    private signalR: SignalRNotificacionesService
  ) { }

  isSidebarOpen = false;
  logoUrl: string | null = null;

  ngOnInit() {
    const themeStr = localStorage.getItem('gym-theme');
    if (themeStr) {
      const theme = JSON.parse(themeStr);
      this.logoUrl = theme.logoUrl || null;
    }

    this.signalR.theme$.subscribe(theme => {
      if (theme?.logoUrl !== undefined) {
        this.logoUrl = theme.logoUrl || null;
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  irAConfiguracion() {
    this.router.navigate(['/homeAdmin/config-gimnasio']);
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
