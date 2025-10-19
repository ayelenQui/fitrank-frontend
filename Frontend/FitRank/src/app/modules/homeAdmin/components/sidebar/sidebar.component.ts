import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  items = [
    { icon: 'dashboard', label: 'Dashboard', route: 'resumen' },
    { icon: 'group', label: 'Socios', route: 'socios' },
    { icon: 'sports_gymnastics', label: 'Profesores', route: 'profesores' },
    { icon: 'calendar_month', label: 'Clases', route: 'clases' },
    { icon: 'emoji_events', label: 'Ranking', route: 'ranking' },
    { icon: 'qr_code_2', label: 'Accesos QR', route: 'accesos' },
    { icon: 'notifications', label: 'Notificaciones', route: 'notificaciones' },
    { icon: 'trending_down', label: 'Abandono', route: 'abandono' },
    { icon: 'monitoring', label: 'Tiempo Real', route: 'realtime' },
  ];
}
