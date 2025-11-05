import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsistenciaService } from '@app/api/services/asistencia/asistencia.service';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { NotificacionService } from '@app/api/services/notificacion/notificacion.service';
import { AsistenciaListadoDTO, SocioInactivoDTO } from '@app/api/services/asistencia/interface/asistencia.interface';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { gsap } from 'gsap'; 
import { TypingService } from "@app/api/services/typingService";

import Swal from 'sweetalert2';
@Component({
  selector: 'app-abandono',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './abandono.component.html',
  styleUrls: ['./abandono.component.css']
})
export class AbandonoComponent implements OnInit, AfterViewInit {
  asistencias: AsistenciaListadoDTO[] = [];
  asistenciasFiltradas: AsistenciaListadoDTO[] = [];


  filtroSocio: string = '';
  loading = false;
  mensaje = '';
  inactivos: SocioInactivoDTO[] = [];
  constructor(
    private asistenciaService: AsistenciaService,
    private authService: AuthService,
    private notificacionService: NotificacionService,
    private typingService: TypingService
  ) { }

  ngAfterViewInit(): void {
    gsap.from('.metric-card', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' });
  }


  ngOnInit(): void {
    this.cargarAsistencias();
    this.cargarSociosInactivos();
    setTimeout(() => {
      this.crearGraficoEstado();
      this.crearGraficoAsistencias();
    }, 500);
 
      this.typingService.startTypingEffect('RETENCION DE SOCIOS ', 'typingText', 70);
    
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
        Swal.fire({
          icon: 'success',
          title: '📩 Notificación enviada',
          text: res.mensaje || 'El socio fue notificado correctamente.',
          confirmButtonColor: '#8c52ff'
        });
        this.cargarSociosInactivos();
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
    Swal.fire({
      title: `Enviar mensaje a ${nombre}`,
      text: '¿Querés abrir WhatsApp para contactarlo?',
      imageUrl: 'assets/img/logo/logo-negro-lila.svg', // 🟣 tu logo FitRank
      imageWidth: 80,
      imageHeight: 80,
      imageAlt: 'FitRank Logo',

      color: '#black',

      showCancelButton: true,
      confirmButtonColor: '#25D366',
      cancelButtonColor: '#8c52ff',
      confirmButtonText: 'Abrir WhatsApp ',
      cancelButtonText: 'Cancelar',
      customClass: {
        title: 'swal-title-fitrank',
        popup: 'swal-popup-fitrank',
        confirmButton: 'swal-confirm-fitrank',
        cancelButton: 'swal-cancel-fitrank'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(url, '_blank');
      }
    });
  }

  crearGraficoEstado(): void {
    const ctx = document.getElementById('graficoEstado') as HTMLCanvasElement;
    if (!ctx) return;

    // Datos base
    let activos = this.asistencias.length || 180;
    let inactivos = this.inactivos.length || 20;

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Activos', 'Inactivos'],
        datasets: [{
          data: [activos, inactivos],
          backgroundColor: ['#8c52ff', '#dc3545'],
          borderWidth: 0,
          hoverOffset: 8
        }]
      },
      options: {
        cutout: '70%',
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 800, // ⚡ más rápida
          easing: 'easeInOutCubic'
        },
        plugins: {
          legend: {
            labels: {
              color: '#555',
              font: { size: 12, weight: 600 }
            },
            position: 'bottom'
          }
        }
      }
    });

    // 🔁 Actualización rápida (cada 1.5 segundos)
    setInterval(() => {
      activos += Math.floor(Math.random() * 6 - 3);
      inactivos += Math.floor(Math.random() * 3 - 2);

      if (activos < 0) activos = 0;
      if (inactivos < 0) inactivos = 0;

      chart.data.datasets[0].data = [activos, inactivos];
      chart.update('active'); // efecto con animación leve
    }, 1500);
  }


  crearGraficoAsistencias(): void {
    const ctx = document.getElementById('graficoAsistencias') as HTMLCanvasElement;
    if (!ctx) return;

    // Fechas base
    const fechas = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toLocaleDateString('es-ES');
    });

    const valores = this.asistencias.length
      ? this.asistencias.map(() => Math.floor(Math.random() * 10) + 5)
      : [12, 9, 14, 8, 11, 7, 13];

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: fechas,
        datasets: [{
          label: '',
          data: valores,
          backgroundColor: '#8c52ff',
          borderRadius: 30,
          barThickness: 22
        }]
      },
      options: {
        animation: {
          duration: 700, // ⚡ más fluido
          easing: 'easeOutCubic'
        },
        scales: {
          x: {
            ticks: { color: '#555', font: { size: 11 } },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#555', stepSize: 2 },
            grid: { color: 'rgba(0,0,0,0.05)' }
          }
        },
        plugins: {
          legend: {
            labels: { color: '#555', font: { size: 12, weight: 600 } },
            position: 'top'
          }
        }
      }
    });

    // 🔁 Movimiento constante (cada 1 segundo)
    setInterval(() => {
      const nuevosValores = chart.data.datasets[0].data.map(v => {
        let nuevo = (v as number) + Math.floor(Math.random() * 6 - 3);
        if (nuevo < 0) nuevo = 0;
        return nuevo;
      });
      chart.data.datasets[0].data = nuevosValores;
      chart.update('active');
    }, 1000);
  }
}
