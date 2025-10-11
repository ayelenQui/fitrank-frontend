import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RankingService } from '../../../../api/services/ranking/ranking.service';  
import { MostrarRankingDTO, MostrarRankingDTOGrupo } from '../../../../api/services/ranking/interfaces/ranking.interface';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class Ranking implements OnInit {
  rankings: MostrarRankingDTO[] = [];
  rankingsGrupo: MostrarRankingDTOGrupo[] = [];

  gruposMusculares: string[] = [];

  grupoSeleccionado = signal<string | null>(null);

  constructor(private rankingService: RankingService) { }

  ngOnInit(): void {
    this.cargarRankingGeneral();
    this.cargarRankingGrupoMuscular();
  }

  cargarRankingGeneral(): void {
    this.rankingService.getRanking().subscribe({
      next: (data) => {
        this.rankings = data;
      },
      error: (error) => {
        console.error('Error al cargar el ranking general:', error);
      }
    });
  }

  cargarRankingGrupoMuscular(): void {
    this.rankingService.getRankingGrupoMuscular().subscribe({
      next: (data) => {
        this.rankingsGrupo = data;

        // ✅ Usa el nombre correcto del campo: "GrupoMuscular"
        const grupos = data.map(item => item.GrupoMuscular);
        this.gruposMusculares = [...new Set(grupos)];
      },
      error: (error) => {
        console.error('Error al cargar el ranking por grupo muscular:', error);
      }
    });
  }

  seleccionarGrupo(grupo: string): void {
    this.grupoSeleccionado.set(grupo);
  }

  filtrarPorGrupo(): MostrarRankingDTOGrupo[] {
    const grupo = this.grupoSeleccionado();
    if (!grupo) return this.rankingsGrupo;
    // ✅ También usa "GrupoMuscular" en el filtro
    return this.rankingsGrupo.filter(item => item.GrupoMuscular === grupo);
  }
}
