import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-home-hero-minicard',
  imports: [],
  templateUrl: './user-home-hero-minicard.html',
  styleUrl: './user-home-hero-minicard.css'
})
export class UserHomeHeroMinicard {
  titulo = input<string>('');
  descripcion = input<string>('');
}
