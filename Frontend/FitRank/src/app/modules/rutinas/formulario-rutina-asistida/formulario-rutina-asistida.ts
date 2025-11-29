import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { CrearSolicitudRutinaProfesorDTO } from '@app/api/services/rutina/interfaces/rutina.interface.rest';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import { GeneralLayoutComponent } from '@app/layouts/general-layout/general-layout.component';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import Swal from 'sweetalert2';
import { SocioApiService } from "@app/api/services/socio/socioApiService"; 

@Component({
  selector: 'app-formulario-rutina-asistida',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-rutina-asistida.html',
  styleUrl: './formulario-rutina-asistida.css'
})

export class FormularioRutinaAsistida implements OnInit{
  solicitudForm!: FormGroup;
  enviando = false;
  usuarioId!: number;
  textoObjetivo2: string = '';
  socio: any = null;

  textoSesiones: string = '';
  textoMinutos: string = '';
  textoAlimentacion: string = '';
  textoSuenio: string = '';


  screeningChecks = [
    { control: 'dolorLumbar', label: 'Dolor lumbar' },
    { control: 'dolorRodilla', label: 'Dolor rodilla' },
    { control: 'dolorHombro', label: 'Dolor hombro' },
    { control: 'cirugiaReciente', label: 'Cirugía reciente' },
    { control: 'sincope', label: 'Síncope' },
    { control: 'embarazo', label: 'Embarazo' },
    { control: 'hipertension', label: 'Hipertensión' },
    { control: 'hipertensionControlada', label: 'Hipertensión controlada' },
    { control: 'diabetes', label: 'Diabetes' },
    { control: 'dolorToracico', label: 'Dolor torácico' }
  ];
constructor(
    private fb: FormBuilder,
    private rutinaService: RutinaService,
    private authService: AuthService,
  private router: Router,
  private socioService: SocioApiService

  ) {}

  ngOnInit(): void {
    const usuario = this.authService.obtenerUser();
    if (usuario && usuario.id) {
      this.usuarioId = usuario.id;
    }

    this.solicitudForm = this.fb.group({
      mensajeSocio: [''],
      nombreSocio: [usuario?.nombre || '', Validators.required],
      edad: [usuario?.edad || null, [Validators.required, Validators.min(10), Validators.max(100)]],
      pesoKg: [usuario?.pesoKg || null, [Validators.required, Validators.min(30)]],
      alturaCm: [usuario?.alturaCm || null, [Validators.required, Validators.min(100)]],
      nivel: [usuario?.nivel || 'Principiante', Validators.required],
      sesionesPorSemana: [3, [Validators.required, Validators.min(1), Validators.max(7)]],
      minutosPorSesion: [45, [Validators.required, Validators.min(10)]],
      objetivo: ['Hipertrofia', Validators.required],
      calidadAlimentacion: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      horasSuenio: [7, [Validators.required, Validators.min(3), Validators.max(12)]],
      dolorLumbar: [false],
      dolorRodilla: [false],
      dolorHombro: [false],
      cirugiaReciente: [false],
      sincope: [false],
      embarazo: [false],
      hipertension: [false],
      hipertensionControlada: [false],
      diabetes: [false],
      dolorToracico: [false],
      frecuenciaCardiacaReposo: [70, [Validators.min(40), Validators.max(120)]],
    });
    this.cargarDatosSocio();
  }


