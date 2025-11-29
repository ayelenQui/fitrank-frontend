import { CommonModule } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PuntajeService } from '@app/api/services/puntaje/puntaje.service';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { SidebarSocioComponent } from '@app/public/sidebar-socio/sidebar-socio.component';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import gsap from 'gsap';
import { ObtenerGrupoMuscularDTO } from '@app/api/services/grupoMuscular/interfaces/grupoMuscular.interface';
import { GrupoMuscularService } from '@app/api/services/grupoMuscular/grupoMuscular.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule ],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css', '../../../css-socio/socio-common.css']
})
export class RankingComponent implements OnInit {
  ranking: any[] = [];
  cargando = true;
  user = this.auth.obtenerUser()
  gimnasioId = this.user.gimnasioId; 
  grupoSeleccionado: number = 0;
  cantidad: number = 20;
    desde: string = "";
    hasta: string = "";
  mensaje: string = "";

grupos: ObtenerGrupoMuscularDTO[] = [];

  constructor(
    private puntajeService: PuntajeService,
    private auth: AuthService,
    private grupoMuscularService: GrupoMuscularService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.cargarRanking();
    this.cargarGruposMusculares();
    this.user.id = this.user.id 
    
  }

  public cargarRanking(): void {
    this.puntajeService.obtenerRanking(this.gimnasioId, this.cantidad).subscribe({
      next: (data) => {
        this.ranking = data ?? [];
        this.cargando = false;
        if (data.length === 0) {
                this.mensaje = "No hay resultados para el filtro seleccionado.";
              } else {
                this.mensaje = "";
              }
        setTimeout(() => {
          this.animarTitulo();
          this.animarRanking();
        }, 100);
      },
      error: (err) => {
        console.error(' Error al obtener ranking:', err);
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
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', clearProps: 'opacity,transform' }
      );
    });
  }

  getMedalla(index: number): string {
    const medallas = ['🥇', '🥈', '🥉'];
    return medallas[index] ?? '';
  }
  
  
  filtrar(): void {
  this.cargando = true;

  this.puntajeService.obtenerRankingFiltrado(
    this.gimnasioId,
    this.grupoSeleccionado !== 0 ? this.grupoSeleccionado : undefined,
    this.desde || undefined,
    this.hasta || undefined,
    this.cantidad
  ).subscribe(this.handleResponse());
}

resetFiltros() {
  this.desde = "";
  this.hasta = "";
  this.grupoSeleccionado = 0;
  this.mensaje = "";
  this.cargarRanking();
}



  
private handleResponse() {
  return {
    next: (data: any[]) => {
      this.ranking = data ?? [];
      this.cargando = false;

      if (!data || data.length === 0) {
        this.mensaje = "No hay resultados para el filtro seleccionado.";
      } else {
        this.mensaje = "";
      }

      this.animarRanking();
    },
    error: (err: any) => {
      console.error(" Error filtrando:", err);
      this.cargando = false;
      this.mensaje = "Ocurrió un error al filtrar.";
    }
  };
}

private cargarGruposMusculares(): void {
  this.grupoMuscularService.obtenerTodos().subscribe({
    next: (data) => this.grupos = data ?? [],
    error: (err) => console.error(" Error obteniendo grupos musculares:", err)
  });
}

}
