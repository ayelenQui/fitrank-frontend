import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/api/services/activacion/AuthService.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    setInterval(() => this.fechaActual = new Date(), 60000);
  }

  notifications = 3; 
  userName = 'Administrador';
  darkMode = false;
  fechaActual = new Date();
  gimnasioNombre = "Nitro Gym";
  toggleTheme(): void {
    this.darkMode = !this.darkMode;


    
    const body = document.body;
    if (this.darkMode) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }

  openNotifications(): void {
    alert('Aquí se abriría el panel de notificaciones o un modal 💬');
  }



  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}

