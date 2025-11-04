import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Solicitud } from '@app/api/services/profesor/interfaces/solicitud.interface';
import { SolicitudesService } from '@app/api/services/profesor/solicitudesService';

@Component({
  selector: 'app-solicitudes-profesor',
  imports: [CommonModule, DatePipe],
  templateUrl: './solicitudes-profesor.html',
  styleUrl: './solicitudes-profesor.css'
})

export class SolicitudesProfesor implements OnInit{
  solicitudes: Solicitud[] = [];
  cargando = true;
  solicitudSeleccionadaId: number | null = null;

  constructor(private solicitudesService: SolicitudesService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

cargarSolicitudes(): void {
    this.cargando = true;

    // 🧪 Mock temporal para testear sin backend
    setTimeout(() => {
      this.solicitudes = [
        {
          id: 1,
          socioId: 12,
          nombreSocio: 'Juan Pérez',
          edad: 29,
          pesoKg: 75,
          alturaCm: 178,
          nivel: 'Intermedio',
          sesionesPorSemana: 4,
          minutosPorSesion: 60,
          objetivo: 'Hipertrofia',
          estado: 'Pendiente',
          fechaSolicitud: '2025-11-03T14:00:00Z',
          DolorHombro: false,
          DolorRodilla: true,
          DolorLumbar: false,
          CirugiaReciente: false,
          Sincope: false,
          Embarazo: false,
          Hipertension: true,
          HipertensionControlada: true,
          Diabetes: false,
          DolorToracico: false,
          FrecuenciaCardiacaReposo: 68
        },
        {
          id: 2,
          socioId: 21,
          nombreSocio: 'María Gómez',
          edad: 34,
          pesoKg: 62,
          alturaCm: 165,
          nivel: 'Principiante',
          sesionesPorSemana: 3,
          minutosPorSesion: 45,
          objetivo: 'Pérdida de grasa',
          estado: 'Pendiente',
          fechaSolicitud: '2025-11-02T10:00:00Z',
          DolorHombro: false,
          DolorRodilla: false,
          DolorLumbar: true,
          CirugiaReciente: false,
          Sincope: false,
          Embarazo: false,
          Hipertension: false,
          HipertensionControlada: false,
          Diabetes: true,
          DolorToracico: false,
          FrecuenciaCardiacaReposo: 72
        }
      ];
      this.cargando = false;
    }, 800);
  }

/* TODO: DESCOMENTAR ESTO, LLAMA AL SERVICIO
  cargarSolicitudes(): void {
    this.cargando = true;
    this.solicitudesService.obtenerTodasLasSolicitudes().subscribe({
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
*/

  crearRutina(socioId: number): void {
    console.log('Crear rutina para socio con ID:', socioId); //TODO: LLAMAR AL SERVICIO RUTINA PARA CREARLA
  }
  toggleDetalles(id: number): void {
    this.solicitudSeleccionadaId = this.solicitudSeleccionadaId === id ? null : id;
  }
}
