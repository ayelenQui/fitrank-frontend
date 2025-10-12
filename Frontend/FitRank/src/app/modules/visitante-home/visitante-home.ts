import { Component } from '@angular/core';
import { VisitanteHomeNavbar } from './components/visitante-home-navbar/visitante-home-navbar';
import { VisitanteHomeHero } from './components/visitante-home-hero/visitante-home-hero';
import { VisitanteHomeInfosection } from './components/visitante-home-infosection/visitante-home-infosection';
import { VisitanteHomeServiciossection } from './components/visitante-home-serviciossection/visitante-home-serviciossection';


@Component({
  selector: 'app-visitante-home',
  imports: [VisitanteHomeNavbar, VisitanteHomeHero, VisitanteHomeInfosection, VisitanteHomeServiciossection],
  templateUrl: './visitante-home.html',
  styleUrl: './visitante-home.css'
})
export class VisitanteHome {

}
