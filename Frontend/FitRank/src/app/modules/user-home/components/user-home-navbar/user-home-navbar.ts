import { Component } from '@angular/core';

@Component({
  selector: 'app-user-home-navbar',
  imports: [],
  templateUrl: './user-home-navbar.html',
  styleUrl: './user-home-navbar.css'
})
export class UserHomeNavbar {
  menuHidden: boolean = true;

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

}
