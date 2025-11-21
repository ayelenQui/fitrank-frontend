import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';

// 🔹 Importás ambos headers y sidebars
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { SidebarSocioComponent } from '@app/public/sidebar-socio/sidebar-socio.component';
import { HeaderProfesorComponent } from '@app/public/header-profesor/header-profesor-component';
import { SidebarProfesorComponent } from '@app/public/sidebar-profesor/sidebar-profesor.component';

import { Footer } from '@app/public/footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Footer,
    HeaderSocioComponent,
    SidebarSocioComponent,
    HeaderProfesorComponent,
    SidebarProfesorComponent
  ],
  templateUrl: './general-layout.component.html',
  styleUrls: ['./general-layout.component.css']
})
export class GeneralLayoutComponent implements OnInit {
  sidebarAbierto = false;
  rol: string = 'socio';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.authService.obtenerUser();
    this.rol = (user?.rol || user?.Rol || '').toLowerCase();
  }

  toggleSidebar() {
    this.sidebarAbierto = !this.sidebarAbierto;
  }

  cerrarSidebarEnMovil() {
    if (window.innerWidth < 992 && this.sidebarAbierto) {
      this.sidebarAbierto = false;
    }
  }
}
