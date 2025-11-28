import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { AgregarReporte, Reporte } from '@app/api/services/reportes/interfaces/reportes.interface';
import { ReportesService } from '@app/api/services/reportes/reportes.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-reportes',
  imports: [ReactiveFormsModule, FormsModule, DatePipe, CommonModule],
  templateUrl: './mis-reportes.html',
  styleUrl: './mis-reportes.css'
})
export class MisReportes  implements OnInit {

  crearForm: FormGroup;
  enviando: boolean = false;
  reportesUsuario: Reporte[] = [];
  cargando: boolean = false;

  usuarioId!: number;
  gimnasioId!: number;

  reporteAbiertoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private reportesService: ReportesService,
    private authService: AuthService,
    private location : Location
  ) {



    this.crearForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(120)]],
      descripcion: ['', [Validators.required, Validators.maxLength(2000)]],
    });
  }
  
  ngOnInit(): void {
    
  const user = this.authService.obtenerUser();

  this.usuarioId = user?.id ?? null;
  this.gimnasioId = user?.gimnasioId ?? null;

    this.cargarReportesDelUsuario();
  }

    cargarReportesDelUsuario() {
    this.cargando = true;
    this.reportesService.obtenerReportesPorUsuario(this.usuarioId)
      .subscribe({
        next: (data) => {
          this.reportesUsuario = data;
          this.cargando = false;
        },
        error: () => {
          this.cargando = false;
        }
      });
  }

 crearReporte() {
  if (this.crearForm.invalid) {
    this.crearForm.markAllAsTouched();
    return;
  }

  this.enviando = true;

  const nuevoReporte: AgregarReporte = {
    titulo: this.crearForm.value.titulo.trim(),
    descripcion: this.crearForm.value.descripcion.trim(),
    usuarioId: this.usuarioId,
    gimnasioId: this.gimnasioId
  };

  this.reportesService.agregarReporte(nuevoReporte).subscribe({
    next: () => {
      this.enviando = false;
      this.crearForm.reset();

      Swal.fire({
        title: 'Reporte enviado',
        text: 'Tu reporte fue registrado correctamente.',
        icon: 'success',
        imageUrl: 'assets/img/logo/logo-negro-lila.svg',
        imageWidth: 80,
        imageHeight: 80,
        imageAlt: 'FitRank Logo',
        confirmButtonColor: '#8c52ff',
        confirmButtonText: 'Aceptar',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then(() => {
        // Recargar historial cuando cierre el modal
        this.cargarReportesDelUsuario();
      });
    },
    error: () => {
      this.enviando = false;

      Swal.fire({
        icon: 'error',
        title: 'Error al crear el reporte',
        text: 'Hubo un problema al enviar el reporte, intentá nuevamente.',
        confirmButtonColor: '#8c52ff'
      });
    }
  });
}

toggleDescripcion(reporteId: number): void {
    if (this.reporteAbiertoId === reporteId) {
      // Si ya está abierto, ciérralo (establece a null)
      this.reporteAbiertoId = null;
    } else {
      // Si está cerrado o es otro reporte, ábrelo (establece el ID)
      this.reporteAbiertoId = reporteId;
    }
  }

  volverAtras(): void {
    this.location.back();
  }
  
}
