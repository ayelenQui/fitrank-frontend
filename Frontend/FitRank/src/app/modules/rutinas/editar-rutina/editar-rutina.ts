import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import { AuthService } from '@app/api/services/activacion/AuthService.service';

// Extendemos el DTO de ejercicios para mock de imagen
interface Ejercicio {
  id: number;
  nombre: string;
  grupoMuscular: number;
  dificultad: number;
  peso?: number;
  repeticiones?: number;
  rir?: number;
  imagen?: string; // mock
}

interface Rutina {
  id: number;
  nombre: string;
  ejercicios: Ejercicio[];
}

@Component({
  selector: 'app-editar-rutina',
  templateUrl: './editar-rutina.html',
  standalone: true,
  styleUrls: ['./editar-rutina.css'],
  
  imports: [CommonModule, FormsModule, RouterModule],
})
export class EditarRutinaComponent implements OnInit {
  rutina: Rutina = { id: 0, nombre: '', ejercicios: [] };
  menuAbierto: { [id: number]: boolean } = {};

  grupoMuscularImagenMap: { [key: number]: string } = {
    0: 'assets/img/pecho.png',
    1: 'assets/img/espalda.png',
    2: 'assets/img/piernas.png',
    3: 'assets/img/hombros.png',
  };

  constructor(
    private ruta: ActivatedRoute,
    private router: Router,
    private rutinaService: RutinaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.obtenerUser();
    if (!user || !(user.Id || user.id)) {
      console.warn('⚠️ No se encontró usuario logueado');
      return;
    }
    const userId = user.Id || user.id;
    this.cargarRutinaConEjercicios(userId);
  }

  cargarRutinaConEjercicios(userId: number) {
    const rutinaId = this.ruta.snapshot.paramMap.get('id');
    if (!rutinaId) return;

    // this.rutinaService.listarRutinasPorUsuario(userId).subscribe({
    //   next: (rutinas) => {
    //     const encontrada = rutinas.find(r => r.id === +rutinaId);
    //     if (encontrada) {
    //       // agregamos mock de imagen a cada ejercicio
    //       encontrada.ejercicios = encontrada.ejercicios.map(e => ({
    //         ...e,
    //         imagen: this.grupoMuscularImagenMap[e.grupoMuscular] || 'assets/placeholder.png'
    //       }));
    //       this.rutina = {...encontrada}; // asignamos nuevo objeto para que Angular detecte cambios
    //       console.log('✅ Rutina cargada con ejercicios:', this.rutina);
    //     } else {
    //       console.error('Rutina no encontrada');
    //     }
    //   },
    //   error: (err) => console.error('Error cargando rutina', err)
    // });
  }

  abrirOpcionesEjercicio(ejercicio: Ejercicio) {
    this.menuAbierto[ejercicio.id] = !this.menuAbierto[ejercicio.id];
  }

  editarEjercicio(ejercicio: Ejercicio) {
    console.log('Editar ejercicio:', ejercicio);
  }

  eliminarEjercicio(ejercicio: Ejercicio) {
    this.rutina.ejercicios = this.rutina.ejercicios.filter(e => e.id !== ejercicio.id);
  }

  guardarCambios() {
    // Podés reemplazar con PUT a la API
    console.log('Guardar rutina:', this.rutina);
    this.router.navigate(['/rutina/mis-rutinas']);
  }

  cancelar() {
    this.router.navigate(['/rutina/mis-rutinas']);
  }

  irAAgregarEjercicio() {
    this.router.navigate(['/seleccionar-ejercicio', this.rutina.id]);
  }
}
