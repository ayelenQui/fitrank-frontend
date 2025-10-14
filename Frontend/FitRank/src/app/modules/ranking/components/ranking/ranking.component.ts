import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingService } from '../../../../api/services/ranking/ranking.service';
import { MostrarRankingDTO, MostrarRankingDTOGrupo, GrupoMuscularFrontend } from '../../../../api/services/ranking/interfaces/ranking.interface';  // Ajusta path si es necesario
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  rankings: MostrarRankingDTO[] = [];
  rankingsGrupo: MostrarRankingDTOGrupo[] = [];

  // ✅ number[] para IDs del enum (ej. [0, 1, 6])
  gruposMusculares: number[] = [];

  // ✅ signal<number | null> para manejar selección (null = "Todos")
  grupoSeleccionado = signal<number | null>(null);

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

        // ✅ Map a numbers (IDs del enum)
        const grupos = data.map(item => item.GrupoMuscular);
        this.gruposMusculares = [...new Set(grupos)].sort((a, b) => a - b);  // Ordena numéricamente

        console.log('Grupos cargados (IDs):', this.gruposMusculares);  // Debug: [0, 1, 6]
      },
      error: (error) => {
        console.error('Error al cargar el ranking por grupo muscular:', error);
      }
    });
  }

  // ✅ Fix TS2345: Parámetro como number | null para permitir null ("Todos")
  seleccionarGrupo(grupo: number | null): void {
    this.grupoSeleccionado.set(grupo);
    console.log('Grupo seleccionado (ID):', grupo);  // Debug: 6 o null
  }

  // ✅ Filtro: Compara numbers (o null para todos)
  filtrarPorGrupo(): MostrarRankingDTOGrupo[] {
    const grupoId = this.grupoSeleccionado();  // number | null
    if (!grupoId) return this.rankingsGrupo;  // Si null, retorna todos

    // ✅ Compara number === number
    return this.rankingsGrupo.filter(item => item.GrupoMuscular === grupoId);
  }

  // ✅ Mapper para mostrar nombre legible (number → string)
  getGrupoName(grupoId: number): string {
    switch (grupoId) {
      case GrupoMuscularFrontend.Pecho: return 'Pecho';
      case GrupoMuscularFrontend.Espalda: return 'Espalda';
      case GrupoMuscularFrontend.Piernas: return 'Piernas';
      case GrupoMuscularFrontend.Hombros: return 'Hombros';
      case GrupoMuscularFrontend.Brazos: return 'Brazos';
      case GrupoMuscularFrontend.Abdomen: return 'Abdomen';
      case GrupoMuscularFrontend.Gluteo: return 'Glúteo';
      case GrupoMuscularFrontend.Cardio: return 'Cardio';
      default: return 'Desconocido';
    }
  }

  // ✅ Fix TS2339: Método agregado para avatar (igual que en tu servicio)
  getUserInitial(userName: string): string {
    return userName ? userName.charAt(0).toUpperCase() : '?';
  }

  // Opcional: Computed para reactividad (usa en HTML si quieres)
  rankingFiltrado = computed(() => this.filtrarPorGrupo());
}
