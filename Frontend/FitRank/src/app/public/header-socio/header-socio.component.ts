import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import Swal from 'sweetalert2';
import { SignalRNotificacionesService } from '@app/api/services/notificacion/signalr-notificaciones.service';
import { SidebarSocioComponent } from '@app/public/sidebar-socio/sidebar-socio.component';
import { SocioApiService } from '@app/api/services/socio/socioApiService';
@Component({
  selector: 'app-header-socio',
  templateUrl: './header-socio.component.html',
  styleUrls: ['./header-socio.component.css'],
  standalone: true,
  imports: [CommonModule, DatePipe, SidebarSocioComponent]
})
export class HeaderSocioComponent implements OnInit {
  @Input() user: any = null;
  sidebarOpen = false;
  notificacionesNuevas: number = 0;
  hayNotificacionesNuevas = false;
  mostrarPopup = false;
  notificaciones: any[] = [];
  logoUrl: string | null = null;

  socio: any = null;


  constructor(private authService: AuthService, private router: Router, private signalRNoti: SignalRNotificacionesService, private socioservice: SocioApiService) { }

  ngOnInit() {


    const themeStr = localStorage.getItem('gym-theme');
    if (themeStr) {
      const theme = JSON.parse(themeStr);
      this.logoUrl = theme.logoUrl || null;
    }


    this.signalRNoti.theme$.subscribe(theme => {
      if (theme) {
        this.logoUrl = theme.logoUrl || null;
      }
    });


    this.signalRNoti.notificacion$.subscribe(n => {
      this.notificaciones.unshift(n);

      this.notificacionesNuevas++;
      this.hayNotificacionesNuevas = true;

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

  this.socioservice.getSocioById(this.user.id).subscribe({
    next: (socio) => {
      this.socio = { socio }; // socio.fotoUrl viene directo acá
    },
    error: (err) => console.error("Error cargando socio:", err)
  });


      this.cargarDtosSocios();
    
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

  }

  cargarDtosSocios() {
    this.socioservice.obtenerPerfilCompleto(this.user.id).subscribe({
      next: (dtos) => {
        this.socio = { socio: dtos };  
      },
      error: (err) => {
        console.error('Error al obtener los DTOs del socio:', err);
      }
    });

  }
}
