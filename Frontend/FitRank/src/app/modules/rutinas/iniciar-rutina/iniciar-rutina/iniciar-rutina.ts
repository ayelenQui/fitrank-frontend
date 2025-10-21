import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import { EjercicioService } from '@app/api/services/ejercicio/ejercicioService';

import { EjercicioDTO } from '@app/api/services/ejercicio/interfaces/ejercicio.interface';
import { RutinaDTO } from '@app/api/services/rutina/interfaces/rutina.interface.rest';
import { EjercicioRealizadoDTOEntrada } from '@app/api/services/registroentrenamiento/interfaces/registroentrenamiento.interface';
import { EjercicioRealizadoService } from '@app/api/services/registroentrenamiento/registro-entrenamiento.service';

// extendemos DTO para agregar imagen y sets mockeados
interface EjercicioConImagen extends EjercicioDTO {
  imagen: string;
  expandido?: boolean;
  sets?: { completado: boolean }[];
}

@Component({
  selector: 'app-iniciar-rutina',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './iniciar-rutina.html',
  styleUrl: './iniciar-rutina.css'
})
export class IniciarRutina implements OnInit, OnDestroy {

  ejercicios: EjercicioConImagen[] = [];
  tiempoSegundos: number = 0;
  tiempoFormateado: string = '00:00';
  timerSub!: Subscription;
  usuarioId!: number;
  rutinaId!: number;
  rutina!: RutinaDTO;

  grupoMuscularImagenMap: { [key: number]: string } = {
    0: 'assets/img/pecho.png',
    1: 'assets/img/espalda.png',
    2: 'assets/img/piernas.png',
    3: 'assets/img/hombros.png',
  };

  constructor(
    private authService: AuthService,
    private rutinaService: RutinaService,
    private ejercicioService: EjercicioService,
    private ejercicioRealizadoService: EjercicioRealizadoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.obtenerUser();
    if (user) {
      this.usuarioId = user.Id;
      this.rutinaId = Number(this.route.snapshot.paramMap.get('id'));
      // this.cargarRutina();
      this.iniciarTimer();
    }
  }

  ngOnDestroy(): void {
    if (this.timerSub) this.timerSub.unsubscribe();
  }

  iniciarTimer() {
    this.timerSub = interval(1000).subscribe(() => {
      this.tiempoSegundos++;
      const min = Math.floor(this.tiempoSegundos / 60).toString().padStart(2, '0');
      const sec = (this.tiempoSegundos % 60).toString().padStart(2, '0');
      this.tiempoFormateado = `${min}:${sec}`;
    });
  }

  // cargarRutina() {
  //   this.rutinaService.obtenerRutinaPorId(this.rutinaId).subscribe({
  //     next: (rutina) => {
  //       this.rutina = rutina;
  //       this.ejercicios = rutina.ejercicios.map(ej => ({
  //         ...ej,
  //         imagen: this.grupoMuscularImagenMap[ej.grupoMuscular] || 'assets/imagenes/default.png',
  //         sets: Array.from({ length: ej.series || 3 }).map(() => ({ completado: false })),
  //         expandido: false
  //       }));
  //     },
  //     error: (err) => console.error('Error al cargar la rutina:', err)
  //   });
  // }

  toggleEjercicio(ejercicioId: number) {
    const ejercicio = this.ejercicios.find(e => e.id === ejercicioId);
    if (ejercicio) ejercicio.expandido = !ejercicio.expandido;
  }

  cancelarRutina() {
    if (confirm('¿Querés cancelar realmente?')) {
      this.router.navigate(['rutina/mis-rutinas']);
    }
  }

  terminarRutina() {
  if (!this.rutina) return;

  if (!confirm('¿Deseás finalizar y registrar los ejercicios realizados?')) return;

  // recorremos los ejercicios y creamos DTOs de registro
  // const registros: EjercicioRealizadoDTOEntrada[] = this.ejercicios.map(e => ({
  //   UsuarioId: this.usuarioId,
  //   EjercicioId: e.id,
  //   Series: e.series ?? 0,
  //   Repeticiones: e.repeticiones ?? 0,
  //   Peso: e.peso ?? 0,
  //   TipoEntrenamiento: e.tipoEntrenamiento ?? 'Normal',
  //   Observacion: e.observaciones ?? '',
  //   fecha: new Date().toISOString()
  // }));

  // enviamos cada registro al backend
  // registros.forEach(dto => {
  //   this.ejercicioRealizadoService.registrarEjercicio(dto).subscribe({
  //     next: () => console.log(`Ejercicio ${dto.EjercicioId} registrado correctamente`),
  //     error: err => console.error('Error al registrar ejercicio', err)
  //   });
  // });

  alert('Rutina finalizada y ejercicios registrados ✅');
  this.router.navigate(['/rutina/terminar-rutina']);
}
}