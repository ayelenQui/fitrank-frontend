import { Component, OnInit } from '@angular/core';
import {  AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
import { ConfiguracionGrupoMuscularService, ConfiguracionGrupoMuscularDTO } from '@app/api/services/configuracionGrupoMuscular/configuracionGrupoMuscular.service';

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

  //Animaciones

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
   

  }

 cargarConfiguracionGruposMusculares(): void {
    this.configuracionGrupoMuscularService.obtenerTodas().subscribe({
      next: (data) => {
        this.gruposMuscularesConfig = data;
        console.log('📦 Configuración de grupos musculares:', data);
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

    this.rutinaService.getRutinaCompletaPorSocio(this.socioId).subscribe({
      next: (data) => {
        console.log('📦 Rutinas cargadas:', data);
        this.rutinas = data || [];

        if (rutinaId) {
          this.rutinaSeleccionada = this.rutinas.find(r => r.id === rutinaId) ?? null;

          if (this.rutinaSeleccionada) {
            console.log('✅ Rutina seleccionada:', this.rutinaSeleccionada);
          } else {
            console.warn('⚠️ No se encontró la rutina con id', rutinaId);
          }
        }
      },
      error: (err) => console.error('❌ Error al cargar rutinas', err),
    });
  }


  // 🟢 Seleccionar rutina
  seleccionarRutina(r: RutinaCompletaDTO): void {
    this.rutinaSeleccionada = r;
    this.sesionSeleccionada = null;
    this.ejercicioSeleccionado = null;
  }

  // 🔵 Seleccionar sesión
  seleccionarSesion(s: any): void {
    this.sesionSeleccionada = s;
    this.ejercicioSeleccionado = null;
  }

  // 🟣 Seleccionar ejercicio
  seleccionarEjercicio(e: EjercicioAsignadoDTO): void {
    this.ejercicioSeleccionado = e;
    this.serieActual = e.series?.length ? e.series[0] : null;
  }

  // ▶️ Iniciar entrenamiento (solo una vez por sesión)
  iniciarEntrenamiento(): void {
    if (this.entrenamientoActivo) {
      // Ya hay un entrenamiento activo
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
        console.log('🏋️ Entrenamiento iniciado:', res);
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


  // ⏹️ Detener serie
  finalizarSerie(): void {
    clearInterval(this.intervalo);
    this.entrenando = false;
    this.mostrarRegistro = true; // muestra inputs de actividad real
  }

guardarActividad(): void {
  if (!this.entrenamientoActivo || !this.serieActual || !this.ejercicioSeleccionado) return;

  const dto: RegistrarActividadDTO = this.crearDTOActividad();

  console.log('📤 DTO de actividad a registrar:', dto);

  this.actividadService.registrar(dto).subscribe({
    next: (res) => {
      console.log('✅ Actividad registrada:', res);
      this.reiniciarCronometro();
      

      // 💡 Guardás el puntaje en una lista local, por si querés mostrarlo después
      this.actividadesRealizadas.push(res);

      this.procesarSiguienteSerie();
    },
    error: (err) => {
      console.error('❌ Error al registrar actividad', err);
      console.error('➡️ Detalle:', err.error);
    },
  });
}

/** 🔹 Arma el DTO de la actividad */
private crearDTOActividad(): RegistrarActividadDTO {
  return {
    Duracion: this.tiempoFormateado,
    Repeticiones: this.repeticionesReales,
    Peso: this.pesoReal,
    SerieId: this.serieActual!.id,
    NumeroSerie: this.indiceSerieActual + 1,
  };
}

/** 🔹 Maneja el paso a la siguiente serie o fin del ejercicio */
private procesarSiguienteSerie(): void {
  const series = this.ejercicioSeleccionado?.series || [];

  if (this.indiceSerieActual + 1 < series.length) {
    this.pasarASiguienteSerie(series);
  } else {
    this.finalizarEjercicio();
  }
}

/** 🔹 Avanza a la siguiente serie */
private pasarASiguienteSerie(series: any[]): void {
  this.indiceSerieActual++;
  this.serieActual = series[this.indiceSerieActual];
  this.repeticionesReales = 0;
  this.pesoReal = 0;
  this.mostrarRegistro = false;

  setTimeout(() => this.iniciarSerie(), 400);
}


/** 🔹 Lógica al finalizar todas las series */
private finalizarEjercicio(): void {
  this.serieActual = null;
  this.entrenando = false;
  this.mostrarRegistro = false;
  this.indiceSerieActual = 0;

  if (this.ejercicioSeleccionado) {
    this.ejercicioSeleccionado.completadoHoy = true;
  }

  const ejercicio = this.sesionSeleccionada?.ejerciciosAsignados.find(
    (x: any) => x.id === this.ejercicioSeleccionado?.id
  );
  if (ejercicio) ejercicio.completadoHoy = true;

  const todosCompletados = this.sesionSeleccionada?.ejerciciosAsignados.every((x: any) => x.completadoHoy);

    // 🧮 Calcular el puntaje total del ejercicio actual
  const puntajeEjercicio = this.actividadesRealizadas
    .filter(a => a.serieId && this.ejercicioSeleccionado?.series.some(s => s.id === a.serieId))
    .reduce((acc, a) => acc + (a.punto || 0), 0);

  console.log('📊 Puntaje total del ejercicio:', puntajeEjercicio);

  if (todosCompletados) {
    alert('🏁 ¡Sesión completada por hoy! 🎉');
    this.router.navigate(['/rutina/calcular-puntaje'], {
      state: { 
        puntaje: puntajeEjercicio, 
        rutinaId: this.rutinaSeleccionada?.id,
        entrenamientoId: this.entrenamientoActivo?.id
      },
    });
  } else {
    alert('🏁 Ejercicio completado 🎉');
    this.router.navigate(['/rutina/calcular-puntaje'], {
      state: { 
        puntaje: puntajeEjercicio, 
        rutinaId: this.rutinaSeleccionada?.id
      },
    });
  }
}

/** 🔹 Reinicia el cronómetro */
private reiniciarCronometro(): void {
  this.tiempo = 0;
  if (this.intervalo) clearInterval(this.intervalo);
}
  // guardarActividad(): void {
  //   if (!this.entrenamientoActivo || !this.serieActual || !this.ejercicioSeleccionado) return;

  //   const dto: RegistrarActividadDTO = {
  //     Duracion: this.tiempoFormateado,
  //     Repeticiones: this.repeticionesReales,
  //     Peso: this.pesoReal,
  //     SerieId: this.serieActual.id,
  //     NumeroSerie: this.indiceSerieActual + 1,
  //   };

  //   this.actividadService.registrar(dto).subscribe({
  //     next: (res) => {
  //       console.log('✅ Actividad registrada:', res);

  //       this.reiniciarCronometro();

  //       const series = this.ejercicioSeleccionado?.series || [];

  //       // 🔹 Avanzar índice
  //       if (this.indiceSerieActual + 1 < series.length) {
  //         this.indiceSerieActual++;
  //         this.serieActual = series[this.indiceSerieActual];
  //         this.repeticionesReales = 0;
  //         this.pesoReal = 0;
  //         this.mostrarRegistro = false;

          
  //         setTimeout(() => this.iniciarSerie(), 400);
  //       } else {
         
  //         this.serieActual = null;
  //         this.entrenando = false;
  //         this.mostrarRegistro = false;
  //         this.indiceSerieActual = 0;

          
  //         if (this.ejercicioSeleccionado) {
  //           this.ejercicioSeleccionado.completadoHoy = true;
  //         }
         
  //         const ejercicio = this.sesionSeleccionada?.ejerciciosAsignados.find(
  //           (x: any) => x.id === this.ejercicioSeleccionado?.id
  //         );
  //         if (ejercicio) ejercicio.completadoHoy = true;

         
  //         const todosCompletados = this.sesionSeleccionada?.ejerciciosAsignados.every((x: any) => x.completadoHoy);

  //         if (todosCompletados) {
  //           alert('🏁 ¡Sesión completada por hoy! 🎉');
  //           this.router.navigate(['/rutina/calcular-puntaje'], { queryParams: { entrenamientoId: this.entrenamientoActivo?.id } }); 
  //         } else {
  //           alert('🏁 Ejercicio completado 🎉');
  //           this.volverAEjercicios();
  //         }
  //       }

  //     },
  //     error: (err) => console.error('Error al registrar actividad', err),
  //   });

  // }



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
    console.log('🏁 Entrenamiento finalizado:', this.entrenamientoActivo);
    this.entrenamientoActivo = null;
    this.rutinaSeleccionada = null;
    this.sesionSeleccionada = null;
    this.ejercicioSeleccionado = null;
    this.serieActual = null;
    this.entrenando = false;
  }

  finalizarSesionParcial(): void {
    const confirmar = confirm(
      '¿Querés finalizar la sesión por hoy? Solo se guardarán los ejercicios ya realizados.'
    );
    if (confirmar) {
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
