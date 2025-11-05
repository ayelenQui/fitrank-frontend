import { CommonModule } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import { PuntajeService } from '@app/api/services/puntaje/puntaje.service';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { SidebarSocioComponent } from '@app/public/sidebar-socio/sidebar-socio.component';
import gsap from 'gsap';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, HeaderSocioComponent, SidebarSocioComponent],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css', '../../../css-socio/socio-common.css']
})
export class RankingComponent implements OnInit {
  ranking: any[] = [];
  cargando = true;

  constructor(
    private puntajeService: PuntajeService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.cargarRanking();
  }

  private cargarRanking(): void {
    this.puntajeService.obtenerRanking().subscribe({
      next: (data) => {
        this.ranking = data ?? [];
        this.cargando = false;

        // Esperar a que el DOM se actualice y renderice el título
        setTimeout(() => {
          this.animarTitulo();
          this.animarRanking();
        }, 100);
      },
      error: (err) => {
        console.error('❌ Error al obtener ranking:', err);
        this.cargando = false;
      }
    });
  }

  private animarTitulo(): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.fromTo(
        '.titulo',
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', clearProps: 'all' }
      );
    });
  }

  private animarRanking(): void {
    this.ngZone.runOutsideAngular(() => {
      gsap.fromTo(
        '.card-ranking',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', clearProps: 'all' }
      );
    });
  }

  getMedalla(index: number): string {
    const medallas = ['🥇', '🥈', '🥉'];
    return medallas[index] ?? '';
  }
}
