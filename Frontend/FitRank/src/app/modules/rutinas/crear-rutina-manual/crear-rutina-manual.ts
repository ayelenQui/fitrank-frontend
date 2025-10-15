import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EjercicioService } from '@app/api/services/ejercicio/ejercicioService';
import { EjercicioDTO } from '@app/api/services/ejercicio/interfaces/ejercicio.interface';
import { CrearRutinaDTO } from '@app/api/services/rutina/interfaces/rutina.interface.rest';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import { Router } from '@angular/router';


// extendemos el DTO para agregar imagen
interface EjercicioConImagen extends EjercicioDTO {
  imagen: string;
}

interface GrupoMuscular {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-crear-rutina-manual',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './crear-rutina-manual.html',
  styleUrls: ['./crear-rutina-manual.css']
})
export class CrearRutinaManualComponent {
  rutinaForm!: FormGroup;

  ejerciciosDisponibles: EjercicioConImagen[] = [];
  ejerciciosSeleccionados: EjercicioConImagen[] = [];
  ejerciciosFiltrados: EjercicioConImagen[] = []; // para mostrar los ejercicios filtrados

  grupoSeleccionado: number | null = null;

  grupoMuscularImagenMap: { [key: number]: string } = {
    0: 'assets/img/pecho.png',
    1: 'assets/img/espalda.png',
    2: 'assets/img/piernas.png',
    3: 'assets/img/hombros.png',
  };

  grupoMuscularFiltroImagenMap: { [key: number]: string } = {
  0: 'assets/img/pechofiltro.png',
  1: 'assets/img/espaldafiltro.png',
  2: 'assets/img/piernasfiltro.png',
  3: 'assets/img/hombrosfiltro.png',
};

    gruposMusculares: GrupoMuscular[] = [
    { id: 0, nombre: 'Pecho' },
    { id: 1, nombre: 'Espalda' },
    { id: 2, nombre: 'Piernas' },
    { id: 3, nombre: 'Hombros' },
  ];

  constructor(
    private fb: FormBuilder,
    private rutinaService: RutinaService,
    private ejercicioService: EjercicioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rutinaForm = this.fb.group({
      usuarioId: [1, Validators.required], //TODO cambiar a 1 el 7
      nombre: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      diasPorSemana: [3, [Validators.required, Validators.min(1), Validators.max(7)]],
      ejercicios: this.fb.array([]),
    });

    this.cargarEjercicios();
  }

  cargarEjercicios(): void {
    this.ejercicioService.getAll().subscribe({
      next: (data) => {
        // agregamos la propiedad imagen
        this.ejerciciosDisponibles = data.map((e): EjercicioConImagen => ({
          ...e,
          imagen: this.grupoMuscularImagenMap[e.grupoMuscular] || 'assets/imagenes/default.png'
        }));
        // inicialmente mostramos todos
        this.ejerciciosFiltrados = [...this.ejerciciosDisponibles];
      },
      error: (err) => console.error('Error al cargar ejercicios', err),
    });
  }

    // Filtro mockeado
  filtrarPorGrupo(grupoId: number) {
    if (this.grupoSeleccionado === grupoId) {
      // si clickea de nuevo, deselecciona
      this.grupoSeleccionado = null;
      this.ejerciciosFiltrados = [...this.ejerciciosDisponibles];
    } else {
      this.grupoSeleccionado = grupoId;
      this.ejerciciosFiltrados = this.ejerciciosDisponibles.filter(e => e.grupoMuscular === grupoId);
    }
  }

  seleccionarEjercicio(ejercicio: EjercicioConImagen): void {
    const index = this.ejerciciosSeleccionados.indexOf(ejercicio);
    if (index > -1) {
      this.ejerciciosSeleccionados.splice(index, 1);
    } else {
      this.ejerciciosSeleccionados.push(ejercicio);
    }
  }

  agregarEjercicio(ejercicio: EjercicioConImagen): void {
    if (!ejercicio) return;
    const ejercicioForm = this.fb.group({
      rutinaId: [null],
      maquinaId: [ejercicio.maquinaId || null],
      nombre: [ejercicio.nombre, Validators.required],
      grupoMuscular: [ejercicio.grupoMuscular, Validators.required],
      dificultad: [ejercicio.dificultad, Validators.required],
      series: [ejercicio.series || 3, Validators.required],
      repeticiones: [ejercicio.repeticiones || 10, Validators.required],
      peso: [ejercicio.peso || 0],
      descansoSegundos: [ejercicio.descansoSegundos || 60],
      esSerieCompuesta: [false],
      esOpcional: [false],
      diaAsignado: [0, Validators.required],
      observaciones: [''],
      videoUrl: [ejercicio.videoUrl || ''],
      tipoEntrenamiento: [ejercicio.tipoEntrenamiento || 'General'],
      imagen: [ejercicio.imagen || 'assets/imagenes/default.png']
    });

    this.ejercicios.push(ejercicioForm);
  }

  agregarEjerciciosSeleccionados(): void {
    this.ejerciciosSeleccionados.forEach(e => this.agregarEjercicio(e));
    this.ejerciciosSeleccionados = [];
  }

  eliminarEjercicio(index: number): void {
    this.ejercicios.removeAt(index);
  }

  get ejercicios(): FormArray {
    return this.rutinaForm.get('ejercicios') as FormArray;
  }

  get ejerciciosFormGroups(): FormGroup[] {
    return this.ejercicios.controls as FormGroup[];
  }

  onSubmit(): void {
  if (this.rutinaForm.invalid) {
    this.rutinaForm.markAllAsTouched();
    return;
  }

  const rutina: CrearRutinaDTO = this.rutinaForm.value;
  rutina.fechaInicio = new Date(rutina.fechaInicio);
  rutina.fechaFin = new Date(rutina.fechaFin);

  this.rutinaService.crearRutina(rutina).subscribe({
    next: () => {
      alert('Rutina creada correctamente');
      this.rutinaForm.reset();
      this.ejercicios.clear();

      // Redirigir a la vista de mis rutinas
      this.router.navigate(['/rutina/mis-rutinas']);
    },
    error: (err) => {
      console.error('Error al crear rutina', err);
      alert('Error al crear la rutina');
    },
  });
}
}