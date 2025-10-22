import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Participante, TorneosService } from '@app/api/services/torneo/torneo.service';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { Location } from '@angular/common';


@Component({
  selector: 'app-ranking',
  templateUrl: './ver-torneo.component.html',
  imports: [CommonModule, FormsModule, HeaderSocioComponent],
  styleUrls: ['./ver-torneo.component.css', '../../css-socio/socio-common.css'],

})
export class RankingTorneoComponent implements OnInit {
  torneoId!: number;
  nombreTorneo: string = '';
  participantes: Participante[] = [];
  nombre: string = '';
  puntaje: number = 0;

  constructor(private route: ActivatedRoute, private torneosService: TorneosService, private location: Location) {}

  ngOnInit() {
  this.torneoId = Number(this.route.snapshot.paramMap.get('id'));

  // obtener nombre y ranking en paralelo
  this.torneosService.listarTorneos().subscribe(torneos => {
    const torneo = torneos.find(t => t.id === this.torneoId);
    if (torneo) {
      this.nombreTorneo = torneo.nombre;
    }
  });

  this.cargarRanking(); // carga solo participantes
}

  cargarRanking() {
    this.torneosService.obtenerRanking(this.torneoId).subscribe(r => this.participantes = r);
  }

  agregarParticipante() {
    if (!this.nombre.trim()) return;
    
    const p: Participante = { nombre: this.nombre, puntaje: this.puntaje };
    this.torneosService.agregarParticipante(this.torneoId, p).subscribe(r => {
      this.participantes = r;
      this.nombre = '';
      this.puntaje = 0;
    });
  }

  volverAtras(): void {
    this.location.back();
  }
}
