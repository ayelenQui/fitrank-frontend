import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '@app/api/services/notificacion/notificacion.service';
import { NotificacionDTO } from '@app/api/services/notificacion/interface/notificacion.interface';

@Component({
  selector: 'app-notificaciones-socio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones-socio.component.html',
  styleUrls: ['./notificaciones-socio.component.css']
})
export class NotificacionesSocioComponent implements OnInit {

  notificaciones: NotificacionDTO[] = [];
  cargando = true;

  constructor(private notiService: NotificacionService) { }

  ngOnInit(): void {
    this.notiService.getMisNotificaciones().subscribe({
      next: (res) => {
        this.notificaciones = res.notificaciones || [];
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  // 👉 ESTE ES EL MÉTODO QUE FALTABA
  abrirNotificacion(n: NotificacionDTO) {
    // 1. Marcar como leída
    if (!n.leido) {
      this.notiService.marcarComoLeida(n.id).subscribe();
      n.leido = true;
    }

    // 2. Mostrar el detalle en un modal
    alert(`
      ${n.titulo}
      
      ${n.mensaje}
      
      Fecha: ${new Date(n.fechaEnvio).toLocaleString()}
    `);
  }
}

