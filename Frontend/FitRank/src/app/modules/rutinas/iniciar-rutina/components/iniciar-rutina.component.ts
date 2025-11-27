import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { SidebarSocioComponent } from '@app/public/sidebar-socio/sidebar-socio.component';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { EntrenamientoService } from '@app/api/services/entrenamiento/entrenamiento.service';
import { ActividadService } from '@app/api/services/actividad/actividad.service';
import { RutinaCompletaDTO, EjercicioAsignadoDTO, SerieDTO } from '@app/api/services/rutina/interfaces/rutina.interface.rest';
import { AgregarActividadDTO, RegistrarActividadDTO } from '@app/api/services/actividad/interface/actividad.interface';
import { AgregarEntrenamientoDTO, EntrenamientoDTO } from '@app/api/services/entrenamiento/interface/entrenamiento.interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import gsap from 'gsap';
import { ActivatedRoute } from '@angular/router';
import { SesionDTO } from '../../../../api/services/sesion/interface/sesion.interface';
import { ConfiguracionGrupoMuscularService } from '@app/api/services/configuracionGrupoMuscular/configuracionGrupoMuscular.service';
import { ConfiguracionGrupoMuscularDTO } from '@app/api/services/configuracionGrupoMuscular/interfaces/configuracionGrupoMuscular.interface'; 
import Swal from 'sweetalert2';


@Component({
  selector: 'app-iniciar-rutina',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderSocioComponent, SidebarSocioComponent],
  templateUrl: './iniciar-rutina.component.html',
  styleUrls: ['./iniciar-rutina.component.css'],

})
export class IniciarRutinaComponent implements OnInit, AfterViewInit {
  gruposMuscularesConfig: ConfiguracionGrupoMuscularDTO[] = [];
  @ViewChild('sesionesContainer', { static: false }) sesionesContainer!: ElementRef;
  sidebarOpen: boolean = false;
  private anim?: gsap.core.Tween;
  mostrandoCuentaRegresiva = false;
  cuenta = 3;
  socioId!: number;
  diaActual: any;

  rutinas: RutinaCompletaDTO[] = [];

  indiceSerieActual: number = 0;
  rutinaSeleccionada: RutinaCompletaDTO | null = null;
  sesionSeleccionada: any | null = null;
  ejercicioSeleccionado: EjercicioAsignadoDTO | null = null;
  serieActual: SerieDTO | null = null;
  entrenamientoActivo: EntrenamientoDTO | null = null;

  entrenando = false;
  mostrarRegistro = false;
  ejercicioCompletado = false;

  tiempo = 0;
  intervalo: any;

  pesoReal: number = 0;
  repeticionesReales: number = 0;

  fechaActual = new Date();
  diasSemana: any[] = [];
  indiceDiaActual = 0;
  actividadesRealizadas: any[] = [];

  constructor(
    private rutinaService: RutinaService,
    private auth: AuthService,
    private entrenamientoService: EntrenamientoService,
    private actividadService: ActividadService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private configuracionGrupoMuscularService: ConfiguracionGrupoMuscularService
  ) { }



