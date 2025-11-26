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
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';


interface InvitacionResponse {
  success: boolean;
  invitacionId: number;
  qrImage?: string | null;
  url?: string | null;     // link de pago para online
  mensaje: string;
}

@Component({
  selector: 'app-admin-invitacion',
  templateUrl: './admin-invitacion.component.html',
  styleUrls: ['./admin-invitacion.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AdminInvitacionComponent implements OnInit, AfterViewInit {

  form!: FormGroup;
  loading = false;
  error = '';
  mensaje = '';
  adminNombre = '';

  qrImage: string | null = null;
  linkPago: string | null = null;

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
      // Opcional: avisar también con Swal si querés
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Revisá los datos antes de generar la invitación.'
      });
      return;
    }

    this.loading = true;
    this.error = '';
    this.mensaje = '';
    this.qrImage = null;
    this.linkPago = null;

    const token = this.authService.obtenerToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const metodoPago =
      this.form.value.metodoPago === 'efectivo'
        ? 'Efectivo'
        : 'MercadoPago';

    const periodo =
      this.form.value.periodo === 'mes'
        ? 'Monthly'
        : 'Yearly';

    const payload = {
      nombre: this.form.value.nombre,
      apellidos: this.form.value.apellidos,
      dni: this.form.value.dni,
      telefono: this.form.value.telefono,
      email: this.form.value.email,
      metodoPago,
      periodo,
      monto: this.form.value.monto
    };

    this.http
      .post<InvitacionResponse>(`${environment.apiUrl}/Admin/generar-invitacion`, payload, { headers })
      .subscribe({
        next: (response) => {
          this.loading = false;

          console.log('Respuesta backend:', response);

          if (metodoPago === 'MercadoPago') {

            this.qrImage = response.qrImage || null;
            this.linkPago = response.url || null;

            this.mensaje = 'Podés pagar escaneando el QR o usando el enlace.';

            // ✅ Swal de éxito
            Swal.fire({
              icon: 'success',
              title: 'Invitación creada',
              text: 'Mostrá el QR o compartí el link para que realicen el pago.',
              timer: 2500,
              showConfirmButton: false
            });

          } else {
            this.mensaje = '✔ Invitación generada correctamente.';

            // ✅ Swal para efectivo
            Swal.fire({
              icon: 'success',
              title: 'Invitación creada',
              text: 'Registrá el pago en efectivo en el gimnasio.',
              timer: 2500,
              showConfirmButton: false
            });
          }

          // ✅ Limpiar formulario y dejar valores por defecto
          this.form.reset({
            nombre: '',
            apellidos: '',
            dni: '',
            telefono: '',
            email: '',
            metodoPago: 'efectivo',
            periodo: 'mes',
            monto: 10
          });
          this.form.markAsPristine();
          this.form.markAsUntouched();
        },
        error: (err) => {
          this.loading = false;

          const backendMsg = err.error?.mensaje;
          const socioId = err.error?.socioId;

          // Email duplicado
          if (backendMsg === "EMAIL_DUPLICADO") {
            Swal.fire({
              icon: 'warning',
              title: 'Email ya registrado',
              text: 'Este email pertenece a un socio existente.',
              confirmButtonColor: '#8B52FF'
            }).then(() => {
              if (socioId) {
                this.router.navigate(['/homeAdmin/socios'], {
                  queryParams: { socioId }
                });
              }
            });
            return;
          }

          // DNI duplicado
          if (backendMsg === "DNI_DUPLICADO") {
            Swal.fire({
              icon: 'warning',
              title: 'DNI ya registrado',
              text: 'Este DNI pertenece a un socio existente.',
              confirmButtonColor: '#8B52FF'
            }).then(() => {
              if (socioId) {
                this.router.navigate(['/homeAdmin/socios'], {
                  queryParams: { socioId }
                });
              }
            });
            return;
          }

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo generar la invitación.'
          });
        }


      });
  }

  

  volverAtras(): void {
    this.location.back();
  }
}





