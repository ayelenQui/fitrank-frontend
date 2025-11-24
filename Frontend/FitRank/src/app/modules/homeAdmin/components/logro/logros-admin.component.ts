import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogrosGimnasioService } from '@app/api/services/logro/logro-gimnasio.service';
import { AuthService } from '@app/api/services/activacion/AuthService.service';

@Component({
  selector: 'app-logros-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logros-admin.component.html',
  styleUrls: ['./logros-admin.component.css']
})
export class LogrosAdminComponent implements OnInit {

  logros: any[] = [];
  cargando = true;
  gimnasioId!: number; // <<-- LO DEFINIMOS

  constructor(
    private logrosService: LogrosGimnasioService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    /* OBTENER EL GIMNASIO ID DEL LOGIN */
    this.gimnasioId = this.authService.obtenerGimnasioId() ?? 0;

    if (!this.gimnasioId || this.gimnasioId <= 0) {
      console.error("⚠ No se encontró gimnasioId del usuario logueado");
      this.cargando = false;
      return;
    }

    this.cargarLogros();
  }

  cargarLogros(): void {
    this.logrosService.obtenerLogros(this.gimnasioId).subscribe({
      next: (data) => {
        this.logros = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando logros', err);
        this.cargando = false;
      }
    });
  }

  toggleLogro(logro: any): void {
    const nuevoEstado = !logro.estaHabilitado;

    const payload = {
      estaHabilitado: nuevoEstado
    };

    this.logrosService.actualizarLogro(this.gimnasioId, logro.logroId, payload)
      .subscribe({
        next: (resp) => {
          logro.estaHabilitado = resp.estaHabilitado;
        },
        error: (err) => console.error('Error actualizando logro', err)
      });
  }
}
