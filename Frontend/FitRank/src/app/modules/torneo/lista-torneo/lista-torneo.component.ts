import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Torneo, TorneosService } from '@app/api/services/torneo/torneo.service';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-torneos',
  templateUrl: './lista-torneo.component.html',
  imports: [CommonModule, FormsModule, HeaderSocioComponent],
  styleUrls: ['./lista-torneo.component.css', '../../css-socio/socio-common.css'],

  
})
export class ListaTorneosComponent implements OnInit {
  torneos: Torneo[] = [];
  nuevoNombre: string = '';
  mensaje: string = '';

  constructor(private torneosService: TorneosService, private router: Router, private location: Location) {}

  ngOnInit() {
    this.cargarTorneos();
  }

  cargarTorneos() {
    this.torneosService.listarTorneos().subscribe(t => this.torneos = t);
  }

  crearTorneo() {
    if (!this.nuevoNombre.trim()) return;

    this.torneosService.crearTorneo(this.nuevoNombre).subscribe({
      next: torneo => {
        this.mensaje = `Torneo "${torneo.nombre}" creado`;
        this.nuevoNombre = '';
        this.cargarTorneos();
      },
      error: () => this.mensaje = 'Error al crear torneo'
    });
  }

  verRanking(torneoId: number) {
    this.router.navigate(['/torneo/ver-torneo', torneoId]);
  }

  volverAtras(): void {
    this.location.back();
  }
}
