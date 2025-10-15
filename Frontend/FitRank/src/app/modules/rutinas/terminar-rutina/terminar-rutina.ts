import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // <-- importamos Router

@Component({
  selector: 'app-terminar-rutina',
  templateUrl: './terminar-rutina.component.html',
  styleUrls: ['./terminar-rutina.component.css']
})
export class TerminarRutinaComponent implements OnInit {

  puntosTotales: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.obtenerResumenMock();
  }

  obtenerResumenMock(): void {
    const resumenMock = {
      puntosTotales: 185,
      zonasTrabajadas: ['Pectorales', 'Bíceps', 'Espalda']
    };
    this.puntosTotales = resumenMock.puntosTotales;
  }

  volverHome(): void {
    this.router.navigate(['/home']); // navega a la ruta /home
  }

  verRanking(): void {
    this.router.navigate(['/rutina/ranking']); // navega a la ruta /rutina/ranking
  }
}
