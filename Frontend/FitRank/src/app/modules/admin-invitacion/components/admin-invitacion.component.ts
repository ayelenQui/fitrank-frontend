import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../api/services/activacion/AuthService.service';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TypingService } from '../../../api/services/typingService';
import { Location } from '@angular/common';

interface InvitacionResponse {
  success: boolean;
  invitacionId: number;
  tokenInvitacion?: string | null;
  qrImage?: string | null;
  linkPago?: string | null;
  mensaje: string;
}


@Component({
  selector: 'app-admin-invitacion',
  templateUrl: './admin-invitacion.component.html',
  styleUrls: ['./admin-invitacion.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AdminInvitacionComponent implements OnInit, AfterViewInit{





  form!: FormGroup;
  loading = false;
  error = '';
  mensaje = '';
  adminNombre = '';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private typingService: TypingService,
    private location: Location  
  ) { }

  @ViewChild('logo-fondo', { static: true }) logoAnim!: ElementRef;

  ngAfterViewInit() {
    // Espera un pequeño tiempo para asegurarse de que el DOM esté cargado
    setTimeout(() => {
      this.typingService.startTypingEffect(
        'Generar Invitación',
        'typing-text',
        50
      );
    }, 200);
  }

  ngOnInit() {  
   
    const user = this.authService.obtenerUser();
    this.adminNombre = user?.Nombre || 'Administrador';

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
      .post<InvitacionResponse>('https://localhost:7226/api/Admin/generar-invitacion', this.form.value, { headers })
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.mensaje = '✅ Invitación generada exitosamente.';
          console.log('Respuesta:', response);
          // 🔹 Si el backend devuelve link de Mercado Pago:
          if (this.form.value.metodoPago.toLowerCase() === 'mercadopago' && response.linkPago) {
            this.mensaje = 'Redirigiendo al pago en Mercado Pago...';
            window.open(response.linkPago, '_blank'); // 🔸 Abre el checkout en nueva pestaña
          } else {
            this.mensaje = '✅ Invitación generada y enviada por mail.';
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('Error:', err);
          this.error = err.error?.mensaje || 'Error al generar la invitación.';
        }
      });
  }






  volverAtras(): void {
    this.location.back();
  }
}



