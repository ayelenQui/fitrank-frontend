import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '@app/api/services/notificacion/notificacion.service';
import { NotificacionDTO } from '@app/api/services/notificacion/interface/notificacion.interface';
import Swal from 'sweetalert2';


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


  abrirNotificacion(n: NotificacionDTO) {
   
    if (!n.leido) {
      this.notiService.marcarComoLeida(n.id).subscribe();
      n.leido = true;
    }

    
    Swal.fire({
      title: n.titulo,
      html: `
      <p style="font-size: 1.1rem; color:#444;">${n.mensaje}</p>
      <p style="font-size: .9rem; margin-top: 1rem; color:#777;">
      
      </p>
    `,
      icon: 'info',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#8b52ff',
      background: '#fff',
      width: '90%',
      customClass: {
        popup: 'swal-fit-popup',
        title: 'swal-fit-title'
      }
    });
  }
}

