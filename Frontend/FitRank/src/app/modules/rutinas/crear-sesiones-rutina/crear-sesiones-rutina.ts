import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EjercicioService } from '@app/api/services/ejercicio/ejercicioService';
import { EjercicioDTO } from '@app/api/services/ejercicio/interfaces/ejercicio.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AgregarEjercicioAsignadoDTO } from '@app/api/ejercicioAsignado/interfaces/ejercicioAsignado.interface.rest';
import { GrupoMuscularService } from '@app/api/services/grupoMuscular/grupoMuscularService';
import { GrupoMuscularDTO } from '@app/api/services/grupoMuscular/interfaces/grupoMuscular.interface.rest';

interface EjercicioConImagen extends EjercicioDTO {
  imagen: string;
}

@Component({
  selector: 'app-crear-sesiones-rutina',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-sesiones-rutina.html',
  styleUrls: ['./crear-sesiones-rutina.css']
})
export class CrearSesionesRutina implements OnInit {
  ejerciciosForm!: FormGroup;
  ejerciciosDisponibles: EjercicioConImagen[] = [];
  ejerciciosFiltrados: EjercicioConImagen[][] = []; // filtrado por sesión
  ejerciciosSeleccionados: EjercicioConImagen[][] = [];
  grupoSeleccionado: (number | null)[] = [];
  gruposMuscularesDisponibles: GrupoMuscularDTO[] = [];

  rutinaId!: number;
  frecuencia!: number;

  constructor(
    private fb: FormBuilder,
    private ejercicioService: EjercicioService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private grupoMuscularService: GrupoMuscularService
  ) {}



  ngOnInit(): void {
    this.rutinaId = Number(this.route.snapshot.paramMap.get('id'));
    this.frecuencia = Number(this.route.snapshot.paramMap.get('frecuencia')) || 1;

    // Inicializamos FormArray de sesiones según frecuencia
    const sesiones = Array.from({ length: this.frecuencia }, () =>
      this.fb.group({
        ejerciciosAsignados: this.fb.array([])
      })
    );

    this.ejerciciosForm = this.fb.group({
      sesiones: this.fb.array(sesiones)
    });

    this.grupoSeleccionado = Array.from({ length: this.frecuencia }, () => null);

    // Inicializamos arrays auxiliares para filtros y seleccionados por sesión
    this.ejerciciosFiltrados = Array.from({ length: this.frecuencia }, () => []);
    this.ejerciciosSeleccionados = Array.from({ length: this.frecuencia }, () => []);

    this.gruposMuscularesDisponibles = [];

    this.cargarEjercicios();
    this.cargarGruposMusculares();

  }

  cargarGruposMusculares(): void {
  this.grupoMuscularService.listarGruposMusculares().subscribe({
    next: (data) => {
      this.gruposMuscularesDisponibles = data;
    },
    error: (err) => console.error('Error al cargar grupos musculares', err)
  });
}

filtrarPorGrupo(grupoId: number, sesionIndex: number): void {
  // Guardamos qué grupo está seleccionado en esa sesión
  this.grupoSeleccionado[sesionIndex] = grupoId;

  // Si el usuario vuelve a hacer clic en el mismo grupo, deseleccionamos el filtro
  if (this.grupoSeleccionado[sesionIndex] === grupoId && this.ejerciciosFiltrados[sesionIndex].length > 0) {
    this.ejerciciosFiltrados[sesionIndex] = this.ejerciciosDisponibles; // mostramos todos los ejercicios
    this.grupoSeleccionado[sesionIndex] = null;
    return;
  }

  // Filtramos los ejercicios por grupo muscular
  this.ejerciciosFiltrados[sesionIndex] = this.ejerciciosDisponibles.filter(
    (e: any) => e.grupoMuscularId === grupoId
  );
}


  get sesiones(): FormArray {
    return this.ejerciciosForm.get('sesiones') as FormArray;
  }

  getEjercicios(sIndex: number): FormArray {
    return this.sesiones.at(sIndex).get('ejerciciosAsignados') as FormArray;
  }

  cargarEjercicios(): void {
    this.ejercicioService.getAll().subscribe({
      next: (data) => {
        const conImagen = data.map(e => ({
          ...e,
          imagen: 'assets/img/default.png' // o según tu mapa
        }));
        for (let i = 0; i < this.frecuencia; i++) {
          this.ejerciciosFiltrados[i] = [...conImagen];
        }
      },
      error: (err) => console.error('Error al cargar ejercicios', err)
    });
  }

  seleccionarEjercicio(e: EjercicioConImagen, sIndex: number): void {
    const selected = this.ejerciciosSeleccionados[sIndex];
    const index = selected.indexOf(e);
    if (index > -1) {
      selected.splice(index, 1);
      this.getEjercicios(sIndex).removeAt(index);
    } else {
      selected.push(e);
      this.getEjercicios(sIndex).push(this.fb.group({
        orden: [selected.length, Validators.required],
        observaciones: [''],
        sesion: [sIndex + 1],
        rutinaId: [this.rutinaId],
        ejercicioId: [e.id]
      }));
    }
  }

  eliminarEjercicio(sIndex: number, index: number): void {
    this.ejerciciosSeleccionados[sIndex].splice(index, 1);
    this.getEjercicios(sIndex).removeAt(index);
  }

  onSubmit(): void {
    const ejerciciosAsignados: AgregarEjercicioAsignadoDTO[] = [];

    this.sesiones.controls.forEach((sesionGroup, sIndex) => {
      const arr = sesionGroup.get('ejerciciosAsignados') as FormArray;
      arr.controls.forEach(ctrl => ejerciciosAsignados.push(ctrl.value));
    });

    console.log('Ejercicios a guardar:', ejerciciosAsignados);

    // Aquí llamarías a tu servicio para enviar los DTO al back
    // this.ejercicioService.crearEjerciciosAsignados(ejerciciosAsignados).subscribe(...)

    alert('Ejercicios guardados (ver consola)');
  }

  volverAtras(): void {
    this.location.back();
  }
}
