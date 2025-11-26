import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProfesorService } from '@app/api/services/profesor/ProfesorService';
import gsap from 'gsap';
import { FilterRutinasPipe } from '@app/filter-rutinas-pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-rutinas',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderSocioComponent, FilterRutinasPipe],
  templateUrl: './mis-rutinas.component.html',
  styleUrls: ['./mis-rutinas.component.css', '../../../css-socio/socio-common.css']
})
export class MisRutinasComponent implements OnInit, AfterViewInit {
  rutinas: any[] = [];
  loading = true;
  error = '';
  userId?: number;
  rol?: string;
  mostrarInactivas = false;

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
    private location: Location,
    private profesorService: ProfesorService,
    private cdr: ChangeDetectorRef
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
  
    this.sesionesCompletadas = 3;
    this.totalSesiones = 5;


    this.proximasSesiones = [
      { dia: 'MIE', numero: 6, nombreRutina: 'Piernas y Glúteos', hora: '18:00 hs' },
      { dia: 'VIE', numero: 8, nombreRutina: 'Full Body', hora: '19:00 hs' },
      { dia: 'DOM', numero: 10, nombreRutina: 'Cardio HIIT', hora: '10:00 hs' },
    ];
   

    const user = this.auth.obtenerUser();
    this.userId = user?.id ?? user?.Id;
    this.rol = user?.rol?.toLowerCase();

    if (!this.userId || !this.rol) {
      this.error = 'No se pudo obtener la sesión. Iniciá sesión nuevamente.';
      this.router.navigate(['/login']);
      return;
    }

  
    if (this.rol === 'socio') {
      this.cargarRutinas();
    } else if (this.rol === 'profesor') {
      this.cargarRutinasProfesor();
    }
  }
  

  cargarRutinas(): void {
    this.loading = true;

    this.rutinaService.getRutinasPorSocio(this.userId!).subscribe({
      next: (data) => {
        console.log('📦 Rutinas del socio logueado:', data);
        
        this.rutinas = (data || []).map(r => ({
          ...r,
          esFavorita: r.favorita,
           tieneSesiones: r.tieneSesiones ?? false
        }));
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
    if (!rutina.tieneSesiones) {
      Swal.fire({
        icon: 'warning',
        title: 'Faltan sesiones',
        text: 'Esta rutina no tiene sesiones cargadas. Agregalas para poder empezar.',
        confirmButtonColor: '#8B52FF'
      });
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
        this.actualizarContadores(); 
      },
      error: (err) => console.error('Error al eliminar rutina:', err)
    });
  }

  cargarRutinasProfesor(): void {
    this.loading = true;

    this.profesorService.obtenerRutinasPorProfesor(this.userId!).subscribe({
      next: (data) => {
        console.log('📘 Rutinas creadas por el profesor:', data);
        this.rutinas = data || [];
        this.actualizarContadores();
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error cargando rutinas del profesor:', err);
        this.error = 'No se pudieron cargar las rutinas creadas.';
        this.loading = false;
      }
    });
  }

  toggleFavorita(rutina: any) {
  rutina.esFavorita = !rutina.esFavorita;  // cambio visual inmediato

  this.rutinaService.cambiarFavorita(rutina.id, rutina.esFavorita).subscribe({
    next: () => {
      rutina.favorita = rutina.esFavorita; // sincronizar con backend
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error("Error al cambiar favorito:", err);

      // revertir si falla
      rutina.esFavorita = !rutina.esFavorita;
    }
  });
}



toggleActiva(rutina: any) {

  const titulo = rutina.activa
    ? "¿Desactivar rutina?"
    : "¿Activar rutina?";

  const texto = rutina.activa
    ? "¿Seguro que querés desactivar esta rutina?"
    : "¿Querés volver a activarla?";

  Swal.fire({
    title: titulo,
    text: texto,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: rutina.activa ? "Desactivar" : "Activar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6'
  }).then((result) => {

    if (!result.isConfirmed) return;

    const nuevoEstado = !rutina.activa;

    this.rutinaService.cambiarEstado(rutina.id, nuevoEstado).subscribe({
      next: () => {

        rutina.activa = nuevoEstado;
        this.actualizarContadores();

        Swal.fire({
          icon: "success",
          title: nuevoEstado ? "Rutina activada" : "Rutina desactivada",
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (err) => {
        console.error("Error al cambiar estado:", err);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al cambiar el estado.",
          confirmButtonColor: '#d33'
        });
      }
    });

  });
}


  volverAtras(): void {
    this.location.back();
  }
}
