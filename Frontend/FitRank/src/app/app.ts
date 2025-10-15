import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from '../app/modules/header/components/header.component';
import { FooterComponent } from '../app/modules/footer/components/footer.component';
import { Home } from './modules/home/home';
import { LoginComponent } from './modules/login/components/login.component';
import { VisitanteHome } from './modules/visitante-home/visitante-home'; 
import { AuthService } from './api/services/activacion/AuthService.service'; 
import { AdminInvitacionComponent } from './modules/admin-invitacion/components/admin-invitacion.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VisitanteHome, RouterOutlet, HeaderComponent, FooterComponent, Home, LoginComponent, AdminInvitacionComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'], 
})

export class App {
  
  constructor(private authService: AuthService, private router: Router) {
   
  }
    
}
