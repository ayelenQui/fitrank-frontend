import { Component } from '@angular/core';

@Component({
  selector: 'app-visitante-home-navbar',
  imports: [],
  templateUrl: './visitante-home-navbar.html',
  styleUrl: './visitante-home-navbar.css'
})
export class VisitanteHomeNavbar {
  menuHidden: boolean = true;

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

}
