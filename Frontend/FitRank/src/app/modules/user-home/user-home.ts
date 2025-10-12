import { Component } from '@angular/core';
import { UserHomeNavbar } from './components/user-home-navbar/user-home-navbar';
import { UserHomeHero } from './components/user-home-hero/user-home-hero';

@Component({
  selector: 'app-user-home',
  imports: [UserHomeNavbar, UserHomeHero],
  templateUrl: './user-home.html',
  styleUrl: './user-home.css'
})
export class UserHome {

}
