import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { SidebarSocioComponent } from '@app/public/sidebar-socio/sidebar-socio.component';

@Component({
  selector: 'app-socio-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderSocioComponent, SidebarSocioComponent],
  templateUrl: './socio-layout.component.html',
  styleUrls: ['./socio-layout.component.css']
})
export class SocioLayoutComponent {
  sidebarAbierto = false;

  toggleSidebar() {
    this.sidebarAbierto = !this.sidebarAbierto;
  }

  cerrarSidebarEnMovil() {
    if (window.innerWidth < 992 && this.sidebarAbierto) {
      this.sidebarAbierto = false;
    }
  }
}
