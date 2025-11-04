import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsistenciaService } from '@app/api/services/asistencia/asistencia.service';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { NotificacionService } from '@app/api/services/notificacion/notificacion.service';
import { AsistenciaListadoDTO, SocioInactivoDTO } from '@app/api/services/asistencia/interface/asistencia.interface';

@Component({
  selector: 'app-abandono',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './abandono.component.html',
  styleUrls: ['./abandono.component.css']
})
export class AbandonoComponent implements OnInit {
  asistencias: AsistenciaListadoDTO[] = [];
  asistenciasFiltradas: AsistenciaListadoDTO[] = [];
  filtroSocio: string = '';
  loading = false;
  mensaje = '';
  inactivos: SocioInactivoDTO[] = [];
  constructor(
    private asistenciaService: AsistenciaService,
    private authService: AuthService,
    private notificacionService: NotificacionService
  ) { }

  ngOnInit(): void {
    this.cargarAsistencias();
    this.cargarSociosInactivos();
  }

  // 🔹 Cargar todas las asistencias registradas
  cargarAsistencias(): void {
    const token = this.authService.obtenerToken();
    if (!token) {
      this.mensaje = '⚠️ No hay sesión activa.';
      return;
    }

    this.loading = true;
    this.asistenciaService.getTodasAsistencias(token).subscribe({
      next: (res) => {
        this.asistencias = res;
        this.asistenciasFiltradas = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar asistencias:', err);
        this.mensaje = '❌ No se pudieron cargar las asistencias.';
        this.loading = false;
      }
    });
  }

  // 🔹 Filtra por nombre de socio
  filtrarPorSocio(): void {
    const filtro = this.filtroSocio.trim().toLowerCase();
    this.asistenciasFiltradas = filtro
      ? this.asistencias.filter(a => a.nombreSocio.toLowerCase().includes(filtro))
      : this.asistencias;
  }

  // 🔹 Cargar socios que llevan X días sin asistir
  cargarSociosInactivos(): void {
    const token = this.authService.obtenerToken();
    if (!token) {
      this.mensaje = '⚠️ No hay sesión activa.';
      return;
    }

    this.loading = true;
    this.asistenciaService.getSociosInactivos(token, 5).subscribe({
      next: (res) => {
        this.inactivos = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener socios inactivos:', err);
        this.mensaje = '❌ No se pudieron obtener los socios inactivos.';
        this.loading = false;
      }
    });
  }

  // 🔹 Enviar notificación de retención
  retenerSocio(socioId: number): void {
    const token = this.authService.obtenerToken();
    if (!token) {
      this.mensaje = '⚠️ No hay sesión activa.';
      return;
    }

    this.loading = true;
    this.notificacionService.enviarNotificacionRetencion(token, socioId).subscribe({
      next: (res) => {
        this.loading = false;
        this.mensaje = res.mensaje || '📩 Notificación enviada correctamente.';
        // actualiza lista de inactivos
        this.cargarSociosInactivos();
      },
      error: (err) => {
        console.error('Error al enviar notificación:', err);
        this.mensaje = err.error?.mensaje || '❌ Error al enviar notificación.';
        this.loading = false;
      }
    });
  }

  abrirWhatsApp(telefono: string, nombre: string): void {
    const mensaje =
      ` ¡Hola ${nombre}! Hace unos días que no te vemos por FitRank 

Queremos saber si todo va bien 

Si necesitás ajustar tu rutina o una charla con un entrenador, contanos 

¡Estamos para acompañarte en tu progreso! `;

    const url = `https://wa.me/54${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }




}
