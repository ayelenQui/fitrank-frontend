import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule, FormControl } from '@angular/forms';
import { EjercicioService } from '@app/api/services/ejercicio/ejercicioService';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { SesionService } from '@app/api/services/sesion/sesion.service';
import { EjercicioAsignadoService } from '@app/api/services/ejercicioAsignado/ejercisioAsignado.service';
import { SerieService } from '@app/api/services/serie/serie.service';
import{ Location } from '@angular/common'; 
import Swal from 'sweetalert2';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import { GrupoMuscularDTO } from '@app/api/services/grupoMuscular/grupoMuscular.interface';
import { GrupoMuscularService } from '@app/api/services/grupoMuscular/grupoMuscular.service';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-crear-sesiones-rutina',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './crear-sesiones-rutina.html',
  styleUrls: ['./crear-sesiones-rutina.css', '../../css-socio/socio-common.css']
})
export class CrearSesionesRutinaComponent implements OnInit {
  rutinaId!: number;
  socioId!: number;
  ocultarHero = false;
  ejerciciosDisponibles: any[] = [];
  ejerciciosFiltrados: any[] = [];
  filtro: string = '';

  solicitudId?: number;
  volverA = '/rutina/mis-rutinas';

  form!: FormGroup;
  mostrarSesiones = false;
  sesionActiva = 0;

  gruposMusculares: GrupoMuscularDTO[] = [];
  grupoSeleccionadoId?: number;

  constructor(
    private fb: FormBuilder,
    private ejercicioService: EjercicioService,
    private grupoMuscularService: GrupoMuscularService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private location: Location,
    private ejercicioAsignadoService: EjercicioAsignadoService,
    private serieService: SerieService,
    private sesionService: SesionService,
    private cdr: ChangeDetectorRef,
    private rutinaService: RutinaService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    const st = history.state as { socioId?: number, solicitudId?: number, volverA?: string } || {};

    if (st.socioId) {
      this.socioId = st.socioId; 
    }

    if (st.solicitudId) {
      this.solicitudId = st.solicitudId; 
    }

    if (st.volverA) {
      this.volverA = st.volverA; 
    }

    this.rutinaId = Number(this.route.snapshot.paramMap.get('id'));

    const user = this.auth.obtenerUser();
    if (!this.socioId && user?.Id) {
      this.socioId = user.Id;
    }

    this.form = this.fb.group({
      cantidadDias: [null, [Validators.required, Validators.min(1), Validators.max(7)]],
      sesiones: this.fb.array([])
    });

    this.ejercicioService.getAll().subscribe({
      next: (data) => {
        this.ejerciciosDisponibles = data || [];
        this.ejerciciosFiltrados = [...this.ejerciciosDisponibles];
      },
      error: (err) => console.error('Error cargando ejercicios', err)
    });

    this.grupoMuscularService.obtenerTodos().subscribe({
      next: grupos => this.gruposMusculares = grupos,
      error: err => console.error('Error cargando grupos musculares', err)
    });
  }


  get sesiones(): FormArray {
    return this.form.get('sesiones') as FormArray;
  }
  getEjercicios(i: number): FormArray {
    return this.sesiones.at(i).get('ejercicios') as FormArray;
  }
  getSeries(i: number, j: number): FormArray {
    return this.getEjercicios(i).at(j).get('series') as FormArray;
  }

  crearSesiones(): void {
    const dias = this.form.get('cantidadDias')?.value;
    this.sesiones.clear();

    for (let i = 1; i <= dias; i++) {
      this.sesiones.push(
        this.fb.group({
          numeroDeSesion: [i],
          nombre: [`Sesión ${i}`],
          ejercicios: this.fb.array([])
        })
      );
    }

    this.mostrarSesiones = true;
    this.sesionActiva = 0;
    this.cdr.detectChanges();
  }

