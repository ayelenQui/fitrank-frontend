import { Component, OnInit } from '@angular/core';
import { LogroSocio, LogrosSocioService } from '@app/api/services/logro/logro-socio.service';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-logros',
  imports: [CommonModule],
  templateUrl: './mis-logros-component.html',
  styleUrls: ['./mis-logros-component.css']
})
export class MisLogrosComponent implements OnInit {

  logros: LogroSocio[] = [];
  cargando = false;
  error?: string;

  private socioId!: number;
  private usuario : any;
  private gimnasioId: number | null = null;

  constructor(
    private logrosSocioService: LogrosSocioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUser();
    this.socioId = this.usuario.id;
    this.gimnasioId = this.authService.obtenerGimnasioId();

    this.cargarLogros();
  }

  cargarLogros(): void {
    if (this.gimnasioId == null) return;
    
    this.cargando = true;
    this.error = undefined;

    this.logrosSocioService.obtenerLogrosObtenidos(this.socioId, this.gimnasioId)
      .subscribe({
        next: (logros) => {
          console.log('Logros socio:', logros);
          this.logros = logros;
          this.cargando = false;
        },
        error: () => {
          this.error = 'Ocurrió un error al cargar tus logros.';
          this.cargando = false;
        }
      });
  }
}
