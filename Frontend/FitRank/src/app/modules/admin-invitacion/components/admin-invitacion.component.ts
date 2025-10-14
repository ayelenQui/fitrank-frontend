// src/app/admin-invitacion/admin-invitacion.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../api/services/activacion/AuthService.service';  
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-invitacion',
  templateUrl: './admin-invitacion.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class AdminInvitacionComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  error: string = '';
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Verifica si el usuario es admin antes de cargar
    const user = this.authService.obtenerUser();
    if (!user || user.Rol !== 'Admin') {
      this.error = 'Acceso denegado. Solo para admins.';
      this.router.navigate(['/login']);
      return;
    }

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      metodoPago: ['Efectivo', Validators.required],  // Por defecto, ya que es para efectivo
      periodo: ['Monthly', Validators.required],  // O 'Yearly'
      monto: [0, [Validators.required, Validators.min(1)]]
    });
  }

  generarInvitacion() {
    if (this.form.invalid) {
      this.error = 'Completa el formulario correctamente.';
      return;
    }

    this.loading = true;
    this.error = '';
    const token = this.authService.obtenerToken();  // Obtén el JWT del admin

    this.http.post('https://localhost:7226/api/admin/generar-invitacion', this.form.value, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (response) => {
        this.loading = false;
        this.mensaje = 'Invitación generada exitosamente!';
        // Opcional: Redirigir o mostrar detalles
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.Mensaje || 'Error al generar invitación.';
        console.error(err);
      }
    });
  }
}
