
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../api/services/activacion/AuthService.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  error: string = '';
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Maneja error de query param (e.g., de activación)
    this.route.queryParams.subscribe(params => {
      if (params['error']) {
        this.error = params['error'];
      }
    });

    // Form de login
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.form.invalid) {
      this.error = 'Completa los campos correctamente.';
      return;
    }

    this.loading = true;
    this.error = '';

    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.mensaje = 'Login exitoso. Redirigiendo...';
        setTimeout(() => this.router.navigate(['/home']), 1000);  // Delay para ver mensaje
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.Mensaje || 'Email o contraseña inválidos. Si es nueva cuenta, activa desde el email.';
        console.error(err);
      }
    });
  }
}
