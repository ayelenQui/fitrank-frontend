import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { ActualizarReporte, Reporte } from '@app/api/services/reportes/interfaces/reportes.interface';
import { ReportesService } from '@app/api/services/reportes/reportes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportes-admin',
  imports: [CommonModule, RouterModule],
  templateUrl: './reportes-admin.html',
  styleUrl: './reportes-admin.css'
})
export class ReportesAdmin implements OnInit {
   reportesGimnasio: Reporte[] = [];
  cargando: boolean = false;
  gimnasioId!: number;
  filtroSeleccionado: 'todos' | 'activos' | 'inactivos' = 'todos';

  reporteAbiertoId: number | null = null;

  constructor(
    private reportesService: ReportesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.obtenerUser();
    this.gimnasioId = user?.gimnasioId ?? null;
    this.cargarReportesPorEstado('activos');
  }

  cargarReportesPorEstado(estado: 'todos' | 'activos' | 'inactivos') {
    this.filtroSeleccionado = estado;
    this.cargando = true;

    let observable;

    switch(estado) {
      case 'activos':
        observable = this.reportesService.obtenerReportesActivos(this.gimnasioId);
        break;
      case 'inactivos':
        observable = this.reportesService.obtenerReportesInactivos(this.gimnasioId);
        break;
      default:
        observable = this.reportesService.obtenerReportesDeGimnasio(this.gimnasioId);
        break;
    }

    observable.subscribe({
      next: (data) => { 
        this.reportesGimnasio = data; 
        this.cargando = false; 
      },
      error: () => { this.cargando = false; }
    });
  }

  cambiarEstado(reporte: Reporte) {
    Swal.fire({
      title: '¿Marcar como resuelto?',
      text: `El reporte "${reporte.titulo}" será marcado como resuelto.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, marcar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reportesService.desactivarReporte(reporte.id).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Listo!',
              text: 'El reporte fue marcado como resuelto.',
              icon: 'success',
              confirmButtonColor: '#4caf50'
            });

            this.cargarReportesPorEstado(this.filtroSeleccionado);
          },
          error: () => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo actualizar el estado del reporte.',
              icon: 'error',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }

  toggleDescripcion(reporteId: number): void {
    if (this.reporteAbiertoId === reporteId) {
      this.reporteAbiertoId = null;
    } else {
      this.reporteAbiertoId = reporteId;
    }
  }
}