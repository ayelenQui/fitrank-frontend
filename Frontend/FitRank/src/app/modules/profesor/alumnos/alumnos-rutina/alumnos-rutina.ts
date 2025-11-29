import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { EntrenamientoService } from '@app/api/services/entrenamiento/entrenamiento.service';
import { ActividadHistorialDTO, EntrenamientoHistorialDTO } from '@app/api/services/entrenamiento/interface/entrenamientoHistorial.interface';
import { RutinaService } from '@app/api/services/rutina/rutinaService';

interface AlumnoResumen {
  nombreSocio: string;
  nombreRutina: string;
  ultimaFecha: string;
}

@Component({
  selector: 'app-alumnos-rutina',
  imports: [CommonModule, FormsModule],
  templateUrl: './alumnos-rutina.html',
  styleUrl: './alumnos-rutina.css'
})
export class AlumnosRutina implements OnInit{
  user: any = null;
  profesorId: any;
  historial: EntrenamientoHistorialDTO[] = [];
  cargando = true;
  nombreFiltro = '';

constructor(private entrenamientoService: EntrenamientoService,
            private authService: AuthService) { }

    ngOnInit(): void {
    this.user = this.authService.obtenerUser();
    this.profesorId = this.user.id;
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.cargando = true;
    this.entrenamientoService.getHistorialAlumnosDelProfesor(this.profesorId)
      .subscribe({
        next: (historiales: EntrenamientoHistorialDTO[]) => {
          const mapa: { [key: string]: EntrenamientoHistorialDTO } = {};
          historiales.forEach(h => {
            const key = `${h.nombreSocio}-${h.nombreRutina}`;
            if (!mapa[key] || new Date(h.fecha) > new Date(mapa[key].fecha)) {
              mapa[key] = h;
            }
          });

          this.historial = Object.values(mapa);
          this.cargando = false;
        },
        error: (err) => {
          console.error(err);
          this.cargando = false;
        }
      });
  }

  buscarHistorial(): void {
    if (!this.nombreFiltro.trim()) {
      this.cargarHistorial();
      return;
    }

    this.historial = this.historial.filter(h =>
      h.nombreSocio.toLowerCase().includes(this.nombreFiltro.toLowerCase())
    );
  }
}