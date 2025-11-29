import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../app/modules/header/components/header.component';
import { FooterComponent } from '../app/modules/footer/components/footer.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/components/login.component';
import { VisitanteHome } from './modules/visitante-home/visitante-home'; 
import { AuthService } from './api/services/activacion/AuthService.service'; 
import { AdminInvitacionComponent } from './modules/admin-invitacion/components/admin-invitacion.component'; 
import { HeaderSocioComponent } from './public/header-socio/header-socio.component';

import gsap from 'gsap';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    VisitanteHome,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    AdminInvitacionComponent,
    
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements AfterViewInit {
 
  ngOnInit() {
   
  }

  ngAfterViewInit(): void {

    const preloader = document.getElementById('preloader');
    const logo = document.querySelector('.logo-3d');
    const counter = document.getElementById('counter');
    const phrase = document.getElementById('phrase');

    if (!preloader || !logo || !counter || !phrase) return;

    

    const progress = { value: 0 };

  }
}

