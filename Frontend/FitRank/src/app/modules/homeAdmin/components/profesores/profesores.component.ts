import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfesorService } from '@app/api/services/profesor/ProfesorService';
import { AgregarProfesorDTO, ActualizarProfesorDTO, ProfesorDTO, EstadisticasProfesoresDTO } from '@app/api/services/profesor/interfaces/profesor.interface';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  profesores: ProfesorDTO[] = [];
  profesoresFiltrados: ProfesorDTO[] = [];
  formProfesor!: FormGroup;
  profesorSeleccionado: ProfesorDTO | null = null;
  mostrarFormulario = false;
  filtro = '';
  profesorExpandido: number | null = null;
  gimnasioIdAdmin: number | null = null;
  estadisticas: EstadisticasProfesoresDTO | null = null;

  constructor(
    private profesorService: ProfesorService,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.obtenerGimnasioDelAdmin();
    this.cargarProfesores();
    this.inicializarFormulario();
    this.cargarEstadisticas();
  }

  private obtenerGimnasioDelAdmin(): void {
    const usuario = this.authService.obtenerUser();
    if (usuario && usuario.gimnasioId) {
      this.gimnasioIdAdmin = usuario.gimnasioId;
    }
  }
  cargarEstadisticas(): void {
    this.profesorService.obtenerEstadisticas().subscribe({
      next: (data) => (this.estadisticas = data),
      error: (err) => console.error('❌ Error al cargar estadísticas', err)
    });
  }
  inicializarFormulario(): void {
    this.formProfesor = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      sexo: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      matricula: ['', Validators.required],
      sueldo: [0, Validators.required],
      password: ['']
    });
  }

  cargarProfesores(): void {
    this.profesorService.obtenerProfesores().subscribe({
      next: (data) => {
        this.profesores = data;
        this.profesoresFiltrados = data;
      },
      error: () => this.alerta('Error', 'No se pudieron cargar los profesores', 'error')
    });
  }

  filtrarProfesores(): void {
    const texto = this.filtro.toLowerCase();
    this.profesoresFiltrados = this.profesores.filter(p =>
      p.nombre.toLowerCase().includes(texto) || p.apellido.toLowerCase().includes(texto)
    );
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.profesorSeleccionado = null;
    this.formProfesor.reset();
    this.formProfesor.get('password')?.setValidators([Validators.required]);
    this.formProfesor.get('password')?.updateValueAndValidity();
  }

  cancelarFormulario(): void {
    this.mostrarFormulario = false;
    this.profesorSeleccionado = null;
  }

  editarProfesor(profesor: ProfesorDTO): void {
    this.profesorSeleccionado = profesor;
    this.mostrarFormulario = true;
    this.formProfesor.get('password')?.clearValidators();
    this.formProfesor.get('password')?.updateValueAndValidity();

    this.formProfesor.patchValue({
      nombre: profesor.nombre,
      apellido: profesor.apellido,
      dni: profesor.dni,
      email: profesor.email,
      telefono: profesor.telefono,
      sexo: profesor.sexo,
      fechaNacimiento: profesor.fechaNacimiento?.toString().substring(0, 10),
      matricula: profesor.matricula,
      sueldo: profesor.sueldo
    });
  }

  guardarProfesor(): void {
    if (this.formProfesor.invalid) {
      this.alerta('Atención', 'Completá los campos obligatorios', 'warning');
      return;
    }

    if (this.profesorSeleccionado) {
      const dtoActualizar: ActualizarProfesorDTO = {
        id: this.profesorSeleccionado.id,
        ...this.formProfesor.value,
        esActivado: true,
        gimnasioId: this.profesorSeleccionado.gimnasioId ?? this.gimnasioIdAdmin ?? undefined
      };

      this.profesorService.actualizarProfesor(dtoActualizar.id, dtoActualizar).subscribe({
        next: () => {
          this.alerta('Éxito', 'Profesor actualizado correctamente ✅', 'success');
          this.cargarProfesores();
          this.cancelarFormulario();
        },
        error: () => this.alerta('Error', 'No se pudo actualizar el profesor', 'error')
      });
    } else {
      const dtoAgregar: AgregarProfesorDTO = {
        ...this.formProfesor.value,
        gimnasioId: this.gimnasioIdAdmin ?? undefined
      };

      this.profesorService.agregarProfesor(dtoAgregar).subscribe({
        next: () => {
          this.alerta('Éxito', 'Profesor agregado correctamente 🎉', 'success');
          this.cargarProfesores();
          this.cancelarFormulario();
        },
        error: () => this.alerta('Error', 'No se pudo agregar el profesor', 'error')
      });
    }
  }

  eliminarProfesor(id: number): void {
    Swal.fire({
      title: '¿Eliminar profesor?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#9d4edd',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profesorService.eliminarProfesor(id).subscribe({
          next: () => {
            this.alerta('Eliminado', 'Profesor eliminado correctamente 🗑️', 'success');
            this.cargarProfesores();
          },
          error: () => this.alerta('Error', 'No se pudo eliminar el profesor', 'error')
        });
      }
    });
  }

  verRutinas(profesor: ProfesorDTO): void {
    this.profesorExpandido = this.profesorExpandido === profesor.id ? null : profesor.id;

    if (!profesor.rutinas) {
      this.profesorService.obtenerRutinasPorProfesor(profesor.id).subscribe({
        next: (rutinas) => profesor.rutinas = rutinas,
        error: () => profesor.rutinas = []
      });
    }
  }

  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad;
  }

  private alerta(titulo: string, texto: string, tipo: 'success' | 'error' | 'warning' | 'info'): void {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: tipo,
      confirmButtonColor: '#9d4edd',
      background: '#1c1a22',
      color: '#fff'
    });
  }

  abrirWhatsApp(telefono: string, nombre: string): void {
    // Limpia el número y lo pasa al formato internacional
    const numero = telefono.replace(/\D/g, '');
    const link = `https://wa.me/${numero}?text=Hola%20${encodeURIComponent(nombre)}%2C%20te%20habla%20el%20administrador%20de%20FitRank.%20😊`;

    window.open(link, '_blank');
  }

 
}


