import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import Swal from 'sweetalert2';
import { SignalRNotificacionesService } from '@app/api/services/notificacion/signalr-notificaciones.service';


@Component({
  selector: 'app-header-socio',
  templateUrl: './header-socio.component.html',
  styleUrls: ['./header-socio.component.css'],
  standalone: true,
  imports: [CommonModule, DatePipe]
})
export class HeaderSocioComponent implements OnInit {
  @Input() user: any = null;
  sidebarOpen = false;
  notificacionesNuevas: number = 0;
  hayNotificacionesNuevas = false;
  mostrarPopup = false;
  notificaciones: any[] = [];

  constructor(private authService: AuthService, private router: Router, private signalRNoti : SignalRNotificacionesService  ) { }

  ngOnInit() {
    
    this.signalRNoti.notificacion$.subscribe(n => {
      console.log("HEADER recibió:", n);

      // 🟣 guardar notificación para mostrar en la campana
      this.notificaciones.unshift(n);

      // 🟣 activar badge
      this.notificacionesNuevas++;
      this.hayNotificacionesNuevas = true;

      // 🟣 Popup automático en tiempo real
      Swal.fire({
        icon: 'info',
        title: '🔔 Nueva notificación',
        text: `${n.titulo} - ${n.mensaje}`,
        timer: 2500,
        showConfirmButton: false
      });
    });

    if (!this.user) {
      this.user = this.authService.obtenerUser();
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    const sidebar = document.querySelector('.fit-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (this.sidebarOpen) {
      sidebar?.classList.add('open');
      overlay?.classList.add('visible');
    } else {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('visible');
    }
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
    const sidebar = document.querySelector('.fit-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    sidebar?.classList.remove('open');
    overlay?.classList.remove('visible');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navegarA(ruta: string) {
    this.router.navigate([ruta]).catch((err) => console.error(err));
  }

  irAlHome(): void {
    this.router.navigate(['/home/home-socio']).catch((err) => console.error(err));
  }
  abrirNotificaciones() {
    this.hayNotificacionesNuevas = false;
    this.notificacionesNuevas = 0;
    this.mostrarPopup = !this.mostrarPopup; 
    // abrir popup o sidebar de notificaciones
  }

}
