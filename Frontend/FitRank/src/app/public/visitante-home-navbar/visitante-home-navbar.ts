import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-visitante-home-navbar',
  imports: [RouterLink],
  templateUrl: './visitante-home-navbar.html',
  styleUrl: './visitante-home-navbar.css'
})
export class VisitanteHomeNavbar {
  menuHidden: boolean = true;

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

}
