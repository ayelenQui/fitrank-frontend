import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { RutinaDTO } from '@app/api/services/rutina/interfaces/rutina.interface.rest';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import { Router } from '@angular/router';
import { VisitanteHomeNavbar } from '../../../public/visitante-home-navbar/visitante-home-navbar';
import { Location } from '@angular/common';
import gsap from 'gsap';


@Component({
  selector: 'app-mis-rutinas',
  imports: [CommonModule,          // ngIf,ngFor, pipes
    RouterModule,          // routerLink
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    VisitanteHomeNavbar , CommonModule],
  templateUrl: './mis-rutinas.html',
  standalone: true,
  styleUrls: ['./mis-rutinas.css', '../../css-socio/socio-common.css'],
})

export class MisRutinasComponent implements OnInit{
  constructor(
    private authService: AuthService, 
    private rutinaService : RutinaService, 
    private location: Location
  ) { }
  
  userId?: number;
  rutinas: RutinaDTO[] = [];
  router: Router = new Router();

  ngOnInit(): void {
    const user = this.authService.obtenerUser();
    console.log('🔍 Usuario obtenido del AuthService:', user);

    if(user && user.Id) {
      this.userId = user.Id;
      this.cargarRutinas();
      console.log('✅ Usuario logueado:', user);
    } else{
        {
          console.warn('⚠️ No se encontró usuario logueado en localStorage');
        }
        console.log('🔍 ID de usuario para cargar rutinas:', this.userId);
      }
    }

    ngAfterViewInit(): void {
      const tl = gsap.timeline();
      tl.fromTo(
        ".titulo",
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      );
      tl.fromTo(
        ".btn-principal",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.3"
      );
    }

  cargarRutinas(): void {
    if (!this.userId) return;
    console.log('✅ ID del usuario:', this.userId);
    this.rutinaService.listarRutinasPorUsuario(this.userId).subscribe({

      next: (data) => {
        this.rutinas = data;
        console.log('✅ Rutinas del usuario:', data);

          setTimeout(() => {
            // 🔹 Aseguramos que todas las rutinas arranquen transparentes
        gsap.set(".rutina-item", { opacity: 0, y: 30 });

        // 🔹 Animamos con fromTo
        gsap.fromTo(
          ".rutina-item",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out"
          }
        );
        }, 150);
      },
      error: (error) => {
        console.error('❌ Error al obtener rutinas:', error);
      }
    });
  }

  editarRutina(rutina: RutinaDTO): void {
    // Redirige a la pantalla de edición
    console.log('Editando rutina:', rutina);
    this.router.navigate(['/rutina/editar-rutina', rutina.id]);
  }

    eliminarRutina(rutina: RutinaDTO): void {
    if (!confirm(`¿Querés eliminar la rutina "${rutina.nombre}"?`)) return;

    // Solo eliminamos del array local (mock)
    this.rutinas = this.rutinas.filter(r => r.id !== rutina.id);
    console.log('✅ Mock: rutina eliminada del front-end:', rutina);

    // Opcional: mostrar un mensaje al usuario
    alert(`La rutina "${rutina.nombre}" fue eliminada.`);
  }

  iniciarRutina(rutina: RutinaDTO): void {
  if (!rutina.id) {
    console.warn('Rutina no tiene ID:', rutina);
    return;
  }

  this.router.navigate(['/rutina/iniciar', rutina.id])
    .then(success => {
      if (!success) console.error('No se pudo navegar a iniciar rutina');
    })
    .catch(err => console.error(err));
}

crearRutina(): void {
  this.router.navigate(['/rutina/crear'])
    .then(success => {
      if (!success) console.error('No se pudo navegar a crear rutina');
    })
    .catch(err => console.error(err));
}

  volverAtras(): void {
    this.location.back();
  }


}