  ngAfterViewInit(): void {
    const observer = new MutationObserver(() => {
      const container = this.sesionesContainer?.nativeElement;
      if (!container) return;

      const cards = container.querySelectorAll('.sesion-card');
      if (cards.length > 0) {
        this.iniciarAnimacion(cards, container);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }


  private iniciarAnimacion(cards: NodeListOf<Element>, container: HTMLElement) {
    gsap.killTweensOf(cards);

    const total = cards.length;
    const distance = -100 * total;

    const anim = gsap.to(cards, {

      duration: 1 * total,
      repeat: -1,
      modifiers: {
        xPercent: gsap.utils.wrap(100, 0)
      }
    });

    container.addEventListener('mouseenter', () => anim.pause());
    container.addEventListener('touchstart', () => anim.pause());
    container.addEventListener('touchend', () => anim.resume());
    container.addEventListener('mouseleave', () => anim.resume());


  }




  ngOnInit(): void {
    const user = this.auth.obtenerUser();
    this.socioId = Number(user?.Id ?? user?.id);
    if (!this.socioId || Number.isNaN(this.socioId)) {
      console.error('❌ socioId inválido:', this.socioId);
      return;
    }

    const hoy = new Date().getDay();
    this.diaActual = this.rutinaSeleccionada?.sesiones?.[hoy % this.rutinaSeleccionada.sesiones.length];
    this.cargarRutinas();
    this.generarSemana();
    this.cargarConfiguracionGruposMusculares()
    this.cargarActividadesDesdeLocalStorage();


  }

  cargarActividadesDesdeLocalStorage(): void {
  const key = `actividades_${this.socioId}`;
  const guardado = localStorage.getItem(key);

  if (guardado) {
    this.actividadesRealizadas = JSON.parse(guardado);
  }
}

  

  cargarConfiguracionGruposMusculares(): void {
    this.configuracionGrupoMuscularService.obtenerTodas().subscribe({
      next: (data) => {
        this.gruposMuscularesConfig = data;
      },
      error: (err) => console.error('❌ Error al cargar configuraciones', err)
    });
  }

  generarSemana(): void {
    const hoy = new Date();
    const primerDia = new Date(hoy);
    primerDia.setDate(hoy.getDate() - hoy.getDay() + 1); // lunes

    this.diasSemana = Array.from({ length: 7 }, (_, i) => {
      const fecha = new Date(primerDia);
      fecha.setDate(primerDia.getDate() + i);
      return {
        nombre: fecha.toLocaleDateString('es-ES', { weekday: 'short' }),
        numero: fecha.getDate(),
        fecha
      };
    });

    this.indiceDiaActual = this.diasSemana.findIndex(d => d.fecha.toDateString() === hoy.toDateString());
  }

  seleccionarDia(index: number): void {
    this.indiceDiaActual = index;
    this.fechaActual = this.diasSemana[index].fecha;
  }

  irAHoy(): void {
    this.generarSemana();
  }


cargarRutinas(): void {
  const idParam = this.route.snapshot.paramMap.get('id');
  const rutinaId = idParam ? Number(idParam) : null;

  // Capturamos state entrante (pudo venir desde calcular-puntaje)
  const navState: any = history.state || {};
  const restoreSesionId = navState.sesionId;
  const restoreEntrenamientoId = navState.entrenamientoId;

  this.rutinaService.getRutinaCompletaPorSocio(this.socioId).subscribe({
    next: (data) => {
      this.rutinas = data || [];
      //NUEVO
    this.rutinas.forEach(r => {
      r.sesiones?.forEach(s => {
        s.ejerciciosAsignados?.forEach(e => {
          e.completadoHoy = this.actividadesRealizadas.some(a =>
            e.series.some(s => s.id === a.serieId)
          );
        });
      });
    });

      if (rutinaId) {
        this.rutinaSeleccionada = this.rutinas.find(r => r.id === rutinaId) ?? null;
        if (this.rutinaSeleccionada) {
        } else {
          console.warn('⚠️ No se encontró la rutina con id', rutinaId);
        }
      }

      // Si el navigation state incluye sesionId -> restauramos sesionSeleccionada
      if (restoreSesionId && this.rutinaSeleccionada) {
        // buscar la sesión dentro de la rutina
        const foundSesion = this.rutinaSeleccionada.sesiones?.find((s: any) => s.id === restoreSesionId);
        if (foundSesion) {
          this.sesionSeleccionada = foundSesion;
        } else {
          // si no existe id (quizás usás numeroDeSesion en lugar de id)
          const foundByNumero = this.rutinaSeleccionada.sesiones?.find((s: any) => s.numeroDeSesion === restoreSesionId);
          if (foundByNumero) {
            this.sesionSeleccionada = foundByNumero;
          }
        }
      }

      // Restaurar entrenamiento activo de forma mínima (evita crear uno nuevo al volver)
      if (restoreEntrenamientoId) {
        // colocamos un objeto con el id para marcar que existe entrenamientoActivo
        this.entrenamientoActivo = { id: restoreEntrenamientoId } as any;
      }
    },
    error: (err) => console.error('❌ Error al cargar rutinas', err),
  });
}




 
  seleccionarRutina(r: RutinaCompletaDTO): void {
    this.rutinaSeleccionada = r;
    this.sesionSeleccionada = null;
    this.ejercicioSeleccionado = null;
  }


  seleccionarSesion(s: any): void {
    this.sesionSeleccionada = s;
    this.ejercicioSeleccionado = null;

    // Limpiamos actividades del día si queremos reiniciar
    this.actividadesRealizadas = [];
    localStorage.removeItem(`actividades_${this.socioId}`);

    // NUEVO
     // Inicializar completados hoy si no existe
    this.sesionSeleccionada.ejerciciosAsignados.forEach((e: EjercicioAsignadoDTO) => {
      if (e.completadoHoy === undefined) e.completadoHoy = false;
    });

      // 🔥 NUEVO: Si ya terminó todos los ejercicios al entrar
  const todosCompletados = this.sesionSeleccionada.ejerciciosAsignados.every(
    (x: any) => x.completadoHoy === true
  );

  if (todosCompletados) {
    this.finalizarSesionAutomaticamente();
  }
  }

  private finalizarSesionAutomaticamente(): void {

  Swal.fire({
    title: "🏁 ¡Sesión completada!",
    text: "Ya realizaste todos los ejercicios por hoy 💪",
    imageUrl: "assets/img/logo/logo-negro-lila.svg",
    imageWidth: 90,
    imageHeight: 90,
    confirmButtonColor: "#8c52ff",
    confirmButtonText: "Ver puntaje"
  }).then(() => {
    // Limpiamos actividades del día
    this.actividadesRealizadas = [];
    localStorage.removeItem(`actividades_${this.socioId}`);

    const puntajeTotal = this.calcularPuntajeTotal();

    const navState: any = {
      puntaje: puntajeTotal,
      rutinaId: this.rutinaSeleccionada?.id,
      sesionId: this.sesionSeleccionada?.id,
      entrenamientoId: this.entrenamientoActivo?.id
    };

    this.router.navigate(['/rutina/calcular-puntaje'], { state: navState });
  });
}

private calcularPuntajeTotal(): number {
  return this.actividadesRealizadas
    .filter(a =>
      this.sesionSeleccionada?.ejerciciosAsignados.some((e: any) =>
        e.series.some((s: any) => s.id === a.serieId)
      )
    )
    .reduce((acc, a) => acc + (a.punto || 0), 0);
}



  seleccionarEjercicio(e: EjercicioAsignadoDTO): void {
    this.ejercicioSeleccionado = e;
    this.serieActual = e.series?.length ? e.series[0] : null;
  }

  
  iniciarEntrenamiento(): void {
    if (this.entrenamientoActivo) {
      
      this.iniciarSerie();
      return;
    }

    const dto: AgregarEntrenamientoDTO = {
      fecha: new Date(),
      duracion: "00:00:00",
      socioId: this.socioId
    };

    this.entrenamientoService.crearEntrenamiento(dto).subscribe({
      next: (res) => {
        this.entrenamientoActivo = res;
        this.iniciarSerie();
      },
      error: (err) => console.error('Error al crear entrenamiento', err),
    });
  }

  iniciarSerie(): void {
    if (!this.ejercicioSeleccionado) return;

    const series = this.ejercicioSeleccionado.series;
    this.serieActual = series[this.indiceSerieActual] || null;

    this.tiempo = 0;
    this.entrenando = true;
    this.mostrarRegistro = false;

    this.intervalo = setInterval(() => this.tiempo++, 1000);
  }


  
  finalizarSerie(): void {
    clearInterval(this.intervalo);
    this.entrenando = false;
    this.mostrarRegistro = true; 
  }

  guardarActividad(): void {
    if (!this.entrenamientoActivo || !this.serieActual || !this.ejercicioSeleccionado) return;

    const dto: RegistrarActividadDTO = this.crearDTOActividad();

    this.actividadService.registrar(dto).subscribe({
      next: (res) => {
        this.reiniciarCronometro();


     
        this.actividadesRealizadas.push(res);

        this.guardarActividadesEnLocalStorage();

        this.procesarSiguienteSerie();
      },
      error: (err) => {
        console.error('❌ Error al registrar actividad', err);
        console.error('➡️ Detalle:', err.error);
      },
    });
  }

  guardarActividadesEnLocalStorage(): void {
  const key = `actividades_${this.socioId}`;
  localStorage.setItem(key, JSON.stringify(this.actividadesRealizadas));
}


  private crearDTOActividad(): RegistrarActividadDTO {
    return {
      Duracion: this.tiempoFormateado,
      Repeticiones: this.repeticionesReales,
      Peso: this.pesoReal,
      SerieId: this.serieActual!.id,
      NumeroSerie: this.indiceSerieActual + 1,
    };
  }

  
  private procesarSiguienteSerie(): void {
    const series = this.ejercicioSeleccionado?.series || [];

    if (this.indiceSerieActual + 1 < series.length) {
      this.pasarASiguienteSerie(series);
    } else {
      this.finalizarEjercicio();
    }
  }


  private pasarASiguienteSerie(series: any[]): void {
    this.indiceSerieActual++;
    this.serieActual = series[this.indiceSerieActual];
    this.repeticionesReales = 0;
    this.pesoReal = 0;
    this.mostrarRegistro = false;

    setTimeout(() => this.iniciarSerie(), 400);
  }


  
private finalizarEjercicio(): void {
  this.serieActual = null;
  this.entrenando = false;
  this.mostrarRegistro = false;
  this.indiceSerieActual = 0;

  if (this.sesionSeleccionada && this.ejercicioSeleccionado) {
    this.ejercicioSeleccionado.completadoHoy = true;

    const ejercicio = this.sesionSeleccionada.ejerciciosAsignados.find(
      (      x: { id: number | undefined; }) => x.id === this.ejercicioSeleccionado?.id
    );
    if (ejercicio) ejercicio.completadoHoy = true;
  }

  const todosCompletados = !!this.sesionSeleccionada?.ejerciciosAsignados.every(
    (    x: { completadoHoy: any; }) => x.completadoHoy
  );

  const puntajeEjercicio = this.actividadesRealizadas
    .filter(
      a =>
        a.serieId &&
        this.ejercicioSeleccionado?.series.some(s => s.id === a.serieId)
    )
    .reduce((acc, a) => acc + (a.punto || 0), 0);

  const navState: any = {
    puntaje: puntajeEjercicio,
    rutinaId: this.rutinaSeleccionada?.id
  };

  if (this.entrenamientoActivo?.id) navState.entrenamientoId = this.entrenamientoActivo.id;
  if (this.sesionSeleccionada?.id) navState.sesionId = this.sesionSeleccionada.id;
  else if (this.sesionSeleccionada?.numeroDeSesion) navState.sesionId = this.sesionSeleccionada.numeroDeSesion;

  navState.sinEjercicios = todosCompletados;

  if (todosCompletados) {
    Swal.fire({
      title: "🏁 ¡Sesión completada por hoy!",
      text: "Excelente trabajo  Completaste todo tu entrenamiento. ¡Seguimos sumando puntos!",
      imageUrl: "assets/img/logo/logo-negro-lila.svg",
      imageWidth: 90,
      imageHeight: 90,
      imageAlt: "FitRank Logo",
      color: "#white",
      confirmButtonColor: "#8c52ff",
      confirmButtonText: "Ver mi puntaje",
      showClass: { popup: "animate__animated animate__fadeInUp animate__faster" },
      hideClass: { popup: "animate__animated animate__fadeOutDown animate__faster" }
    }).then(() => this.router.navigate(['/rutina/calcular-puntaje'], { state: navState }));
    return;
  }

  Swal.fire({
    title: "✅ ¡Ejercicio completado!",
    text: "¡Buen trabajo! 💥 Calculando tus puntos.",
    imageUrl: "assets/img/logo/logo-negro-lila.svg",
    imageWidth: 80,
    imageHeight: 80,
    color: "#white",
    confirmButtonColor: "#8c52ff",
    confirmButtonText: "Continuar",
    showClass: { popup: "animate__animated animate__fadeInUp animate__faster" },
    hideClass: { popup: "animate__animated animate__fadeOutDown animate__faster" }
  }).then(() => this.router.navigate(['/rutina/calcular-puntaje'], { state: navState }));
}




  
  private reiniciarCronometro(): void {
    this.tiempo = 0;
    if (this.intervalo) clearInterval(this.intervalo);
  }
  


  get tiempoFormateado(): string {
    const horas = Math.floor(this.tiempo / 3600);
    const minutos = Math.floor((this.tiempo % 3600) / 60);
    const segundos = this.tiempo % 60;

    // Formato "hh:mm:ss"
    const hh = horas.toString().padStart(2, '0');
    const mm = minutos.toString().padStart(2, '0');
    const ss = segundos.toString().padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
  }

  volverARutinas(): void {
    // Limpiamos el progreso del día
    //localStorage.removeItem(`actividades_${this.socioId}`);

    this.rutinaSeleccionada = null;
    this.sesionSeleccionada = null;
    this.ejercicioSeleccionado = null;
  }

  volverASesiones(): void {
    this.ejercicioSeleccionado = null;
  }

  volverAEjercicios(): void {
    this.mostrarRegistro = false;
    this.serieActual = null;
    this.ejercicioSeleccionado = null;
  }


  finalizarEntrenamiento(): void {
    // Limpiar actividades
    this.actividadesRealizadas = [];
    localStorage.removeItem(`actividades_${this.socioId}`);

    this.entrenamientoActivo = null;
    this.rutinaSeleccionada = null;
    this.sesionSeleccionada = null;
    this.ejercicioSeleccionado = null;
    this.serieActual = null;
    this.entrenando = false;
  }
  mostrarCuenta(): void {
    this.mostrandoCuentaRegresiva = true;
    this.cuenta = 3;

    const interval = setInterval(() => {
      this.cuenta--;

      if (this.cuenta === 0) {
        clearInterval(interval);
        this.mostrandoCuentaRegresiva = false;
        this.iniciarEntrenamiento(); 
      }
    }, 1000);
  }
  finalizarSesionParcial(): void {
    const confirmar = confirm(
      '¿Querés finalizar la sesión por hoy? Solo se guardarán los ejercicios ya realizados.'
    );
    if (confirmar) {
      this.actividadesRealizadas = [];
      localStorage.removeItem(`actividades_${this.socioId}`);
      
      this.router.navigate(['/rutina/mis-rutinas']);
    }
  }
  calcularDuracionTotal(ejerciciosAsignados: any[]): number {
    if (!ejerciciosAsignados || ejerciciosAsignados.length === 0) return 0;

    return ejerciciosAsignados.reduce((total, e) => {
      const duracionEstimada = e.ejercicio?.duracionEstimada || 0;
      return total + duracionEstimada;
    }, 0);
  }



  volverAtras(): void {
    this.location.back();
  }


  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    document.body.classList.toggle('sb-open', this.sidebarOpen);
  }
}
