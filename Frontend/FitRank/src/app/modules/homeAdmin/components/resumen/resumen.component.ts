import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocioService } from '@app/api/services/socio/socio.service';
import { AsistenciaService } from '@app/api/services/asistencia/asistencia.service';
import { AsistenciaDetalleUsuarioDTO, SocioDTO } from '../../../../api/services/asistencia/interface/asistencia.interface';

import { Solicitud } from '@app/api/services/profesor/interfaces/solicitud.interface';
import { SolicitudService } from '@app/api/services/profesor/Solicitud.Service';
import { SignalRNotificacionesService } from '@app/api/services/notificacion/signalr-notificaciones.service';
import Chart from 'chart.js/auto';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import { ActivatedRoute, Router } from '@angular/router';
import { SocioApiService } from '@app/api/services/socio/socioApiService'; 


@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit, AfterViewInit 
 {

  constructor(
    private socioService: SocioService,
    private asistenciaService: AsistenciaService,
    private solicitudService: SolicitudService, 
    public router: Router,
    private signalR: SignalRNotificacionesService,
    private rutinaService: RutinaService,
    private route: ActivatedRoute,
    private socioApiService: SocioApiService
  ) { }
  graficoActivo: string = 'asistencias';

  stats: {
    totalSocios: number;
    sociosActivosHoy: number;
    cuotasPorVencer: number;
    sociosRiesgoAlto: number;
    porcentajeCrecimiento?: number; // <-- le agregas esto
  } = {
      totalSocios: 0,
      sociosActivosHoy: 0,
      cuotasPorVencer: 0,
      sociosRiesgoAlto: 0,
      porcentajeCrecimiento: 60
    };

  personasDentro: number = 0;
  ocupacion: any[] = [];

  pins: any[] = [];
 
  socios: any[] = [];
  sociosRiesgoAlto: any[] = [];
  statsSolicitudes = 0;

  rutinasFavoritasGimnasio: any[] = [];

  socioSeleccionado: SocioDTO | null = null;





  solicitudesPendientes: Solicitud[] = [];

  // ---------- CALENDARIO ----------
  diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  diasCalendario: any[] = [];
  mesActual: number = new Date().getMonth();
  anioActual: number = new Date().getFullYear();
  mesActualNombre: string = '';

  eventos: any[] = [];
  eventosDiaSeleccionado: any[] = [];
  diaSeleccionadoTexto: string = '';

  ngOnInit(): void {
    this.mesActualNombre = this.obtenerNombreMes(this.mesActual);
    this.generarCalendario();

    this.cargarSocios();
    this.cargarAsistenciasHoy();
    this.cargarRiesgoInactivos();
    this.cargarSolicitudesPendientes();
    this.escucharOcupacion();
    this.cargarFavoritasGimnasio(); 
    this.route.queryParams.subscribe(params => {
        const socioId = Number(params['socioId']);
        if (socioId) {
          this.verDetalle(socioId);

          // opcional scroll
          setTimeout(() => {
            const el = document.getElementById('socio-' + socioId);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        }
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
     
    }, 200);
  }

  
verDetalle(id: number) {
    this.socioSeleccionado = this.socios.find(s => s.id === id) || null;
  }

verSocio(id: number) {
  this.router.navigate(['/homeAdmin/socios'], { queryParams: { socioId: id } });
}
  cargarSocios() {
    this.socioService.getSocios().subscribe({
      next: res => {
        this.socios = res;
        this.stats.totalSocios = res.length;

        this.stats.cuotasPorVencer = this.calcularCuotasPorVencer(res);

        this.cargarEventosCalendario(res);
      }
    });
  }



  escucharOcupacion() {
    this.asistenciaService.getOcupacionActual().subscribe(res => {
      this.personasDentro = res.personasDentro;
    });
    this.signalR.ocupacion$.subscribe(evento => {
      if (!evento) return;

      if (evento.tipo === "entrada") {

        this.personasDentro++;

    
        this.pins.push({
          id: evento.usuarioId,
              
          nombre: evento.nombre,
          foto: evento.foto,
          top: Math.random() * 65 + 15,
          left: Math.random() * 65 + 15,
          hora: new Date(evento.fecha)
        });
      }

      if (evento.tipo === "salida") {

   
        if (this.personasDentro > 0) {
          this.personasDentro--;
        }

        this.pins = this.pins.filter(p => p.id !== evento.usuarioId);

      }

      
      this.ocupacion.unshift({
        nombre: evento.nombre,
        foto: evento.foto,
        fecha: new Date(evento.fecha),
        tipo: evento.tipo
      });

      this.ocupacion = this.ocupacion.slice(0, 10);
    });
    }

  cargarAsistenciasHoy() {
    this.asistenciaService.getTodasAsistencias().subscribe({
      next: asistencias => {

        const hoy = new Date().toISOString().split("T")[0];

        this.stats.sociosActivosHoy = asistencias.filter(a =>
          a.fecha.split("T")[0] === hoy
        ).length;
        this.calcularCrecimiento(asistencias);
      }
    });
  }

 
  cargarRiesgoInactivos() {
    this.asistenciaService.getSociosInactivos(5).subscribe({
      next: inactivos => {
        this.sociosRiesgoAlto = inactivos;
        this.stats.sociosRiesgoAlto = inactivos.length;
      }
    });
  }

  calcularRiesgoTotal(socio: any): number {
    return socio.diasInactivo >= 10 ? 90 :
      socio.diasInactivo >= 7 ? 75 :
        socio.diasInactivo >= 5 ? 60 : 25;
  }


  calcularCuotasPorVencer(socios: any[]): number {
    const hoy = new Date();

    return socios.filter(s => {
      if (!s.cuotaPagadaHasta) return false;

      const fecha = new Date(s.cuotaPagadaHasta);
      const diff = (fecha.getTime() - hoy.getTime()) / 86400000;

      return diff >= 0 && diff <= 2;
    }).length;
  }


  cargarEventosCalendario(socios: any[]) {
    this.eventos = socios
      .filter(s => s.cuotaPagadaHasta)
      .map(s => ({
        titulo: `Vence cuota: ${s.nombre} ${s.apellido || ''}`,
        fecha: new Date(s.cuotaPagadaHasta).toISOString().slice(0, 10)
      }));

    this.generarCalendario();
  }

  obtenerNombreMes(mesIndex: number): string {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[mesIndex];
  }

 
  generarCalendario() {
    this.diasCalendario = [];

    const primerDia = new Date(this.anioActual, this.mesActual, 1);
    const ultimoDia = new Date(this.anioActual, this.mesActual + 1, 0);

    const inicio = (primerDia.getDay() + 6) % 7;
    const totalDias = ultimoDia.getDate();

    for (let i = 0; i < inicio; i++) {
      this.diasCalendario.push({ numero: '', esHoy: false });
    }

    for (let i = 1; i <= totalDias; i++) {
      const fecha = new Date(this.anioActual, this.mesActual, i);
      const fechaISO = fecha.toISOString().slice(0, 10);

      this.diasCalendario.push({
        numero: i,
        fechaISO,
        esHoy: fechaISO === new Date().toISOString().slice(0, 10),
        tieneEvento: this.eventos.some(e => e.fecha === fechaISO)
      });
    }
  }

  mesAnterior() {
    if (this.mesActual === 0) {
      this.mesActual = 11;
      this.anioActual--;
    } else {
      this.mesActual--;
    }
    this.mesActualNombre = this.obtenerNombreMes(this.mesActual);
    this.generarCalendario();
  }

  mesSiguiente() {
    if (this.mesActual === 11) {
      this.mesActual = 0;
      this.anioActual++;
    } else {
      this.mesActual++;
    }
    this.mesActualNombre = this.obtenerNombreMes(this.mesActual);
    this.generarCalendario();
  }

  seleccionarDia(day: any) {
    if (!day.numero) return;

    const fechaDia = day.fechaISO;
    this.diaSeleccionadoTexto = `${day.numero}/${this.mesActual + 1}/${this.anioActual}`;

    this.eventosDiaSeleccionado = this.eventos.filter(ev => ev.fecha === fechaDia);
  }

  irASociosRiesgo() {
    this.router.navigate(['/homeAdmin/socios']);
  }

  cargarSolicitudesPendientes() {
    this.solicitudService.obtenerPendientes().subscribe({
      next: res => {
        this.solicitudesPendientes = res;
        this.statsSolicitudes = res.length;
      },
      error: err => {
        console.error('Error al obtener solicitudes pendientes:', err);
      }
    });
  }
  calcularCrecimiento(asistencias: any[]) {
    const hoy = new Date();
    const hace7dias = new Date();
    hace7dias.setDate(hoy.getDate() - 7);

    const hoyISO = hoy.toISOString().split("T")[0];
    const hace7ISO = hace7dias.toISOString().split("T")[0];

    
    const activosHoy = asistencias.filter(a => a.fecha.split("T")[0] === hoyISO);


    const activosHace7 = asistencias.filter(a => a.fecha.split("T")[0] === hace7ISO);

    if (activosHace7.length === 0) {
      this.stats.porcentajeCrecimiento = 100; 
      return;
    }

    const crecimiento = ((activosHoy.length - activosHace7.length) / activosHace7.length) * 100;

    this.stats.porcentajeCrecimiento = Math.round(crecimiento);
  }


  generarInvitacion() {
    this.router.navigate(['/admin-invitacion']);
  } 
  cargarFavoritasGimnasio() {
    const gymId = Number(localStorage.getItem('gimnasioId'));

    this.rutinaService.getFavoritasGimnasio(gymId).subscribe({
      next: res => this.rutinasFavoritasGimnasio = res,
      error: err => console.error(err)
    });
  }

  irANotificaciones() {
    this.router.navigate(['/homeAdmin/notificaciones']);
  }
}
