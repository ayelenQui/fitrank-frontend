import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogroAdminView, LogroGimnasio, LogrosGimnasioService } from '@app/api/services/logro/logro-gimnasio.service';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { forkJoin } from 'rxjs';
import { Logro, LogroService } from '@app/api/services/logro/logro.service';

@Component({
  selector: 'app-logros-admin',
  imports: [CommonModule],
  templateUrl: './logros-admin.component.html',
  styleUrls: ['./logros-admin.component.css']
})
export class LogrosAdminComponent implements OnInit {

  logros: LogroAdminView[] = [];
  cargando = false;
  error?: string;

  private gimnasioId!: number;

  constructor(
    private logroService: LogroService,
    private logrosGimnasioService: LogrosGimnasioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // si ya tenés esto en el token:
    const gymId = this.authService.obtenerGimnasioId?.();

    if (gymId == null) {
      this.error = 'No se encontró el gimnasio en el token.';
      return;
    }

    this.gimnasioId = gymId;
    this.cargarLogros();
  }

  private cargarLogros(): void {
    this.cargando = true;
    this.error = undefined;

    forkJoin({
      globales: this.logroService.obtenerTodos(),
      gimnasio: this.logrosGimnasioService.obtenerPorGimnasio(this.gimnasioId)
    }).subscribe({
      next: ({ globales, gimnasio }) => {
        this.logros = this.combinarLogros(globales, gimnasio);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando logros:', err);
        this.error = 'Ocurrió un error al cargar los logros.';
        this.cargando = false;
      }
    });
  }

  private combinarLogros(globales: Logro[], gimnasio: LogroGimnasio[]): LogroAdminView[] {
    return globales.map((lg) => {
      const lgGym = gimnasio.find(x => x.logroId === lg.id);

      return {
        gimnasioId: this.gimnasioId,
        logroId: lg.id,
        nombre: lg.nombre,
        nombreClave: lg.nombreClave,
        descripcion: lg.descripcion,
        imagen: lg.imagen,
        estaHabilitado: lgGym?.estaHabilitado ?? false
      };
    });
  }

  onToggleEstado(logro: LogroAdminView): void {
    const nuevoEstado = !logro.estaHabilitado;
    const estadoAnterior = logro.estaHabilitado;

    logro.estaHabilitado = nuevoEstado;

    this.logrosGimnasioService.actualizarEstado(
      this.gimnasioId,
      logro.logroId,
      nuevoEstado
    ).subscribe({
      next: (actualizado) => {
        // si el back devuelve el dto actualizado
        logro.estaHabilitado = actualizado.estaHabilitado;
      },
      error: (err) => {
        console.error('Error actualizando estado logro:', err);
        logro.estaHabilitado = estadoAnterior;
        this.error = 'No se pudo actualizar el estado del logro.';
      }
    });
  }
}