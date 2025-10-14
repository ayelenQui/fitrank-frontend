import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EjercicioService } from '@app/api/services/ejercicio/ejercicioService';
import { EjercicioDTO } from '@app/api/services/ejercicio/interfaces/ejercicio.interface';
import { CrearRutinaDTO } from '@app/api/services/rutina/interfaces/rutina.interface.rest';
import { RutinaService } from '@app/api/services/rutina/rutinaService';

// extendemos el DTO para agregar imagen
interface EjercicioConImagen extends EjercicioDTO {
  imagen: string;
}

@Component({
  selector: 'app-crear-rutina-manual',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './crear-rutina-manual.html',
  styleUrls: ['./crear-rutina-manual.css']
})
export class CrearRutinaManualComponent {
  rutinaForm!: FormGroup;

  // ahora ambos arrays son EjercicioConImagen
  ejerciciosDisponibles: EjercicioConImagen[] = [];
  ejerciciosSeleccionados: EjercicioConImagen[] = [];

  grupoMuscularImagenMap: { [key: number]: string } = {
    0: 'img/pecho.png',
    1: 'img/espalda.png',
    2: 'img/piernas.png',
    3: 'img/hombros.png',
  };

  constructor(
    private fb: FormBuilder,
    private rutinaService: RutinaService,
    private ejercicioService: EjercicioService
  ) {}

  ngOnInit(): void {
    this.rutinaForm = this.fb.group({
      usuarioId: [1, Validators.required],
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
        // hacemos el map para agregar la propiedad imagen
        this.ejerciciosDisponibles = data.map((e): EjercicioConImagen => ({
          ...e,
          imagen: this.grupoMuscularImagenMap[e.grupoMuscular] || 'assets/imagenes/default.png'
        }));
      },
      error: (err) => console.error('Error al cargar ejercicios', err),
    });
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
      },
      error: (err) => {
        console.error('Error al crear rutina', err);
        alert('Error al crear la rutina');
      },
    });
  }
}
