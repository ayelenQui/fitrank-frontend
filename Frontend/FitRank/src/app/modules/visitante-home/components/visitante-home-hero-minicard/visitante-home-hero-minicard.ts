import { Component, input } from '@angular/core';

@Component({
  selector: 'app-visitante-home-hero-minicard',
  imports: [],
  templateUrl: './visitante-home-hero-minicard.html',
  styleUrl: './visitante-home-hero-minicard.css'
})
export class VisitanteHomeHeroMinicard {
  titulo = input<string>('');
  descripcion = input<string>('');
}
