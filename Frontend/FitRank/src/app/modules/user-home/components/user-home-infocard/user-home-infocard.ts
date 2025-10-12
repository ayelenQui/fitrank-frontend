import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-home-infocard',
  imports: [],
  templateUrl: './user-home-infocard.html',
  styleUrl: './user-home-infocard.css'
})
export class UserHomeInfocard {
  imagenSrc = input<string>();
  titulo = input<string>();
  descripcion = input<string>();
}
