import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EjercicioRealizadoDTOEntrada, EjercicioRealizadoDTOSalida } from '../../../../api/services/registroentrenamiento/interfaces/registroentrenamiento.interface';
import { EjercicioRealizadoService } from '../../../../api/services/registroentrenamiento/registro-entrenamiento.service';

@Component({
  selector: 'app-registrar-entrenamiento',
  templateUrl: './registrar-entrenamiento.component.html',
  styleUrls: ['./registrar-entrenamiento.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RegistrarEntrenamientoComponent implements OnInit {
  usuarioId!: number;
  ejercicios: EjercicioRealizadoDTOSalida[] = [];
  nuevoEjercicio: EjercicioRealizadoDTOEntrada = {
    UsuarioId: 0,
    EjercicioId: 0,
    Series: 0,
    Repeticiones: 0,
    Peso: 0,
    TipoEntrenamiento: '',
    Observacion: '',
    fecha: new Date().toISOString().split('T')[0]
  };

  constructor(private ejercicioRealizadoService: EjercicioRealizadoService) { }

  ngOnInit(): void {
    // Si ya tenés usuarioId, carga ejercicios automáticamente
    // this.cargarEjercicios();
  }

  cargarEjercicios(): void {
    if (!this.usuarioId) return;
    this.ejercicioRealizadoService.getEjerciciosPorUsuario(this.usuarioId).subscribe({
      next: (data) => this.ejercicios = data,
      error: (err) => console.error('Error al cargar ejercicios', err)
    });
  }

  registrarEjercicio(): void {
    this.nuevoEjercicio.UsuarioId = this.usuarioId;
    this.ejercicioRealizadoService.registrarEjercicio(this.nuevoEjercicio).subscribe({
      next: (res) => {
        console.log('Ejercicio registrado', res);
        this.cargarEjercicios();
        this.resetFormulario();
      },
      error: (err) => console.error('Error al registrar ejercicio', err)
    });
  }

  resetFormulario(): void {
    this.nuevoEjercicio = {
      UsuarioId: this.usuarioId,
      EjercicioId: 0,
      Series: 0,
      Repeticiones: 0,
      Peso: 0,
      TipoEntrenamiento: '',
      Observacion: '',
      fecha: new Date().toISOString().split('T')[0]
    };
  }
}
