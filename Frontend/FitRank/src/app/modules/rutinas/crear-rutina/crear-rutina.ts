import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { Location } from '@angular/common';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';


@Component({
  selector: 'app-crear-rutina',
  imports: [CommonModule, HeaderSocioComponent],
  standalone: true,
  templateUrl: './crear-rutina.html',
  styleUrls: ['./crear-rutina.css', '../../css-socio/socio-common.css'],
})
export class CrearRutinaComponent implements AfterViewInit {
  seleccion: string | null = null;

  constructor(private router: Router, private location : Location) {}

  ngAfterViewInit() {
    gsap.fromTo(
    '.titulo',
    { y: -30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
  );

  gsap.fromTo(
    '.subtitulo',
    { y: -15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, delay: 0.2, ease: 'power3.out' }
  );

  // Animación tarjetas
  gsap.fromTo(
    '.card',
    { y: 20, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.15, delay: 0.4, ease: 'power3.out' }
  );

  // Animación botón
  gsap.fromTo(
    '.btn-empezar',
    { scale: 0.85, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.4, delay: 0.8, ease: 'power3.out' }
  );

  const boton = document.querySelector('.btn-empezar');
    boton?.addEventListener('mouseenter', () => {
    gsap.to(boton, { scale: 1.1, duration: 0.1, ease: 'power1.out' });
  });
  boton?.addEventListener('mouseleave', () => {
    gsap.to(boton, { scale: 1, duration: 0.1, ease: 'power1.out' });
  });

  }
  

  seleccionar(tipo: string) {
    this.seleccion = tipo;
  }

  empezar() {
    if (!this.seleccion) return;

    switch (this.seleccion) {
      case 'manual':
        this.router.navigate(['/rutina/crear-manual']);
        break;
      case 'automatica':
        alert('Rutina automática aún no disponible.');
        break;
      case 'asistida':
        alert('Rutina asistida próximamente.');
        break;
    }
  }

  volverAtras(): void {
    this.location.back();
  }
}
