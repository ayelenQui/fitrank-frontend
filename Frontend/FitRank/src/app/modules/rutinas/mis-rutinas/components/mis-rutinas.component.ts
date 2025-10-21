import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import gsap from 'gsap';

@Component({
  selector: 'app-mis-rutinas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-rutinas.component.html',
  styleUrls: ['./mis-rutinas.component.css']
})
export class MisRutinasComponent implements OnInit {
  rutinas: any[] = [];
  loading = true;
  error = '';
  userId?: number;

  constructor(
    private rutinaService: RutinaService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.auth.obtenerUser();
    this.userId = user?.Id;

    if (!this.userId) {
      this.error = 'No se pudo obtener el usuario. Iniciá sesión nuevamente.';
      this.router.navigate(['/login']);
      return;
    }

    this.cargarRutinas();
  }

  cargarRutinas(): void {
    this.loading = true;

    this.rutinaService.getRutinasPorUsuario(this.userId!).subscribe({
      next: (data) => {
        const delUsuario = data.filter((x) => x.socioId === this.userId);

        // agrupar por rutina
        const agrupadas = new Map<number, any>();
        delUsuario.forEach((item) => {
          const rId = item.rutinaId;
          if (!agrupadas.has(rId)) {
            agrupadas.set(rId, {
              rutina: item.rutina,
              ejercicios: []
            });
          }
          agrupadas.get(rId).ejercicios.push({
            id: item.ejercicio.id,
            nombre: item.ejercicio.nombre,
            orden: item.orden,
            sesion: item.sesion
          });
        });

        this.rutinas = Array.from(agrupadas.values()).map(r => ({
          ...r,
          ejercicios: r.ejercicios.sort((a: any, b: any) => a.orden - b.orden)
        }));

        this.loading = false;

        // Animación
        setTimeout(() => {
          gsap.set('.rutina-item', { opacity: 0, y: 25 });
          gsap.to('.rutina-item', {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out'
          });
        });
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar tus rutinas.';
        this.loading = false;
      }
    });
  }

  iniciarRutina(rutina: any): void {
    const id = rutina.id || rutina.rutina?.id;
    if (!id) {
      console.warn('⚠️ No se encontró el ID de la rutina:', rutina);
      return;
    }

    console.log('➡️ Navegando a rutina:', id);
    this.router.navigate(['/rutina/iniciar-rutina', id]);
  }

  crearRutina(): void {
    this.router.navigate(['/rutina/crear-manual']);
  }
}
