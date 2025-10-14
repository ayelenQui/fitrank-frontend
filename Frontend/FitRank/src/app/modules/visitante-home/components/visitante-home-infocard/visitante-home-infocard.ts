import { Component, input } from '@angular/core';

@Component({
  selector: 'app-visitante-home-infocard',
  imports: [],
  templateUrl: './visitante-home-infocard.html',
  styleUrl: './visitante-home-infocard.css'
})
export class VisitanteHomeInfocard {
  imagenSrc = input<string>();
  titulo = input<string>();
  descripcion = input<string>();
}
