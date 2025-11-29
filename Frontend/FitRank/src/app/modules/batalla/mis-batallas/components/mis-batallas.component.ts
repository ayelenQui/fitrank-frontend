import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { BatallaService } from '@app/api/services/batallas/batalla.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import gsap from 'gsap';

@Component({
  selector: 'app-mis-batallas',
  templateUrl: './mis-batallas.component.html',
  styleUrls: ['./mis-batallas.component.css','../../../css-socio/socio-common.css'], 
  imports: [FormsModule, CommonModule]
})
export class MisBatallasComponent implements OnInit, AfterViewInit, AfterViewChecked {

  user = this.auth.obtenerUser();
  socioActualId = this.user?.id;

  activas: any[] = [];
  pendientes: any[] = [];
  historial: any[] = [];

  cargasCompletadas = 0;
  animacionHecha = false;

  constructor(
    private batallasService: BatallaService,
    private router: Router,
    private auth: AuthService,
    private location: Location
  ) {}

  ngOnInit() {
    this.cargarBatallas();
  }

  cargarBatallas() {
    this.cargasCompletadas = 0;
    this.animacionHecha = false;

    this.batallasService.obtenerActivas(this.socioActualId).subscribe({
      next: data => {
        this.animacionHecha = false;
        this.activas = data;
        this.verificarCargaCompleta();
      },
      error: err => console.error(err)
    });

    this.batallasService.obtenerPendientes(this.socioActualId).subscribe({
      next: data => {
        this.animacionHecha = false;
        this.pendientes = data;
        this.verificarCargaCompleta();
      },
      error: err => console.error(err)
    });

    this.batallasService.historial(this.socioActualId).subscribe({
      next: data => {
        this.animacionHecha = false;
        this.historial = data;
        this.verificarCargaCompleta();
      },
      error: err => console.error(err)
    });
  }

  verificarCargaCompleta() {
    this.cargasCompletadas++;

    if (this.cargasCompletadas === 3) {
      setTimeout(() => {
        this.animarTarjetas();
        this.animacionHecha = true;
      }, 0);
    }
  }

  getOponente(p: any) {
    return p.oponente ?? (p.socioAId === this.socioActualId ? 'Esperando respuesta' : 'Invitación');
  }

  verDetalle(id: number, oponente: string) {
    this.router.navigate(['batalla/batallas', id], {
      queryParams: { oponente }
    });
  }

  volverAtras() {
    this.location.back();
  }

  Crear() {
    this.router.navigate(['/batalla/crear']);
  }

  aceptar(id: number) {
    this.batallasService.aceptar(id).subscribe({
      next: () => this.cargarBatallas(),
      error: err => console.error("Error al aceptar batalla:", err)
    });
  }

  rechazar(id: number) {
    this.batallasService.rechazar(id).subscribe({
      next: () => this.cargarBatallas(),
      error: err => console.error("Error al rechazar batalla:", err)
    });
  }


  ngAfterViewInit() {
    this.animarTitulosYBotones();
  }

  ngAfterViewChecked() {
  setTimeout(() => {
    const tarjetas = document.querySelectorAll('.tarjeta');

    if (tarjetas.length > 0 && !this.animacionHecha) {
      this.animarTarjetas();
      this.animacionHecha = true;
    }
  }, 0);
}

  animarTitulosYBotones() {
    gsap.fromTo('.titulo',
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );

    gsap.fromTo('.subtitulo',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power3.out' }
    );

    gsap.fromTo(' .btn-detalle',
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.2 }
    );
  }

  animarTarjetas() {
    gsap.fromTo('.tarjeta',
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.15, ease: 'power3.out' }
    );
  }

}
