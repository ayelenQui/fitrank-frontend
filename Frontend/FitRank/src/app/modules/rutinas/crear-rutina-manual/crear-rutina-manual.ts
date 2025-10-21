import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RutinaService } from '@app/api/services/rutina/rutinaService';
import gsap from 'gsap';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { AgregarRutinaDTO } from '@app/api/services/rutina/interfaces/rutina.interface.rest';

@Component({
  selector: 'app-crear-rutina-manual',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-rutina-manual.html',
  styleUrls: ['./crear-rutina-manual.css', '../../css-socio/socio-common.css']
})
export class CrearRutinaManualComponent implements OnInit, AfterViewInit {

  diasFrecuencia: number[] = [1, 2, 3, 4, 5, 6, 7]; // para el select de frecuencia

  rutinaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rutinaService: RutinaService,
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    const user = this.authService.obtenerUser();

    this.rutinaForm = this.fb.group({
      nombre: ['', Validators.required],
      dificultadId: ['', Validators.required],
      frecuencia: ['', Validators.required],
    });
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
    if (this.rutinaForm.invalid) {
      this.rutinaForm.markAllAsTouched();
      return;
    }

    const rutina: AgregarRutinaDTO = this.rutinaForm.value;

    this.rutinaService.crearRutina(rutina).subscribe({
      next: (resp) => {
        console.log('✅ Rutina creada:', resp);
        // Redirigir a la siguiente vista, pasando el ID de la rutina creada
        this.router.navigate(['/rutina/crear-sesiones-rutina', resp.id]);
      },
      error: (err) => {
        console.error('❌ Error al crear rutina', err);
        alert('Hubo un error al crear la rutina');
      }
    });
  }

  volverAtras(): void {
    this.location.back();
  }
}
