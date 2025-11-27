
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../api/services/activacion/AuthService.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';  

@Component({
  selector: 'app-activacion',
  templateUrl: './activacion.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class ActivacionComponent implements OnInit {
  token!: string;
  form!: FormGroup;
  mensaje: string = '';
  loading: boolean = false;
  error: string = '';
  tokenValido: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      if (!this.token) {
        this.error = 'Token no encontrado. Verifica el enlace del email.';
        this.router.navigate(['/login']);
        return;
      }
      
      this.validarToken();
    });

    this.form = this.fb.group({
      nuevaPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmarPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { validators: this.passwordMatchValidator });  
  }

  
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const nueva = group.get('nuevaPassword')?.value;
    const confirmar = group.get('confirmarPassword')?.value;
    return nueva === confirmar ? null : { mismatch: true };
  }

  validarToken() {
    this.loading = true;
    this.error = '';
    this.authService.validarTokenActivacion(this.token).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.valido) {
          this.tokenValido = true;
          this.mensaje = 'Token válido. Establece tu nueva contraseña por seguridad.';
        } else {
          this.error = response.mensaje || 'Token inválido o expirado. Solicita un nuevo email.';
          this.router.navigate(['/login'], { queryParams: { error: this.error } });
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error al validar token. Intenta de nuevo.';
        console.error(err);
        
      }
    });
  }

  activarCuenta() {
    if (this.form.invalid || !this.tokenValido) {
      this.mensaje = 'Completa el formulario correctamente.';
      return;
    }

    this.loading = true;
    this.error = '';
    const nuevaPassword = this.form.get('nuevaPassword')?.value;

    this.authService.activarCuenta(this.token, nuevaPassword!).subscribe({
      next: (response) => {
        this.mensaje = '✅ Cuenta activada con éxito. Iniciando sesión...';
        const email = response.email || (response as any).Email;

       
        setTimeout(() => {
          this.autoLogin(email);
        }, 1000);
      },
      error: (err) => {
        this.loading = false;
        this.error = '❌ Error al activar cuenta. Verifica el token o intenta de nuevo.';
        console.error(err);
      }
    });
  }
  private autoLogin(email: string) {
    const nuevaPassword = this.form.get('nuevaPassword')?.value;
    this.authService.login(email, nuevaPassword!).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/home/home-socio']); 
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Cuenta activada, pero error en login. Inicia sesión manualmente.';
        console.error(err);
        this.router.navigate(['/login']);
      }
    });
  }

  
  get passwordMismatch() {
    return this.form.hasError('mismatch', 'confirmarPassword');
  }
}
