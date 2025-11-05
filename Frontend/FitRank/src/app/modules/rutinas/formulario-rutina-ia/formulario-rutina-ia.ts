import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EjercicioDTO } from '@app/api/ejercicioAsignado/interfaces/ejercicioAsignado.interface.rest';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { EjercicioService } from '@app/api/services/ejercicio/ejercicioService';
import { RutinaService } from '@app/api/services/rutina/rutinaService';

@Component({
  selector: 'app-formulario-rutina-ia',
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './formulario-rutina-ia.html',
  styleUrl: './formulario-rutina-ia.css'
})

export class FormularioRutinaIa implements OnInit{
  rutinaForm!: FormGroup;
  enviando = false;
  resultado: any = null;
  usuarioId!: number;
  ejercicios: EjercicioDTO[] = [];
  nivel: 'Principiante' | 'Intermedio' | 'Avanzado' | null = null;

  constructor(
    private fb: FormBuilder,
    private rutinaService: RutinaService,
    private router: Router,
    private authService: AuthService,
    private ejercicioService: EjercicioService
  ) {}

  ngOnInit(): void {
   const usuario = this.authService.obtenerUser();
    if (usuario && usuario.id) {
      this.usuarioId = usuario.id;
      this.nivel = usuario.nivel;
    } else {
      console.warn('No hay usuario logueado');
    }

      this.ejercicioService.getAll().subscribe({
      // next: (data) => (this.ejercicios = data),
      error: (err) => console.error('Error al obtener ejercicios', err)
    });


    this.rutinaForm = this.fb.group({
      edad: [null, [Validators.required, Validators.min(10), Validators.max(100)]],
      pesoKg: [null, [Validators.required, Validators.min(30)]],
      alturaCm: [null, [Validators.required, Validators.min(100)]],
      sesionesPorSemana: [3, [Validators.required, Validators.min(1), Validators.max(7)]],
      minutosPorSesion: [45, [Validators.required, Validators.min(10)]],
      objetivo: ['Hipertrofia', Validators.required],
      calidadAlimentacion: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      horasSuenio: [7, [Validators.required, Validators.min(3), Validators.max(12)]],

      screening: this.fb.group({
        hipertension: [false],
        hipertensionControlada: [false],
        diabetes: [false],
        cirugiaReciente: [false],
        dolorLumbar: [false],
        dolorHombro: [false],
        dolorRodilla: [false],
        dolorToracico: [false],
        sincope: [false],
        embarazo: [false],
        frecuenciaCardiacaReposo: [70, [Validators.min(40), Validators.max(120)]],
        dolorEscala0a10: [0, [Validators.min(0), Validators.max(10)]],
      }),

      preferencias: this.fb.group({
        incluirCardio: [true],
        prefiereMaquinas: [false],
        prefiereMancuernas: [false],
        ejerciciosExcluidos: this.fb.array([]),
      })
    });
  }

// ✅ Verifica si un ejercicio está seleccionado
estaSeleccionado(nombre: string): boolean {
  const formArray = this.rutinaForm.get('preferencias.ejerciciosExcluidos') as FormArray;
  return formArray.value.includes(nombre);
}

// ✅ Alterna selección al hacer clic
toggleEjercicio(nombre: string): void {
  const formArray = this.rutinaForm.get('preferencias.ejerciciosExcluidos') as FormArray;
  const index = formArray.value.indexOf(nombre);

  if (index >= 0) {
    formArray.removeAt(index);
  } else {
    formArray.push(this.fb.control(nombre));
  }
}


  enviar(): void {
    if (this.rutinaForm.invalid) {
      this.rutinaForm.markAllAsTouched();
      return;
    }

    const idSocio = this.usuarioId; // ⚠️ Reemplazar con el ID del socio logueado (p.ej. desde el token)
    const data = this.rutinaForm.value;

      // ⚠️ Asignamos el nivel del usuario logueado
    if (this.nivel) {
      data.nivel = this.nivel; // 'Principiante' | 'Intermedio' | 'Avanzado'
    } else {
      console.warn('No se encontró el nivel del usuario, se enviará Principiante por defecto');
      data.nivel = 'Principiante';
    }

    this.enviando = true;
    this.rutinaService.generarRutinaIA(idSocio, data).subscribe({
      next: (res) => {
        this.resultado = res;
        this.enviando = false;
        alert('✅ Rutina generada correctamente');
        this.router.navigate(['/rutina/mis-rutinas']); 
      },
      error: (err) => {
        this.enviando = false;
        console.error(err);
        alert('⚠️ Ocurrió un error al generar la rutina');
      }
    });
  }
}