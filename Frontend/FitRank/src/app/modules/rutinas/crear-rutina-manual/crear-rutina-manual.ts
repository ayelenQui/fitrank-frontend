import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import gsap from 'gsap';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { AgregarRutinaDTO } from '@app/api/services/rutina/interfaces/rutina.interface.rest';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';

@Component({
  selector: 'app-crear-rutina-manual',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderSocioComponent],
  templateUrl: './crear-rutina-manual.html',
  styleUrls: ['./crear-rutina-manual.css', '../../css-socio/socio-common.css']
})
export class CrearRutinaManualComponent implements OnInit, AfterViewInit {



  rutinaForm!: FormGroup;
  rolUsuario: string = '';           
  sociosDisponibles: any[] = [];    
  socioSeleccionadoId?: number;

  constructor(
    private fb: FormBuilder,
    private rutinaService: RutinaService,
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    const user = this.authService.obtenerUser();
    
    this.rolUsuario = user?.Rol;

    this.rutinaForm = this.fb.group({
      nombre: ['', Validators.required],
      tipoCreacion: ['Manual', Validators.required],
      descripcion: [''],
      activa: [true, Validators.required],
      socioId: [null, Validators.required],
      usuarioId: [null, Validators.required]
    });
    
    if (user) {
      if (this.rolUsuario === 'Socio') {
        this.rutinaForm.patchValue({
          socioId: user.Id,
          usuarioId: user.Id
        });
      } else if (this.rolUsuario === 'Profesor' || this.rolUsuario === 'Admin') {
        this.rutinaForm.patchValue({
          usuarioId: user.Id
        });
        
      }
    }
  }

  




  ngAfterViewInit(): void {
    setTimeout(() => {
      const tl = gsap.timeline();

      // Animación título
      tl.from('.titulo-form', {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: 'power2.out'
      });

      // Animación contenedor del formulario
      tl.from('.form-container', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3');
    });
  }

  crearRutina(): void {
    console.log("📤 Enviando rutina al backend:", this.rutinaForm.value);

    if (this.rutinaForm.invalid) {
      console.warn("⚠️ Formulario inválido:", this.rutinaForm.value);
      this.rutinaForm.markAllAsTouched();
      return;
    }

    const rutina: AgregarRutinaDTO = this.rutinaForm.value;

    this.rutinaService.crearRutina(rutina).subscribe({
      next: (resp) => {
        console.log("✅ Rutina creada:", resp);
        this.router.navigate(['/rutina/crear-sesiones-rutina', resp.id]);
      },
      error: (err) => {
        console.error("❌ Error al crear rutina:", err);
      }
    });
  }

  volverAtras(): void {
    this.location.back();
  }
}
