
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-sidebar-profesor',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-profesor.component.html',
  styleUrls: ['./sidebar-profesor.component.css']
})
export class SidebarProfesorComponent {
  sidebarOpen = false;
  @Input() abierto: boolean = false;
  @Output() cerrarSidebar = new EventEmitter<void>();


  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    document.body.classList.toggle('sb-open', this.sidebarOpen);
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
    document.body.classList.remove('sb-open');
  }
}
