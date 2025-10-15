import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-rutina',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './crear-rutina.html',
  styleUrl: './crear-rutina.css',
 
})
export class CrearRutinaComponent {
   seleccion: string | null = null;

 constructor(private router: Router) {}

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
}
