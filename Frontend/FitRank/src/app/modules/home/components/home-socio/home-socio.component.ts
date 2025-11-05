import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swal from 'sweetalert2';
import { NotificacionDTO } from '../../../../api/services/notificacion/interface/notificacion.interface';
import { NotificacionService } from '../../../../api/services/notificacion/notificacion.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home-socio',
  templateUrl: './home-socio.component.html',
  styleUrls: ['./home-socio.component.css'],
  standalone: true,
  imports: [HeaderSocioComponent, CommonModule]
})
export class HomeSocioComponent implements OnInit, AfterViewInit {
  user: any = null;
  mostrarRetencion = false;
  notificacion: NotificacionDTO | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificacionService: NotificacionService
  ) { }

  ngAfterViewInit() {
    gsap.from('.titulo', {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: 'power3.out'
    });

    gsap.from('.boton', {
      duration: 0.8,
      opacity: 0,
      scale: 0.8,
      stagger: 0.2,
      delay: 0.5
    });

    // Animaciones al hacer scroll
    gsap.utils.toArray('.tarjeta').forEach((tarjeta: any) => {
      gsap.from(tarjeta, {
        scrollTrigger: {
          trigger: tarjeta,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  }

  ngOnInit() {
    this.user = this.authService.obtenerUser();

    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.authService.isAdmin()) {
      this.router.navigate(['/homeAdmin']);
      return;
    }

    // 🔹 Cargar notificaciones del socio
    const token = this.authService.obtenerToken();
    if (token) {
      this.notificacionService.getMisNotificaciones(token).subscribe({
        next: (res) => {
          const lista = res.notificaciones || []; // Accedemos al array dentro del objeto
          const retencion = lista.find(n =>
            n.titulo.includes('FitRank') && !n.leido && n.activa
          );

          if (retencion) {
            this.notificacion = retencion;
            this.mostrarRetencion = true;
          }
        },
        error: (err) => console.error('Error al obtener notificaciones:', err)
      });
    }
  }

  responder(opcion: string) {
    let mensaje = '';

    switch (opcion) {
      case 'cambiar-rutina':
        mensaje = '💪 Un profesor te ayudará a ajustar tu rutina.';
        break;
      case 'estoy-bien':
        mensaje = '😎 Nos alegra saber que todo va bien.';
        break;
      case 'contactar-profesor':
        mensaje = '📞 Un entrenador se pondrá en contacto con vos pronto.';
        break;
    }

    Swal.fire({
      title: '¡Gracias!',
      text: mensaje,
      icon: 'success',
      confirmButtonColor: '#8c52ff'
    });

    // 🔹 Marcar la notificación como leída
    const token = this.authService.obtenerToken();
    if (token && this.notificacion) {
      this.notificacionService.marcarComoLeida(token, this.notificacion.id).subscribe();
    }

    this.mostrarRetencion = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navegarA(ruta: string) {
    this.router.navigate([ruta]);
  }
}
