import { Component, input } from '@angular/core';

@Component({
  selector: 'app-visitante-home-cta-infocard',
  imports: [],
  templateUrl: './visitante-home-cta-infocard.html',
  styleUrl: './visitante-home-cta-infocard.css'
})
export class VisitanteHomeCtaInfocard {
  imgSrc = input<string>('');
  title = input<string>('');
  description = input<string>('');
}
