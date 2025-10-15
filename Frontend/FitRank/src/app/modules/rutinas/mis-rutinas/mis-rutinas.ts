import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { RutinaDTO } from '@app/api/services/rutina/interfaces/rutina.interface.rest';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import { Router } from '@angular/router';
import { VisitanteHomeNavbar } from '../../../public/visitante-home-navbar/visitante-home-navbar';


@Component({
  selector: 'app-mis-rutinas',
  imports: [CommonModule,          // ngIf,ngFor, pipes
    RouterModule,          // routerLink
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    VisitanteHomeNavbar],
  templateUrl: './mis-rutinas.html',
  styleUrl: './mis-rutinas.css'
})
export class MisRutinasComponent implements OnInit{
  constructor(private authService: AuthService, private rutinaService : RutinaService) { }
  
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


  cargarRutinas(): void {
    if (!this.userId) return;

    this.rutinaService.listarRutinasPorUsuario(this.userId).subscribe({
      next: (data) => {
        this.rutinas = data;
        console.log('✅ Rutinas del usuario:', data);
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
    alert(`La rutina "${rutina.nombre}" fue eliminada (simulación).`);
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

}
