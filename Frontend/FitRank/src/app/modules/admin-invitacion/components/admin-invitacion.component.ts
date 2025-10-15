import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../api/services/activacion/AuthService.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-invitacion',
  templateUrl: './admin-invitacion.component.html',
  styleUrls: ['./admin-invitacion.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AdminInvitacionComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  mensaje = '';
  adminNombre = '';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit() {
    // ✅ obtenemos el admin solo para mostrar su nombre
    const user = this.authService.obtenerUser();
    this.adminNombre = user?.Nombre || 'Administrador';

    // ✅ armamos el formulario directamente
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      metodoPago: ['efectivo', Validators.required],
      periodo: ['mes', Validators.required],
      monto: [10, [Validators.required, Validators.min(1)]],
    });
  }

  generarInvitacion() {
    if (this.form.invalid) {
      this.error = 'Completa el formulario correctamente.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.mensaje = '';

    const token = this.authService.obtenerToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    });

    this.http
      .post('https://localhost:7226/api/Admin/generar-invitacion', this.form.value, { headers })
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.mensaje = '✅ Invitación generada exitosamente.';
          console.log('Respuesta:', response);
        },
        error: (err) => {
          this.loading = false;
          console.error('Error:', err);
          this.error = err.error?.Mensaje || 'Error al generar la invitación.';
        },
      });
  }
}



