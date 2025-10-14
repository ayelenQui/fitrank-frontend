import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EjercicioRealizadoDTOEntrada, EjercicioRealizadoDTOSalida } from '../../../../api/services/registroentrenamiento/interfaces/registroentrenamiento.interface';
import { EjercicioRealizadoService } from '../../../../api/services/registroentrenamiento/registro-entrenamiento.service';
import { AuthService } from '../../../../api/services/activacion/AuthService.service';

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
  nuevoEjercicio: EjercicioRealizadoDTOEntrada = this.inicializarEjercicio();

  constructor(
    private ejercicioRealizadoService: EjercicioRealizadoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Obtengo usuario logueado del localStorage
    const usuario = this.authService.obtenerUser();
    if (usuario && usuario.id) {
      this.usuarioId = usuario.id;
      this.nuevoEjercicio.UsuarioId = this.usuarioId;
      this.cargarEjercicios();
    } else {
      console.warn('No hay usuario logueado');
    }
  }

  private inicializarEjercicio(): EjercicioRealizadoDTOEntrada {
    return {
      UsuarioId: 0,
      EjercicioId: 0,
      Series: 0,
      Repeticiones: 0,
      Peso: 0,
      TipoEntrenamiento: '',
      Observacion: '',
      fecha: new Date().toISOString().split('T')[0]
    };
  }

  cargarEjercicios(): void {
    if (!this.usuarioId) return;
    this.ejercicioRealizadoService.getEjerciciosPorUsuario(this.usuarioId).subscribe({
      next: (data) => this.ejercicios = data,
      error: (err) => console.error('Error al cargar ejercicios', err)
    });
  }

  registrarEjercicio(): void {
    if (!this.usuarioId) {
      console.error('Usuario no logueado');
      return;
    }

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
    this.nuevoEjercicio = this.inicializarEjercicio();
    this.nuevoEjercicio.UsuarioId = this.usuarioId;
  }
}
