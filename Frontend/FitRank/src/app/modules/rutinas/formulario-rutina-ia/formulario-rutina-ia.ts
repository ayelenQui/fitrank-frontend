import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocioApiService } from '@app/api/services/socio/socioApiService'; 
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { EjercicioService } from '@app/api/services/ejercicio/ejercicioService';
import { EjercicioDTO } from '@app/api/services/ejercicio/interfaces/ejercicio.interface';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import Swal from 'sweetalert2';

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
  socio: any = null;
  textoObjetivo: string = '';

  constructor(
    private fb: FormBuilder,
    private rutinaService: RutinaService,
    private router: Router,
    private authService: AuthService,
    private ejercicioService: EjercicioService,
    private socioService: SocioApiService
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
       next: (data) => (this.ejercicios = data),
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
    this.cargarDatosSocio();
  }

  cargarDatosSocio() {

    const user = this.authService.obtenerUser();
    if (!user) return;

    this.socioService.getSocioById(user.id).subscribe({
      next: socio => {

        
        this.rutinaForm.patchValue({
         
          pesoKg: socio.peso ?? null,
          alturaCm: socio.altura ?? null
        });
      },
      error: err => console.error("Error cargando socio:", err)
    });
  }
 


estaSeleccionado(nombre: string): boolean {
  const formArray = this.rutinaForm.get('preferencias.ejerciciosExcluidos') as FormArray;
  return formArray.value.includes(nombre);
}
  mostrarInfoObjetivo() {
    const objetivo = this.rutinaForm.get('objetivo')?.value;

    switch (objetivo) {
      case 'Hipertrofia':
        this.textoObjetivo = 'Hipertrofia: ganar masa muscular, aumentar volumen y mejorar la estética muscular.';
        break;

      case 'PerdidaDePeso':
        this.textoObjetivo = 'Pérdida de peso: reducir grasa corporal con rutinas mixtas de pesas y cardio.';
        break;

      case 'Fuerza':
        this.textoObjetivo = 'Fuerza: aumentar la capacidad de levantar más peso y mejorar la potencia muscular.';
        break;

      case 'Resistencia':
        this.textoObjetivo = 'Resistencia: mejorar la capacidad aeróbica y mantener esfuerzo durante más tiempo.';
        break;

      default:
        this.textoObjetivo = '';
    }
  }


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

    const idSocio = this.usuarioId; 
    const data = this.rutinaForm.value;

      
    if (this.nivel) {
      data.nivel = this.nivel; 
    } else {
      console.warn('No se encontró el nivel del usuario, se enviará Principiante por defecto');
      data.nivel = 'Principiante';
    }

this.enviando = true;
    this.rutinaService.generarRutinaIA(idSocio, data).subscribe({
      next: (res) => {
        this.resultado = res;
        this.enviando = false;
        Swal.fire({
          title: 'Rutina generada ',
          text: 'Tu rutina personalizada fue creada correctamente.',
          icon: 'success',
          imageUrl: 'assets/img/logo/logo-negro-lila.svg',
          imageWidth: 80,
          imageHeight: 80,
          imageAlt: 'FitRank Logo',
          confirmButtonColor: '#8c52ff',
          confirmButtonText: 'Ver mis rutinas',
          showClass: {
            popup: 'animate_animated animate_fadeInDown'
          },
          hideClass: {
            popup: 'animate_animated animate_fadeOutUp'
          }
        }).then(() => this.router.navigate(['/rutina/mis-rutinas']));
      },
      error: (err) => {
        this.enviando = false;
        console.error(err);

        Swal.fire({
          icon: 'error',
          title: 'Error al generar la rutina 😥',
          text: err?.error?.mensaje || 'Ocurrió un error inesperado al generar la rutina. Intentá nuevamente.',
          confirmButtonColor: '#8c52ff',
          confirmButtonText: 'Reintentar',
          footer: '<small>Si el problema persiste, contactá al administrador.</small>'
        });
      }
  });
}
}
