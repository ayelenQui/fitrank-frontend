import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { EjercicioService } from '@app/api/services/ejercicio/ejercicioService';
import { EjercicioDTO } from '@app/api/services/ejercicio/interfaces/ejercicio.interface';
import { EditarRutinaDTO, RutinaDTO } from '@app/api/services/rutina/interfaces/rutina.interface.rest';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

// extendemos DTO para agregar imagen y sets mockeados
interface EjercicioConImagen extends EjercicioDTO {
  imagen: string;
  expandido?: boolean;
  sets?: any[];
}

@Component({
  selector: 'app-iniciar-rutina',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './iniciar-rutina.html',
  styleUrl: './iniciar-rutina.css'
})

export class IniciarRutina implements OnInit, OnDestroy{

  ejercicios: EjercicioConImagen[] = [];
  tiempoSegundos: number = 0;
  tiempoFormateado: string = '00:00';
  timerSub!: Subscription;
  usuarioId!: number;
  rutinaId!: number; // se asigna la rutina seleccionada
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

 ngOnInit(): void {
    const user = this.authService.obtenerUser();
    if (user) {
      this.usuarioId = user.Id; //TODO CAMBIAR A -> user.Id;
      this.rutinaId = Number(this.route.snapshot.paramMap.get('id'));

      this.cargarRutina();
      this.iniciarTimer();
    }
  }

  ngOnDestroy(): void {
    if (this.timerSub) this.timerSub.unsubscribe();
  }

    // Timer en tiempo real
  iniciarTimer() {
    this.timerSub = interval(1000).subscribe(() => {
      this.tiempoSegundos++;
      const min = Math.floor(this.tiempoSegundos / 60).toString().padStart(2, '0');
      const sec = (this.tiempoSegundos % 60).toString().padStart(2, '0');
      this.tiempoFormateado = `${min}:${sec}`;
    });
  }
  
    // Cargar rutina y ejercicios
cargarRutina() {
  this.rutinaService.obtenerRutinaPorId(this.rutinaId).subscribe({
    next: (rutina) => {
      console.log('Rutina recibida desde el servicio:', rutina); // <-- Aquí logueamos toda la rutina
      this.rutina = rutina; // guardamos toda la info
      const ejercicios = rutina.ejercicios; // ya vienen como EjercicioDTO[]
      console.log('Ejercicios de la rutina:', ejercicios); // <-- Logueamos los ejercicios

      this.ejercicios = ejercicios.map(ej => ({
        ...ej,
        imagen: this.grupoMuscularImagenMap[ej.grupoMuscular] || 'assets/imagenes/default.png',
        sets: Array.from({ length: ej.series || 3 }).map(() => ({
          completado: false
        })),
        expandido: false
      }));
    },
    error: (err) => console.error('Error al cargar la rutina:', err)
  });
}



  toggleEjercicio(ejercicioId: number) {
    const ejercicio = this.ejercicios.find(e => e.id === ejercicioId);
    if (ejercicio) ejercicio.expandido = !ejercicio.expandido;
  }

    cancelarRutina() {
      if(confirm('¿Queres cancelar realmente?')){
        this.router.navigate(['rutina/mis-rutinas']);
      }
    }

terminarRutina() {
  if (!this.rutina) return;

  const rutinaEdit: EditarRutinaDTO = {
    id:this.rutinaId,
    nombre: this.rutina.nombre,
    fechaInicio: this.rutina.fechaInicio,
    fechaFin: this.rutina.fechaFin,
    diasPorSemana: this.rutina.diasPorSemana,
    ejercicios: this.ejercicios.map(e => ({
      id: e.id,
      rutinaId: this.rutinaId,
      maquinaId: e.maquinaId,
      nombre: e.nombre,
      grupoMuscular: e.grupoMuscular,
      dificultad: e.dificultad,
      series: e.series,
      repeticiones: e.repeticiones,
      peso: e.peso,
      descansoSegundos: e.descansoSegundos,
      esSerieCompuesta: e.esSerieCompuesta,
      esOpcional: e.esOpcional,
      diaAsignado: e.diaAsignado,
      observaciones: e.observaciones,
      videoUrl: e.videoUrl,
      tipoEntrenamiento: e.tipoEntrenamiento
    }))
  };

   this.rutinaService.editarRutina(this.rutinaId, rutinaEdit).subscribe({
    next: () => {
      alert('Rutina guardada correctamente ✅');
      this.router.navigate(['/rutina/mis-rutinas']); // 👈 redirige al finalizar
    },
    error: err => console.error(err)
  });
  }
}
