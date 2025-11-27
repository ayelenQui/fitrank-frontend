import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import Swal from 'sweetalert2';
import { SignalRNotificacionesService } from '@app/api/services/notificacion/signalr-notificaciones.service';

@Component({
  selector: 'app-header-profesor',
  templateUrl: './header-profesor.component.html',
  styleUrls: ['./header-profesor.component.css'],
  imports: [CommonModule, DatePipe],  
  standalone: true,
})
export class HeaderProfesorComponent implements OnInit {
  @Input() user: any = null;
  @Output() menuToggle = new EventEmitter<void>();
  notificacionesNuevas: number = 0;
  hayNotificacionesNuevas = false;
  mostrarPopup = false;
  notificaciones: any[] = [];
  menuAbierto = false;
  constructor(private authService: AuthService, private router: Router, private signalRNoti: SignalRNotificacionesService) { }

  ngOnInit(): void {

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
  }

  toggleSidebar(): void {
    this.menuToggle.emit();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  irAlHome(): void {
    this.router.navigate(['/home/home-socio']); 
  }

  irA(ruta: string): void {
    this.router.navigate([ruta]);
  }
  abrirNotificaciones() {
    this.hayNotificacionesNuevas = false;
    this.notificacionesNuevas = 0;
    this.mostrarPopup = !this.mostrarPopup;
    
  }


  toggleMobileMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

}
