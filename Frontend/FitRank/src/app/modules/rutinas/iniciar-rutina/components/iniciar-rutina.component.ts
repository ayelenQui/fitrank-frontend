import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EjercicioAsignadoService } from '@app/api/ejercicioAsignado/ejercisioAsignado.service';
import { SerieAsignadaService } from '@app/api/services/serieAsignada/serieAsignada.service';
import { EjercicioRealizadoService } from '@app/api/services/ejercicioRealizado/ejercicioRealizado.service';
import { SerieRealizadaService } from '@app/api/services/serieRealizada/serieRealizada.service';
import { SesionRealizadaDeEjerciciosService } from '@app/api/services/sesionRealizadaDeEjercicios/sesionRealizadaDeEjercicios.service';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { gsap } from 'gsap';
import { EjercicioAsignadoDTO } from '@app/api/ejercicioAsignado/interfaces/ejercicioAsignado.interface.rest';
import { SerieAsignadaCreateDTO } from '@app/api/services/serieAsignada/interfaces/serieAsignada.interface.rest';
import { CrearSesionRealizadaDeEjerciciosDTO } from '@app/api/services/sesionRealizadaDeEjercicios/interfaces/sesionRealizadaDeEjercicios.interface';
import { CrearEjercicioRealizadoDTO } from '@app/api/services/ejercicioRealizado/interfaces/ejercicioRealizado.interface.rest';
import { CrearSerieRealizadaDTO } from '@app/api/services/serieRealizada/interfaces/serieRealizada.interface';
import { PuntajeService } from '@app/api/services/puntaje/puntaje.service';
import { Location } from '@angular/common';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';

@Component({
  selector: 'app-iniciar-rutina',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderSocioComponent],
  templateUrl: './iniciar-rutina.component.html',
styleUrls: ['./iniciar-rutina.component.css', '../../../css-socio/socio-common.css']
})
export class IniciarRutinaComponent implements OnInit, OnDestroy {
  rutinaId!: number;
  socioId!: number;
  ejerciciosAsignados: EjercicioAsignadoDTO[] = [];
  seriesActuales: SerieAsignadaCreateDTO[] = [];

