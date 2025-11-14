import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificacionService } from '@app/api/services/notificacion/notificacion.service';
import { UsuarioNotificacion } from '@app/api/services/notificacion/interface/notificacion.interface';
import { HistorialNoti } from '@app/api/services/notificacion/interface/notificacion.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  usuariosOriginal: UsuarioNotificacion[] = [];
  profesores: UsuarioNotificacion[] = [];
  socios: UsuarioNotificacion[] = [];

  filtroProfesor = '';
  filtroSocio = '';
  historial: HistorialNoti[] = [];
  mostrarHistorial = false;

  usuarioSeleccionado: number | null = null;
  titulo = '';
  mensaje = '';
  loading = false;

  constructor(private notiService: NotificacionService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.notiService.getUsuariosParaNotificar().subscribe({
      next: (res) => {
        this.usuariosOriginal = res;

        this.separarListas();
      },
      error: (err) => console.error('Error cargando usuarios', err)
    });
  }

  separarListas() {
    this.profesores = this.usuariosOriginal.filter(u => u.rol === 'Profesor');
    this.socios = this.usuariosOriginal.filter(u => u.rol === 'Socio');
  }

  buscarProfesor() {
    const term = this.filtroProfesor.toLowerCase();
    this.profesores = this.usuariosOriginal
      .filter(u => u.rol === 'Profesor' && u.nombreCompleto.toLowerCase().includes(term));
  }

  buscarSocio() {
    const term = this.filtroSocio.toLowerCase();
    this.socios = this.usuariosOriginal
      .filter(u => u.rol === 'Socio' && u.nombreCompleto.toLowerCase().includes(term));
  }

  enviar() {
    if (!this.usuarioSeleccionado || !this.titulo || !this.mensaje) return;

    const dto = {
      usuarioReceptorId: this.usuarioSeleccionado,
      titulo: this.titulo,
      mensaje: this.mensaje
    };

    this.loading = true;

    this.notiService.enviarIndividual(dto).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: '📩 Notificación enviada',
          text: 'El mensaje se envió correctamente al usuario.',
          showConfirmButton: false,
          timer: 1800,
          timerProgressBar: true
        });
      },
      error: () => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: '❌ Error',
          text: 'Hubo un problema al enviar la notificación.',
          confirmButtonColor: '#8c52ff'
        });
      }

    });
  }

  cargarHistorial() {
    this.notiService.getHistorial().subscribe({
      next: (res) => {
        this.historial = res;
        this.mostrarHistorial = true;
      },
      error: (err) => console.error("Error cargando historial", err)
    });
  }

  enviarMasiva() {
    if (!this.titulo || !this.mensaje) return;

    const dto = {
      titulo: this.titulo,
      mensaje: this.mensaje
    };

    this.loading = true;

    this.notiService.enviarMasiva(dto).subscribe({
      next: (res) => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: '📣 Notificación masiva enviada',
          html: `
      <b>${res.cantidad}</b> notificaciones fueron enviadas correctamente.
    `,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });
      },
      error: () => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: '❌ Error en envío masivo',
          text: 'No se pudieron enviar las notificaciones.',
          confirmButtonColor: '#8c52ff'
        });
      }

    });
  }

}
