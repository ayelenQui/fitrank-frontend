import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { CommonModule } from '@angular/common';
import { SignalRNotificacionesService } from '@app/api/services/notificacion/signalr-notificaciones.service';
import { AuthService } from '@app/api/services/activacion/AuthService.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  loadingTabs = false;
  isDarkMode = false; 

  constructor(
    private signalR: SignalRNotificacionesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signalR.iniciarConexion();

  
    const saved = localStorage.getItem('fitrank_dark');
    if (saved === '1') {
      this.isDarkMode = true;
      document.body.classList.add('dark');
    }

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loadingTabs = true;
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.loadingTabs = false;
        }, 1200);
      }
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
  }

