import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from '../app/modules/header/components/header.component';
import { FooterComponent } from '../app/modules/footer/components/footer.component';
import { HomeComponent } from './modules/home/components/home.component';
import { LoginComponent } from './modules/login/components/login.component';
import { AuthService } from './api/services/activacion/AuthService.service'; 
import { AdminInvitacionComponent } from './modules/admin-invitacion/components/admin-invitacion.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,FooterComponent, HomeComponent, LoginComponent, AdminInvitacionComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'], 
})

export class App {
  constructor(private authService: AuthService, private router: Router) {
    // Al iniciar o recargar la app → cerrar sesión
    this.authService.logout();

    // Redirigir al visitante
    this.router.navigate(['/visitante']);
  }
}