  mostrarInfoObjetivo2() {
    const objetivo = this.solicitudForm.get('objetivo')?.value;

    switch (objetivo) {
      case 'Hipertrofia':
        this.textoObjetivo2 = 'Hipertrofia: ganar masa muscular y aumentar el volumen muscular.';
        break;

      case 'PerdidaDePeso':
        this.textoObjetivo2 = 'Pérdida de peso: rutinas enfocadas en quemar grasa y mejorar la composición corporal.';
        break;

      case 'Fuerza':
        this.textoObjetivo2 = 'Fuerza: entrenamientos orientados a levantar más peso y mejorar la potencia.';
        break;

      case 'Resistencia':
        this.textoObjetivo2 = 'Resistencia: mejorar la capacidad aeróbica y mantener esfuerzo prolongado.';
        break;

      default:
        this.textoObjetivo2 = '';
    }
  }
  cargarDatosSocio() {

    const user = this.authService.obtenerUser();
    if (!user) return;

    this.socioService.getSocioById(user.id).subscribe({
      next: socio => {
        this.socio = socio;

       
        this.solicitudForm.patchValue({
          nombreSocio: socio.nombre,
          
          pesoKg: socio.peso,
          alturaCm: socio.altura,
          nivel: socio.nivel || 'Principiante',
          
        });
      },
      error: err => console.error("Error cargando socio:", err)
    });
  }
  mostrarInfoSesiones() {
    const valor = this.solicitudForm.get('sesionesPorSemana')?.value;

    if (!valor) {
      this.textoSesiones = '';
      return;
    }

    if (valor <= 2) {
      this.textoSesiones = '1-2 Ideal si recién estás empezando o tenés poco tiempo disponible para entrenar.';
    } else if (valor <= 4) {
      this.textoSesiones = '3-4 Frecuencia recomendada para ver buenos resultados y progresar semana a semana.';
    } else {
      this.textoSesiones = '5 o más sesiones: Perfecto , tenes amplia disponibilidad.';
    }
  }

  mostrarInfoMinutos() {
    const valor = this.solicitudForm.get('minutosPorSesion')?.value;

    if (!valor) {
      this.textoMinutos = '';
      return;
    }

    if (valor < 30) {
      this.textoMinutos = 'Sesiones cortas: el profesor priorizará entrenamientos intensos y eficientes.';
    } else if (valor <= 60) {
      this.textoMinutos = 'Duración ideal para rutinas equilibradas.';
    } else {
      this.textoMinutos = 'Sesiones largas: tu entrenador podrá incluir más variedad.';
    }
  }

  mostrarInfoAlimentacion() {
    const valor = this.solicitudForm.get('calidadAlimentacion')?.value;

    if (!valor) {
      this.textoAlimentacion = '';
      return;
    }

    if (valor <= 2) {
      this.textoAlimentacion = 'Alimentación baja.';
    } else if (valor === 3) {
      this.textoAlimentacion = 'Alimentación aceptable.';
    } else {
      this.textoAlimentacion = 'Alimentación saludable.';
    }
  }

  mostrarInfoSuenio() {
    const valor = this.solicitudForm.get('horasSuenio')?.value;

    if (!valor) {
      this.textoSuenio = '';
      return;
    }

    if (valor < 6) {
      this.textoSuenio = 'Dormís poco: el profesor adaptará la intensidad para evitar fatiga excesiva.';
    } else if (valor <= 8) {
      this.textoSuenio = 'Descanso adecuado: buena base para progresar sostenidamente.';
    } else {
      this.textoSuenio = 'Excelente descanso: facilita el rendimiento.';
    }
  }



enviar(): void {
  if (this.solicitudForm.invalid) {
    this.solicitudForm.markAllAsTouched();
    return;
  }

  const dto: CrearSolicitudRutinaProfesorDTO = {
    ...this.solicitudForm.value
  };

  this.enviando = true;

  this.rutinaService.solicitarRutinaAsistida(this.usuarioId, dto).subscribe({
    next: () => {
      this.enviando = false;

      Swal.fire({
        title: 'Solicitud enviada',
        text: 'Tu solicitud de rutina asistida se envió correctamente.',
        icon: 'success',
        imageUrl: 'assets/img/logo/logo-negro-lila.svg',
        imageWidth: 80,
        imageHeight: 80,
        confirmButtonColor: '#8c52ff',
        confirmButtonText: 'Aceptar',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then(() => {
        this.router.navigate(['/rutina/mis-rutinas']);
      });
    },
    error: (err) => {
      this.enviando = false;
      console.error(err);

      Swal.fire({
        title: 'Error al enviar solicitud',
        text: err?.error?.mensaje || 'Ocurrió un problema al enviar la solicitud. Intentá nuevamente.',
        icon: 'error',
        confirmButtonColor: '#8c52ff',
        confirmButtonText: 'Reintentar',
        footer: '<small>Si el problema persiste, contactá al administrador.</small>'
      });
    }





  });

  

}

}
