import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { CommonModule } from '@angular/common';
import { SignalRNotificacionesService } from '@app/api/services/notificacion/signalr-notificaciones.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private signalR: SignalRNotificacionesService) { }

  ngOnInit() {
    console.log("🟣 AdminLayoutComponent cargado → iniciando conexión SignalR...");
    this.signalR.iniciarConexion();
  }
}
