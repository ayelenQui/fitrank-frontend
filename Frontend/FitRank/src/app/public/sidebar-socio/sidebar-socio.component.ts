import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-socio',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-socio.component.html',
  styleUrls: ['./sidebar-socio.component.css']
})
export class SidebarSocioComponent {
  sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    document.body.classList.toggle('sb-open', this.sidebarOpen);
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
    document.body.classList.remove('sb-open');
  }
}
