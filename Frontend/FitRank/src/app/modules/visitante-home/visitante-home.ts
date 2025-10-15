import { Component } from '@angular/core';
import { VisitanteHomeNavbar } from './components/visitante-home-navbar/visitante-home-navbar';
import { VisitanteHomeHero } from './components/visitante-home-hero/visitante-home-hero';
import { VisitanteHomeInfosection } from './components/visitante-home-infosection/visitante-home-infosection';
import { VisitanteHomeServiciossection } from './components/visitante-home-serviciossection/visitante-home-serviciossection';
import { VisitanteHomeCtasection } from './components/visitante-home-ctasection/visitante-home-ctasection';
import { VisitanteHomeFooter } from './components/visitante-home-footer/visitante-home-footer';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../api/services/activacion/AuthService.service';

@Component({
  selector: 'app-visitante-home',
  imports: [CommonModule, VisitanteHomeNavbar, VisitanteHomeHero, VisitanteHomeInfosection, VisitanteHomeServiciossection, VisitanteHomeCtasection, VisitanteHomeFooter],
  templateUrl: './visitante-home.html',
  styleUrl: './visitante-home.css',
  standalone: true
})

  



export class VisitanteHome {
  constructor(private router: Router, private authService: AuthService) { }

  irLogin() {
    this.router.navigate(['/login']);
  }
}
