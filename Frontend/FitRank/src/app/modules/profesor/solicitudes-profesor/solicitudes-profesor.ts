import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitud } from '@app/api/services/profesor/interfaces/solicitud.interface';
import { SolicitudService } from '@app/api/services/profesor/Solicitud.Service';

@Component({
  selector: 'app-solicitudes-profesor',
  imports: [CommonModule, DatePipe,],
  templateUrl: './solicitudes-profesor.html',
  styleUrl: './solicitudes-profesor.css'
})

export class SolicitudesProfesor implements OnInit {
  solicitudes: Solicitud[] = [];
  cargando = true;
  solicitudSeleccionadaId: number | null = null;

  constructor(private solicitudesService: SolicitudService, private router: Router) { }

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.cargando = true;
    this.solicitudesService.obtenerPendientes().subscribe({
      next: (data) => {
        this.solicitudes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener solicitudes:', err);
        this.cargando = false;
      }
    });
  }


  toggleDetalles(id: number): void {
    this.solicitudSeleccionadaId = this.solicitudSeleccionadaId === id ? null : id;
  }

  crearRutinaParaSocio(solicitud: Solicitud): void {
    this.router.navigate(['/rutina/crear-manual'], {
      state: {
        socioId: solicitud.socioId,
        solicitudId: solicitud.id,
        volverA: '/solicitudes-profesor'
      }
    });
  }
}


