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

import { EjercicioAsignadoDTO } from '@app/api/ejercicioAsignado/interfaces/ejercicioAsignado.interface.rest';
import { SerieAsignadaCreateDTO } from '@app/api/services/serieAsignada/interfaces/serieAsignada.interface.rest';
import { CrearSesionRealizadaDeEjerciciosDTO } from '@app/api/services/sesionRealizadaDeEjercicios/interfaces/sesionRealizadaDeEjercicios.interface';
import { CrearEjercicioRealizadoDTO } from '@app/api/services/ejercicioRealizado/interfaces/ejercicioRealizado.interface.rest';
import { CrearSerieRealizadaDTO } from '@app/api/services/serieRealizada/interfaces/serieRealizada.interface';
import { PuntajeService } from '@app/api/services/puntaje/puntaje.service';

@Component({
  selector: 'app-iniciar-rutina',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './iniciar-rutina.component.html',
  styleUrls: ['./iniciar-rutina.component.css']
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ejercicioAsignadoService: EjercicioAsignadoService,
    private serieAsignadaService: SerieAsignadaService,
    private ejercicioRealizadoService: EjercicioRealizadoService,
    private serieRealizadaService: SerieRealizadaService,
    private sesionRealizadaDeEjerciciosService: SesionRealizadaDeEjerciciosService,
    private auth: AuthService,
    private puntajeService: PuntajeService

  ) { }

  ngOnInit(): void {
    const user = this.auth.obtenerUser();
    this.socioId = user?.Id;
    this.rutinaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarEjercicios();
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

  // 🔹 Iniciar cronómetro de serie
  iniciarSerie(): void {
    this.enEjecucion = true;
    this.puedeEditar = false;
    this.tiempoRestante = 60;

    this.cronometro = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante <= 0) {
        this.finalizarSerie();
      }
    }, 1000);
  }

  finalizarSerie(): void {
    clearInterval(this.cronometro);
    this.enEjecucion = false;
    this.puedeEditar = true;
    this.tiempoRestante = 0;
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

  ngOnDestroy(): void {
        if (this.cronometro) clearInterval(this.cronometro);
      }
    }