  agregarEjercicio(ejercicio: any): void {
    if (!this.mostrarSesiones) {
      Swal.fire({
        icon: 'warning',
        title: '⚠️ Atención',
        text: 'Primero generá las sesiones antes de agregar ejercicios.',
        confirmButtonColor: '#8c52ff'
      });
      return;
    }

    const sesion = this.sesiones.at(this.sesionActiva);
    const ejercicios = sesion.get('ejercicios') as FormArray;

    const nuevo = this.fb.group({
      ejercicioId: [ejercicio.id],
      nombre: [ejercicio.nombre],
      urlImagen: [ejercicio.urlImagen],
      nombreGrupoMuscular: [ejercicio.nombreGrupoMuscular || 'Sin grupo'],
      duracionEstimada: [ejercicio.duracionEstimada || 0],
      series: this.fb.array([this.crearSerieForm()])
    });

    ejercicios.push(nuevo);
    this.cdr.detectChanges();

    Swal.fire({
      icon: 'success',
      title: ' Ejercicio agregado',
      text: `"${ejercicio.nombre}" fue añadido a la sesión.`,
      showConfirmButton: false,
      timer: 1500
    });
  
  }
  onGenerarSesiones(): void {
    const dias = this.form.get('cantidadDias')?.value;
    if (!dias) return;

   
    this.mostrarSesiones = true;
    this.mostrarSesiones = true;
    document.querySelector('.rutina-layout')?.classList.add('mostrar-sesiones');
  
    setTimeout(() => {
      this.ocultarHero = true;
      this.crearSesiones(); 
    }, 600);
  }

  crearSerieForm(): FormGroup {
    return this.fb.group({
      peso: [0, [Validators.min(0)]],
      repeticiones: [0, [Validators.min(1)]],
      duracion: [0]
    });
  }

  agregarSerie(i: number, j: number): void {
    this.getSeries(i, j).push(this.crearSerieForm());
  }
  eliminarSerie(i: number, j: number, k: number): void {
    this.getSeries(i, j).removeAt(k);
  }
  eliminarEjercicio(i: number, j: number): void {
    this.getEjercicios(i).removeAt(j);
  }

  seleccionarSesion(index: number): void {
    this.sesionActiva = index;
  }

  filtrarEjercicios(): void {
    const texto = this.filtro.toLowerCase();
    this.ejerciciosFiltrados = this.ejerciciosDisponibles.filter(e =>
      e.nombre.toLowerCase().includes(texto)
    );
  }

  trackByIndex(index: number): number {
    return index;
  }
 
  getDuracionTotalSesion(indexSesion: number): number {
    const sesion = this.sesiones.at(indexSesion);
    if (!sesion) return 0;

    const ejercicios = sesion.get('ejercicios') as FormArray;
    let total = 0;

    ejercicios.controls.forEach((control) => {
      const grupo = control as FormGroup;
      const duracion = grupo.get('duracionEstimada')?.value || 0;
      total += Number(duracion);
    });

    return total;
  }
 
  getDuracionTotalRutina(): number {
    let total = 0;

    this.sesiones.controls.forEach((sesionControl) => {
      const sesion = sesionControl as FormGroup;
      const ejercicios = sesion.get('ejercicios') as FormArray;

      ejercicios.controls.forEach((control) => {
        const grupo = control as FormGroup;
        const duracion = grupo.get('duracionEstimada')?.value || 0;
        total += Number(duracion);
      });
    });

    return total;
  }


  guardarSesionActual(): void {
    Swal.fire({
      icon: 'success',
      title: `✅ Dia ${this.sesionActiva + 1} guardada`,
      confirmButtonColor: '#8c52ff'
    });
  }

