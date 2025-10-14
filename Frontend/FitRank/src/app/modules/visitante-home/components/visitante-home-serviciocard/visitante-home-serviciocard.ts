import { Component, input } from '@angular/core';

@Component({
  selector: 'app-visitante-home-serviciocard',
  imports: [],
  templateUrl: './visitante-home-serviciocard.html',
  styleUrl: './visitante-home-serviciocard.css'
})
export class VisitanteHomeServiciocard {
  imgSrc = input<string>();
  title = input<string>()
  description = input<string>();
}
