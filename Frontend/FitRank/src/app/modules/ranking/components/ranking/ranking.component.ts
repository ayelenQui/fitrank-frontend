import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { RankingService } from '@app/api/services/ranking/ranking.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
=======
import { PuntajeService } from '@app/api/services/puntaje/puntaje.service';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
>>>>>>> origin/dev-lautaro

@Component({
  selector: 'app-ranking',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule],
=======
  imports: [CommonModule, HeaderSocioComponent],
>>>>>>> origin/dev-lautaro
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  ranking: any[] = [];
  miPuntaje: any;
  cantidadSeleccionada: number = 10;
  opciones = [1,2,10, 25, 100];
  usuarioId!: number;

  constructor(private rankingService: RankingService, 
    private authService: AuthService) {}

  ngOnInit(): void {
    const usuario = this.authService.obtenerUser();
    console.log('Usuario obtenido del AuthService:', usuario);
    if (usuario && usuario.Id) {
      this.usuarioId = usuario.Id;

      //this.usuarioId = 13;

      this.cargarRanking(this.cantidadSeleccionada);
      this.cargarMiPosicion();
    } else {
      console.warn('No hay usuario logueado');
    }
  }

  cargarRanking(cantidad: number): void {
    console.log('Solicitando ranking con cantidad:', cantidad);
    this.rankingService.obtenerRankingGeneral(cantidad).subscribe({
      next: (data) => {
        console.log('Ranking general recibido del backend:', data);
        this.ranking = data;
      },
      error: (err) => console.error('Error al obtener ranking general:', err)
    });
  }

  cargarMiPosicion(): void {
    if (!this.usuarioId) return;
console.log('Solicitando posición del usuario con ID:', this.usuarioId);
    this.rankingService.obtenerPuntajePorId(this.usuarioId).subscribe({
      next: (data) => {
        console.log('Posición del usuario recibido del backend:', data);
        this.miPuntaje = data;
      },
      error: (err) => console.error('Error al obtener posición del socio:', err)
    });
  }

  onCambioCantidad(): void {
     console.log('Cantidad seleccionada cambiada a:', this.cantidadSeleccionada);
    this.cargarRanking(this.cantidadSeleccionada);
  }
}
