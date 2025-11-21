import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { CrearSolicitudRutinaProfesorDTO } from '@app/api/services/rutina/interfaces/rutina.interface.rest';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import { GeneralLayoutComponent } from '@app/layouts/general-layout/general-layout.component';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';

@Component({
  selector: 'app-formulario-rutina-asistida',
  imports: [CommonModule, ReactiveFormsModule, GeneralLayoutComponent],
  templateUrl: './formulario-rutina-asistida.html',
  styleUrl: './formulario-rutina-asistida.css'
})

export class FormularioRutinaAsistida implements OnInit{
  solicitudForm!: FormGroup;
  enviando = false;
  usuarioId!: number;

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
    private router: Router
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
        alert('Solicitud enviada correctamente');
        this.router.navigate(['/rutina/mis-rutinas']);
      },
      error: (err) => {
        this.enviando = false;
        console.error(err);
        alert('Error al enviar solicitud');
      }
    });
  }
}