  ejercicioActivo?: EjercicioAsignadoDTO;
  serieActivaIndex = 0;
  tiempoRestante = 0;
  cronometro: any;
  enEjecucion = false;
  sesionInicio?: Date;
  sesionDeEjerciciosId?: number;
  puedeEditar = false;
  private circle!: SVGCircleElement;
  private circleLength = 339.292; // circunferencia del círculo
  private tiempoTotal = 60; // segundos totales del cronómetro

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ejercicioAsignadoService: EjercicioAsignadoService,
    private serieAsignadaService: SerieAsignadaService,
    private ejercicioRealizadoService: EjercicioRealizadoService,
    private serieRealizadaService: SerieRealizadaService,
    private sesionRealizadaDeEjerciciosService: SesionRealizadaDeEjerciciosService,
    private auth: AuthService,
    private puntajeService: PuntajeService,
    private location: Location


  ) { }

  ngOnInit(): void {
    const user = this.auth.obtenerUser();
    this.socioId = user?.Id;
    this.rutinaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarEjercicios();

  }
  getImagenEjercicio(nombre?: string): string {
    if (!nombre) {
      return 'https://images.unsplash.com/photo-1579758629934-095f22032a9b?auto=format&fit=crop&w=900&q=80';
    }

    const n = nombre.toLowerCase();

    const imagenes: { [key: string]: string } = {
      // 👕 HOMBRO
      'press militar con barra': 'https://images.unsplash.com/photo-1594737625785-c84f744de6a1?auto=format&fit=crop&w=900&q=80',
      'elevaciones laterales con mancuernas': 'https://images.unsplash.com/photo-1605296867304-7e562d4dfd45?auto=format&fit=crop&w=900&q=80',
      'face pull en polea': 'https://images.pexels.com/photos/4761793/pexels-photo-4761793.jpeg?auto=compress&cs=tinysrgb&w=900',

      // 💪 BÍCEPS
      'curl con barra': 'https://images.unsplash.com/photo-1605296867304-7e562d4dfd45?auto=format&fit=crop&w=900&q=80',
      'curl alternado con mancuernas': 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=900',
      'curl en banco scott': 'https://images.pexels.com/photos/7031700/pexels-photo-7031700.jpeg?auto=compress&cs=tinysrgb&w=900',

      // 💪 TRÍCEPS
      'fondos en paralelas': 'https://images.unsplash.com/photo-1605296867424-35fc25c9212c?auto=format&fit=crop&w=900&q=80',
      'extensión en polea alta': 'https://images.pexels.com/photos/6453393/pexels-photo-6453393.jpeg?auto=compress&cs=tinysrgb&w=900',
      'press cerrado': 'https://images.pexels.com/photos/7031700/pexels-photo-7031700.jpeg?auto=compress&cs=tinysrgb&w=900',

      // 🦵 PIERNA / CUÁDRICEPS / FEMORAL
      'sentadillas con barra': 'https://images.unsplash.com/photo-1571019613914-85f342c85ddf?auto=format&fit=crop&w=900&q=80',
      'prensa 45°': 'https://images.pexels.com/photos/6453393/pexels-photo-6453393.jpeg?auto=compress&cs=tinysrgb&w=900',
      'extensiones de cuádriceps': 'https://images.pexels.com/photos/7031700/pexels-photo-7031700.jpeg?auto=compress&cs=tinysrgb&w=900',
      'peso muerto rumano': 'https://images.unsplash.com/photo-1605296867304-7e562d4dfd45?auto=format&fit=crop&w=900&q=80',
      'curl femoral acostado': 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=900',
      'nordic curl': 'https://images.pexels.com/photos/6453393/pexels-photo-6453393.jpeg?auto=compress&cs=tinysrgb&w=900',
      'curl femoral de pie en polea': 'https://images.pexels.com/photos/3823086/pexels-photo-3823086.jpeg?auto=compress&cs=tinysrgb&w=900',
      'buenos días': 'https://images.unsplash.com/photo-1605296867304-7e562d4dfd45?auto=format&fit=crop&w=900&q=80',
      'buenos días con mancuernas': 'https://images.pexels.com/photos/6453393/pexels-photo-6453393.jpeg?auto=compress&cs=tinysrgb&w=900',

      // 🦵 GEMELOS
      'elevación de talones de pie': 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=900',
      'elevación de talones sentado': 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=900',
      'saltos de comba (gemelos)': 'https://images.unsplash.com/photo-1583454110558-3fb497c0c08d?auto=format&fit=crop&w=900&q=80',

      // 🦴 ABDOMINALES
      'crunch en colchoneta': 'https://images.unsplash.com/photo-1571019613914-85f342c85ddf?auto=format&fit=crop&w=900&q=80',
      'plancha frontal': 'https://images.pexels.com/photos/4162442/pexels-photo-4162442.jpeg?auto=compress&cs=tinysrgb&w=900',
      'elevación de piernas': 'https://images.pexels.com/photos/6453393/pexels-photo-6453393.jpeg?auto=compress&cs=tinysrgb&w=900',

      // 🦵 ESPALDA
      'dominadas pronas': 'https://images.pexels.com/photos/6453393/pexels-photo-6453393.jpeg?auto=compress&cs=tinysrgb&w=900',
      'remo con barra': 'https://images.unsplash.com/photo-1605296867304-7e562d4dfd45?auto=format&fit=crop&w=900&q=80',
      'jalón al pecho': 'https://images.pexels.com/photos/3823086/pexels-photo-3823086.jpeg?auto=compress&cs=tinysrgb&w=900',

      // 🫀 PECHO
      'press de banca': 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=900&q=80',
      'aperturas con mancuernas': 'https://images.pexels.com/photos/7031700/pexels-photo-7031700.jpeg?auto=compress&cs=tinysrgb&w=900',
      'fondos en paralelas (pecho)': 'https://images.pexels.com/photos/4761793/pexels-photo-4761793.jpeg?auto=compress&cs=tinysrgb&w=900'
    };

    const key = Object.keys(imagenes).find(k => n.includes(k));
    return key ? imagenes[key] : 'https://images.unsplash.com/photo-1579758629934-095f22032a9b?auto=format&fit=crop&w=900&q=80';
  }


  // 🔹 1. Cargar ejercicios asignados
  cargarEjercicios(): void {
    this.ejercicioAsignadoService.getEjerciciosAsignados().subscribe({
      next: (data) => {
        this.ejerciciosAsignados = data.filter(e => e.rutinaId === this.rutinaId);
      },
      error: (err) => console.error('❌ Error al cargar ejercicios asignados:', err)
    });
  }

  // 🔹 2. Seleccionar ejercicio → cargar series
  seleccionarEjercicio(e: EjercicioAsignadoDTO): void {
    this.ejercicioActivo = e;
    this.iniciarSesionSiNoExiste();
    this.cargarSeries(e.id);
  }

  // 🔹 3. Cargar series de ese ejercicio asignado
  cargarSeries(ejercicioAsignadoId: number): void {
    // traemos TODAS las series y filtramos las que correspondan al ejercicio activo
    this.serieAsignadaService.getAll().subscribe({
      next: (data) => {
        this.seriesActuales = data.filter(s => s.ejercicioAsignadoId === ejercicioAsignadoId);
        console.log('📦 Series filtradas:', this.seriesActuales);
        this.serieActivaIndex = 0;
        this.puedeEditar = false;
      },
      error: (err) => console.error('❌ Error al cargar series asignadas:', err)
    });
  }


  // 🔹 Crear una sesión general de ejercicios si no existe
  iniciarSesionSiNoExiste(): void {
    if (this.sesionInicio) return; // ya existe

    this.sesionInicio = new Date();
    const payload: CrearSesionRealizadaDeEjerciciosDTO = {
      fecha: this.sesionInicio.toISOString(),
      duracion: '00:00:00',
      numeroDeSesion: 1
    };

    this.sesionRealizadaDeEjerciciosService.crear(payload).subscribe({
      next: (res) => {
        this.sesionDeEjerciciosId = res.id;
        console.log('✅ Sesión de ejercicios creada:', res);
      },
      error: (err) => console.error('❌ Error al crear sesión de ejercicios:', err)
    });
  }

  // 🔹 Método para iniciar el cronómetro
  iniciarSerie() {
    if (this.enEjecucion) return; // evita doble inicio
    this.enEjecucion = true;

    // Inicializa el tiempo
    this.tiempoRestante = 0;

    // Configura el círculo (vacío al inicio)
    if (this.circle) {
      this.circleLength = this.circle.getTotalLength();

      gsap.set(this.circle, {
        strokeDasharray: this.circleLength,
        strokeDashoffset: this.circleLength
      });

      // 🔹 Animación de rotación infinita del trazo
      gsap.to(this.circle, {
        strokeDashoffset: 0,
        duration: 3, // velocidad de la vuelta
        ease: 'linear',
        repeat: -1, // infinito
        yoyo: true  // va y vuelve
      });
    }

    // 🔹 Inicia el contador numérico (aumenta sin límite)
    this.cronometro = setInterval(() => {
      this.tiempoRestante++;
    }, 1000);
  }


  // 🔹 Propiedades visuales del countdown
  showCountdown = false;
  countdownNumber = 3;

  /**
   * ▶ Método de inicio con cuenta regresiva GSAP (3-2-1)
   * i = índice de la serie sobre la que se hizo clic
   */
  startCountdown(i: number): void {
    // no iniciar si ya hay una serie corriendo
    if (this.enEjecucion) return;

    // definimos qué serie está activa
    this.serieActivaIndex = i;
    this.showCountdown = true;
    this.countdownNumber = 3;

    // timeline GSAP para la animación de números
    const tl = gsap.timeline({
      defaults: { ease: 'back.out(1.7)' },
      onComplete: () => {
        this.showCountdown = false;
        this.iniciarSerie(); // 👈 llama a tu método original
      }
    });

    // secuencia de 3 → 2 → 1
    [3, 2, 1].forEach((num) => {
      tl.call(() => { this.countdownNumber = num; })
        .fromTo(
          '#countdownCircle',
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4 }
        )
        .to('#countdownCircle', { opacity: 0, duration: 0.2 });
    });

  }



  finalizarSerie(): void {
    // Detiene el contador
    clearInterval(this.cronometro);
    this.enEjecucion = false;
    this.puedeEditar = true;
    this.tiempoRestante = 0;
    // Detiene animación de GSAP
    gsap.killTweensOf(this.circle);

    // Deja el trazo en estado final (por ejemplo, completado)
    if (this.circle) {
      gsap.to(this.circle, {
        strokeDashoffset: 0,
        duration: 0.4,
        ease: 'power1.out'
      });
    }
  }

  // 🔹 Pasar a la siguiente serie o registrar ejercicio si termina
  siguienteSerie(): void {
    if (this.serieActivaIndex < this.seriesActuales.length - 1) {
      this.serieActivaIndex++;
      this.puedeEditar = false;
    } else {
      alert('✅ Completaste todas las series');
      this.registrarEjercicio();
    }
  }

  // 🔹 Registrar ejercicio realizado + series realizadas
  registrarEjercicio(): void {
    if (!this.ejercicioActivo) return;

    const payloadEjercicio: CrearEjercicioRealizadoDTO = {
      ejercicioId: this.ejercicioActivo.ejercicioId,
      socioId: this.socioId,
      rutinaId: this.rutinaId
    };

    this.ejercicioRealizadoService.crear(payloadEjercicio).subscribe({
      next: (ejRealizado) => {
        const series = this.seriesActuales.map((s, i) => ({
          repeticiones: s.repeticiones,
          peso: s.peso,
          rir: s.rir ?? 0,
          numeroDeSerie: s.nroSerie ?? i + 1,
          ejercicioRealizadoId: ejRealizado.id
        }));

        series.forEach(serie => {
          this.serieRealizadaService.crear(serie).subscribe({
            next: (serieCreada) => {
              console.log('✅ Serie realizada guardada:', serieCreada);

              
              // 🔹 Al finalizar cada serie, asignamos un puntaje
              const puntaje = {
                serieRealizadaId: serieCreada.id,
                motivo: 'Serie completada exitosamente',
                fecha: new Date().toISOString(),
                valor: 10 // o podés calcularlo dinámicamente
              };

              this.puntajeService.crear(puntaje).subscribe({
                next: (res) => console.log('🏆 Puntaje asignado:', res),
                error: (err) => console.error('❌ Error al asignar puntaje:', err)
              });
            },
            error: (err) => console.error('❌ Error al guardar serie', err)
          });
        });
      }
    });
  }
      
      // 🔹 Finalizar rutina → guarda duración total
      finalizarRutina(): void {
        if (!this.sesionInicio) return;

        const fin = new Date();
        const duracionMs = fin.getTime() - this.sesionInicio.getTime();
        const duracion = new Date(duracionMs).toISOString().substring(11, 19); // hh:mm:ss

        const payload: CrearSesionRealizadaDeEjerciciosDTO = {
          fecha: this.sesionInicio.toISOString(),
          duracion,
          numeroDeSesion: 1
        };

        this.sesionRealizadaDeEjerciciosService.crear(payload).subscribe({
          next: () => {
            alert('🏁 Rutina completada y sesión guardada');
            this.router.navigate(['/rutina/mis-rutinas']);
          },
          error: (err) => console.error('❌ Error al guardar sesión final', err)
        });
      }

  volver(): void {
        this.router.navigate(['/rutina/mis-rutinas']);
      }

      volverAtras(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
        if (this.cronometro) clearInterval(this.cronometro);
      }
    }

