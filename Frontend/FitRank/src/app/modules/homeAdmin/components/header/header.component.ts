import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  notifications = 3; 
  userName = 'Administrador';
  darkMode = false;

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
    
    alert('Sesión cerrada correctamente');
  }
}
