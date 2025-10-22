import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { VisualizadorSvgComponent } from '@app/modules/visualizador3d/components/visualizador-svg.component';

import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { EjercicioService } from '@app/api/services/ejercicio/ejercicioService';
import { EjercicioAsignadoService } from '@app/api/ejercicioAsignado/ejercisioAsignado.service';
import { SerieAsignadaService } from '@app/api/services/serieAsignada/serieAsignada.service';

import { GrupoMuscularService } from '@app/api/services/grupoMuscular/grupomuscular.service'; 

@Component({
  selector: 'app-crear-sesiones-rutina',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, VisualizadorSvgComponent],
  templateUrl: './crear-sesiones-rutina.html',
  styleUrls: ['./crear-sesiones-rutina.css']
})
export class CrearSesionesRutinaComponent implements OnInit {
  rutinaId!: number;
  socioId!: number;
  ejerciciosDisponibles: Array<{ id: number; nombre: string; urlVideo?: string }> = [];

  gruposMusculares: { id: number; nombre: string }[] = [];
  grupoMuscularActual: string | null = null;

  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService,
    private ejService: EjercicioService,
    private ejAsignadoService: EjercicioAsignadoService,
    private serieService: SerieAsignadaService,
    private router: Router,
    private grupoMuscularService: GrupoMuscularService
  ) { }

  ngOnInit(): void {
    // rutinaId por ruta
    this.rutinaId = Number(this.route.snapshot.paramMap.get('id'));
    // socioId desde user logueado
    const user = this.auth.obtenerUser();
    this.socioId = user?.Id;


    // Reactive form con arrays anidados
    this.form = this.fb.group({
      ejercicios: this.fb.array([])


    });

    // 1 bloque inicial
    this.agregarEjercicio();

    // cargar combos
    this.ejService.getAll().subscribe({
      next: (data) => this.ejerciciosDisponibles = data || [],
      error: (err) => console.error('Error cargando ejercicios', err)
    });

    // Cargar grupos musculares
    this.grupoMuscularService.getAll().subscribe({
      next: (data) => {
        this.gruposMusculares = data || [];
      },
      error: (err) => console.error('Error cargando grupos musculares', err)
    });
  }

  // === getters
  get ejercicios(): FormArray {
    return this.form.get('ejercicios') as FormArray;
  }

  series(i: number): FormArray {
    return this.ejercicios.at(i).get('series') as FormArray;
  }

  // === factories
  private crearGrupoSerie() {
    return this.fb.group({
      peso: [0, [Validators.required, Validators.min(0)]],
      repeticiones: [0, [Validators.required, Validators.min(1)]],
      rir: [0, [Validators.required, Validators.min(0)]],
      nroSerie: [1, [Validators.required, Validators.min(1)]],
    });
  }

  private crearGrupoEjercicio() {
    return this.fb.group({
      numeroDeSesion: [1, [Validators.required, Validators.min(1)]],
      orden: [1, [Validators.required, Validators.min(1)]],
      observaciones: [''],
      ejercicioId: [null, Validators.required],   // [ngValue] ⇒ number
      series: this.fb.array([this.crearGrupoSerie()])
    });
  }

  // === UI actions
  agregarEjercicio(): void {
    this.ejercicios.push(this.crearGrupoEjercicio());
  }

  eliminarEjercicio(index: number): void {
    this.ejercicios.removeAt(index);
  }

  agregarSerie(indexEj: number): void {
    this.series(indexEj).push(this.crearGrupoSerie());
  }

  eliminarSerie(indexEj: number, indexSerie: number): void {
    this.series(indexEj).removeAt(indexSerie);
  }
  onEjercicioSeleccionado(ejercicioId: number): void {
    const ejercicio = this.ejerciciosDisponibles.find(e => e.id === +ejercicioId);
    if (!ejercicio) return;

    // 📌 Detectamos si el grupoMuscularId está directo o anidado en ejercicio
    const grupoMuscularId =
      (ejercicio as any).grupoMuscularId ||
      (ejercicio as any).ejercicio?.grupoMuscularId;

    if (!grupoMuscularId) {
      this.grupoMuscularActual = null;
      console.warn('No se encontró grupoMuscularId en el ejercicio seleccionado:', ejercicio);
      return;
    }

    const grupo = this.gruposMusculares.find(g => g.id === grupoMuscularId);
    this.grupoMuscularActual = grupo ? grupo.nombre : null;
  }


  async guardarTodo(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.rutinaId || !this.socioId) {
      alert('Faltan datos de rutina o socio.');
      return;
    }

    this.loading = true;
    try {
      // Recorremos cada ejercicio del form
      for (const ejGroup of this.ejercicios.controls as FormGroup[]) {
        const v = ejGroup.value;

        // Mapeo al DTO de AgregarEjercicioAsignadoDTO del backend
        const ejAsignadoDTO = {
          orden: Number(v.orden),
          observaciones: v.observaciones || '',
          sesion: Number(v.numeroDeSesion),
          rutinaId: Number(this.rutinaId),
          ejercicioId: Number(v.ejercicioId),
          socioId: Number(this.socioId)
        };

        // 1️⃣ Crear EjercicioAsignado
        const ejAsignadoResp = await firstValueFrom(this.ejAsignadoService.createEjercicioAsignado(ejAsignadoDTO));
        const ejercicioAsignadoId = ejAsignadoResp?.ejercicioId;

        // 2️⃣ Crear series para ese EjercicioAsignado
        for (const s of (v.series as any[])) {
          const serieDTO = {
            peso: Number(s.peso),
            repeticiones: Number(s.repeticiones),
            rir: Number(s.rir),
            nroSerie: Number(s.nroSerie),
            ejercicioAsignadoId: Number(ejercicioAsignadoId)
          };
          await firstValueFrom(this.serieService.crearSerie(serieDTO));
        }
      }

      alert('✅ Ejercicios y series guardados correctamente');

      // 🔹 Redirigir a Mis Rutinas
      this.router.navigate(['/rutina/mis-rutinas']);

    } catch (err: any) {
      console.error(err);
      if (err?.status === 401) {
        alert('Sesión expirada. Iniciá sesión nuevamente.');
        this.auth.logout?.();
        this.router.navigate(['/login']);
      } else {
        alert('❌ Ocurrió un error guardando los datos.');
      }
    } finally {
      this.loading = false;
    }
  }

}
