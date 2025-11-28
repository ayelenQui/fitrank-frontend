import { Component } from '@angular/core';

@Component({
  selector: 'app-visitante-home-footer',
  imports: [],
  templateUrl: './visitante-home-footer.html',
  styleUrl: './visitante-home-footer.css'
})
export class VisitanteHomeFooter {
  anioActual: number = new Date().getFullYear();
  versionFrontend: string = 'v1.0.0';
}
