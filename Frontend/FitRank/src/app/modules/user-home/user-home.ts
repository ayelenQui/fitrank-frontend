import { Component } from '@angular/core';
import { UserHomeNavbar } from './components/user-home-navbar/user-home-navbar';
import { UserHomeHero } from './components/user-home-hero/user-home-hero';
import { UserHomeInfosection } from './components/user-home-infosection/user-home-infosection';

@Component({
  selector: 'app-user-home',
  imports: [UserHomeNavbar, UserHomeHero, UserHomeInfosection],
  templateUrl: './user-home.html',
  styleUrl: './user-home.css'
})
export class UserHome {

}
