import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuntajeService } from '@app/api/services/puntaje/puntaje.service';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, HeaderSocioComponent],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  ranking: { socioId: number; nombre: string; totalPuntos: number }[] = [];
  cargando = true;

  constructor(private puntajeService: PuntajeService) { }

  ngOnInit(): void {
    this.cargarRanking();
  }

  cargarRanking(): void {
    this.puntajeService.getAll().subscribe({
      next: (puntajes) => {
        const acumulado: { [key: number]: number } = {};

        for (const p of puntajes) {
          const socioId = p.serieRealizada?.ejercicioRealizadoId ?? 0;
          acumulado[socioId] = (acumulado[socioId] || 0) + p.valor;
        }

        this.ranking = Object.entries(acumulado)
          .map(([socioId, totalPuntos]) => ({
            socioId: +socioId,
            nombre: `Socio #${socioId}`, // (si tu backend trae nombres, los reemplazás)
            totalPuntos
          }))
          .sort((a, b) => b.totalPuntos - a.totalPuntos);

        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar ranking:', err);
        this.cargando = false;
      }
    });
  }
}
