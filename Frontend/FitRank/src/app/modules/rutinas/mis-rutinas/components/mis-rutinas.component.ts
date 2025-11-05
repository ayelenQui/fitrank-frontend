import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { AfterViewInit } from '@angular/core';
import { Location } from '@angular/common'; 
import gsap from 'gsap';
@Component({
  selector: 'app-mis-rutinas',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderSocioComponent],
  templateUrl: './mis-rutinas.component.html',
  styleUrls: ['./mis-rutinas.component.css', '../../../css-socio/socio-common.css']
})
export class MisRutinasComponent implements OnInit, AfterViewInit {
  rutinas: any[] = [];
  loading = true;
  error = '';
  userId?: number;

  // 📈 Datos para la sección lateral (Progreso / Próximas sesiones)
  sesionesCompletadas: number = 0;
  totalSesiones: number = 0;

  proximasSesiones: {
    dia: string;
    numero: number;
    nombreRutina: string;
    hora: string;
  }[] = [];

  totalRutinas: number = 0;
  rutinasActivas: number = 0;
  rutinasInactivas: number = 0;

  constructor(
    private rutinaService: RutinaService,
    private auth: AuthService,
    private router: Router,
    private location: Location
  ) { }
    ngAfterViewInit() {
    gsap.fromTo(
    '.titulo',
    { y: -30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
  );

  gsap.fromTo(
    '.subtitulo',
    { y: -15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, delay: 0.2, ease: 'power3.out' }
  );

  // Animación tarjetas
  gsap.fromTo(
    '.card',
    { y: 20, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.15, delay: 0.4, ease: 'power3.out' }
  );

  gsap.fromTo(
    '.btn-empezar',
    { scale: 0.85, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.4, delay: 0.8, ease: 'power3.out' }
  );

  const boton = document.querySelector('.btn-empezar');
    boton?.addEventListener('mouseenter', () => {
    gsap.to(boton, { scale: 1.1, duration: 0.1, ease: 'power1.out' });
  });
  boton?.addEventListener('mouseleave', () => {
    gsap.to(boton, { scale: 1, duration: 0.1, ease: 'power1.out' });
  });

  }
  

  ngOnInit(): void {
    // Demo de progreso semanal
    this.sesionesCompletadas = 3;
    this.totalSesiones = 5;

    // Demo de próximas sesiones
    this.proximasSesiones = [
      { dia: 'MIE', numero: 6, nombreRutina: 'Piernas y Glúteos', hora: '18:00 hs' },
      { dia: 'VIE', numero: 8, nombreRutina: 'Full Body', hora: '19:00 hs' },
      { dia: 'DOM', numero: 10, nombreRutina: 'Cardio HIIT', hora: '10:00 hs' },
    ];
   

    const user = this.auth.obtenerUser();
    this.userId = user?.Id || user?.id;

    if (!this.userId) {
      this.error = 'No se pudo obtener el usuario. Iniciá sesión nuevamente.';
      this.router.navigate(['/login']);
      return;
    }
  

    this.cargarRutinas();
  }

  cargarRutinas(): void {
    this.loading = true;

    this.rutinaService.getRutinasPorSocio(this.userId!).subscribe({
      next: (data) => {
        console.log('📦 Rutinas del socio logueado:', data);
        this.rutinas = data || [];
        this.loading = false;

        this.actualizarContadores();
      },
      error: (err) => {
        console.error('❌ Error cargando rutinas:', err);
        this.error = 'No se pudieron cargar tus rutinas.';
        this.loading = false;
      }


    });

  }
  actualizarContadores(): void {
    this.totalRutinas = this.rutinas.length;
    this.rutinasActivas = this.rutinas.filter((r) => r.activa === true).length;
    this.rutinasInactivas = this.rutinas.filter((r) => r.activa === false).length;
  }



  iniciarRutina(rutina: any): void {
    if (!rutina.id) {
      console.warn('⚠️ No se encontró el ID de la rutina:', rutina);
      return;
    }
    this.router.navigate(['/rutina/iniciar-rutina', rutina.id]);
  }

  crearRutina(): void {
    this.router.navigate(['/rutina/crear-manual']);
  }

  eliminarRutina(id: number): void {
    if (!confirm('¿Seguro que querés eliminar esta rutina?')) return;
    this.rutinaService.eliminar(id).subscribe({
      next: () => {
        this.rutinas = this.rutinas.filter(r => r.id !== id);
        this.actualizarContadores(); // 🔹 recalcular totales
      },
      error: (err) => console.error('Error al eliminar rutina:', err)
    });
  }


  volverAtras(): void {
    this.location.back();
  }
}