  private validarRutinaCompleta(): boolean {

    if (this.sesiones.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '⚠️ Rutina incompleta',
        text: 'Generá los días de la rutina antes de guardar.',
        confirmButtonColor: '#8c52ff'
      });
      return false;
    }

    for (let i = 0; i < this.sesiones.length; i++) {
      const ejercicios = this.getEjercicios(i);
      if (ejercicios.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: `⚠️ Falta el Día ${i + 1}`,
          text: 'Cada día debe tener al menos 1 ejercicio.',
          confirmButtonColor: '#8c52ff'
        });
        return false;
      }

      for (let j = 0; j < ejercicios.length; j++) {
        const series = this.getSeries(i, j);
        if (series.length === 0) {
          Swal.fire({
            icon: 'warning',
            title: `⚠️ Ejercicio incompleto`,
            text: `El ejercicio ${j + 1} del Día ${i + 1} no tiene series.`,
            confirmButtonColor: '#8c52ff'
          });
          return false;
        }
      }
    }

    return true;
  }




  guardarTodo(): void {
    if (!this.validarRutinaCompleta()) return;
    if (this.form.invalid || this.sesiones.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '⚠️ Atención',
        text: 'Las series necesitan un peso y cantidad de repeticiones, y las sesiones deben ser guardadas antes de guardar la rutina',
        confirmButtonColor: '#8c52ff'
      });
      return;
    }

    const sesiones = this.form.value.sesiones;
    let sesionesGuardadas = 0;

    sesiones.forEach((s: any, index: number) => {
      const sesionDto = {
        nombre: s.nombre,
        numeroDeSesion: s.numeroDeSesion,
        rutinaId: this.rutinaId
      };

      this.sesionService.crear(sesionDto).subscribe({
        next: (sesionRes) => {
          const sesionId = sesionRes.id;

          if (s.ejercicios && s.ejercicios.length > 0) {
            s.ejercicios.forEach((ej: any, i: number) => {
              const ejDto = {
                sesionId: sesionId,
                ejercicioId: ej.ejercicioId,
                orden: i + 1,
                observaciones: '' 
              };

              this.ejercicioAsignadoService.createEjercicioAsignado(ejDto).subscribe({
                next: (ejRes) => {
                  const ejercicioAsignadoId = ejRes.id;

                  if (ej.series && ej.series.length > 0) {
                    ej.series.forEach((serie: any, k: number) => {
                      const serieDto = {
                        peso: serie.peso,
                        repeticiones: serie.repeticiones,
                        duracion: '00:00:00',
                        ejercicioAsignadoId: ejercicioAsignadoId,
                        numeroDeSerie: k + 1 
                      };

                      this.serieService.crear(serieDto).subscribe({
                        next: (serieRes) => {},
                        error: (err) => console.error('      ❌ Error al crear serie:', err)
                      });
                    });
                  }
                },
                error: (err) => console.error('❌ Error al crear ejercicio asignado:', err)
              });
            });
          }

          sesionesGuardadas++;
          if (sesionesGuardadas === sesiones.length) {

          if (this.solicitudId) {
            this.rutinaService.actualizarEstado(this.solicitudId).subscribe({
            next: () => {},
            error: (err) => console.error('❌ Error al actualizar solicitud:', err)
          });
        }
            Swal.fire({
              icon: 'success',
              title: ' Rutina guardada',
              imageUrl: 'assets/img/logo/logo-negro-lila.svg',
              imageWidth: 80,
              imageHeight: 80,
              imageAlt: 'FitRank Logo',
              text: 'Tu rutina, sesiones y ejercicios fueron guardados correctamente.',
              confirmButtonColor: '#8c52ff'
            }).then(() => {
              this.router.navigate([this.volverA], { state: { socioId: this.socioId } });
            });
          }
        },
        error: (err) => console.error('❌ Error al crear sesión:', err)
      });
    });
  }
  volverAtras(): void {
    this.location.back();
  }

filtrarPorGrupo(grupoId: number): void {
  this.grupoSeleccionadoId = grupoId;

  this.ejercicioService.getByGrupoMuscular(grupoId).subscribe({
    next: ejercicios => this.ejerciciosFiltrados = ejercicios,
    error: err => console.error('Error filtrando ejercicios', err)
  });
}

recargarEjercicios() {
  this.ejercicioService.getAll().subscribe(res => {
    this.ejerciciosFiltrados = res;
    this.grupoSeleccionadoId = undefined;
  });
}

abrirVideo(url: string) {
  window.open(url, "_blank");
}
  esYoutube(url: string): boolean {
    if (!url) return false;
    return url.includes("youtube.com") || url.includes("youtu.be");
  }
  convertirAEmbed(url: string): string {
    if (!url) return '';

    if (url.includes('watch?v=')) {
      const id = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes('/shorts/')) {
      const id = url.split('/shorts/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  }


}
