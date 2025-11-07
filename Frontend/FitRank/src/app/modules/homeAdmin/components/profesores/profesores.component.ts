import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfesorService } from '@app/api/services/profesor/ProfesorService';
import { AgregarProfesorDTO, ProfesorDTO } from '@app/api/services/profesor/interfaces/profesor.interface';
import Swal from 'sweetalert2'; // ✅ Smart Alert

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

  constructor(private profesorService: ProfesorService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cargarProfesores();
    this.inicializarFormulario();
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
      password: ['', Validators.required]
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
      p.nombre.toLowerCase().includes(texto)
    );
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.profesorSeleccionado = null;
    this.formProfesor.reset();
  }

  cancelarFormulario(): void {
    this.mostrarFormulario = false;
    this.profesorSeleccionado = null;
  }

  editarProfesor(profesor: ProfesorDTO): void {
    this.profesorSeleccionado = profesor;
    this.formProfesor.patchValue({
      nombre: profesor.nombre,
      email: profesor.email,
      telefono: profesor.telefono
    });
    this.mostrarFormulario = true;
  }

  guardarProfesor(): void {
    if (this.formProfesor.invalid) {
      this.alerta('Atención', 'Completá los campos obligatorios', 'warning');
      return;
    }

    const dto: AgregarProfesorDTO = this.formProfesor.value;

    if (this.profesorSeleccionado) {
      // 🔹 Actualizar
      this.profesorService.actualizarProfesor(this.profesorSeleccionado.id, dto).subscribe({
        next: () => {
          this.alerta('Éxito', 'Profesor actualizado correctamente ✅', 'success');
          this.cargarProfesores();
          this.cancelarFormulario();
        },
        error: () => this.alerta('Error', 'No se pudo actualizar el profesor', 'error')
      });
    } else {
      // 🔹 Agregar
      this.profesorService.agregarProfesor(dto).subscribe({
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
}
