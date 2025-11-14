import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { SocioApiService } from "../../../../api/services/socio/socioApiService"
import { Socio as SocioType } from "../../../../api/services/socio/interfaces/socio.interface"
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swal from 'sweetalert2';
import { NotificacionDTO } from '../../../../api/services/notificacion/interface/notificacion.interface';
import { NotificacionService } from '../../../../api/services/notificacion/notificacion.service';
import { Socio } from '@app/api/services/socio/socio.service';
import { HeaderProfesorComponent } from '@app/public/header-profesor/header-profesor-component';
import { SignalRNotificacionesService } from '@app/api/services/notificacion/signalr-notificaciones.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home-socio',
  templateUrl: './home-socio.component.html',
  styleUrls: ['./home-socio.component.css'],
  standalone: true,
  imports: [HeaderSocioComponent, CommonModule, HeaderProfesorComponent]
})
export class HomeSocioComponent implements OnInit, AfterViewInit {
  user: any = null;
  mostrarRetencion = false;
  notificacion: NotificacionDTO | null = null;

  socio: SocioType | null = null;
  esProfesor = false;

  personasDentro: number = 0;

  ocupacion: Array<{
    nombre: string;
    foto: string | null;
    fecha: Date;
    tipo: 'entrada' | 'salida';
  }> = [];


  constructor(
    private authService: AuthService,
    private router: Router,
    private notificacionService: NotificacionService,
    private socioService: SocioApiService,
    private signalRNoti: SignalRNotificacionesService
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
    this.signalRNoti.iniciarConexion();

    this.signalRNoti.notificacion$.subscribe(n => {
        
      // Podés además actualizar una lista local o un contador
      Swal.fire({
        icon: 'info',
        title: '🔔 Nueva notificación',
        text: `${n.titulo} - ${n.mensaje}`,
        timer: 2500,
        showConfirmButton: false
      });
    });

    this.signalRNoti.ocupacion$.subscribe(evento => {
      if (!evento) return;

      if (evento.tipo === "entrada") {
        this.personasDentro++;
      }
      if (evento.tipo === "salida") {
        this.personasDentro--;
      }

      this.ocupacion.unshift({
        nombre: evento.nombre,
        foto: evento.foto,
        fecha: new Date(evento.fecha),
        tipo: evento.tipo
      });
    });




    this.user = this.authService.obtenerUser();

    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }
    const rol = this.user.rol?.toLowerCase();
    if (this.authService.isAdmin()) {
      this.router.navigate(['/homeAdmin']);
      return;
    }
    this.esProfesor = rol === 'profesor';

    if (!this.esProfesor) {
      //cargar socio con servicio API
      this.socioService.getSocioById(this.user.id).subscribe({
        next: (socio: SocioType) => {
          this.socio = socio;
        },
        error: (err) => {
          console.error('Error al cargar socio:', err);
        }
      });
    }
    // 🔹 Cargar notificaciones del socio
    const token = this.authService.obtenerToken();
    if (token) {
      this.notificacionService.getMisNotificaciones().subscribe({
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
      this.notificacionService.marcarComoLeida( this.notificacion.id).subscribe();
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
