import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/services/activacion/AuthService.service';

@Component({
  selector: 'app-header-socio',
  templateUrl: './header-socio.component.html',
  styleUrls: ['./header-socio.component.css'],
  standalone: true,
})
export class HeaderSocioComponent implements OnInit {
  @Input() user: any = null;
  sidebarOpen = false;


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.user) {
      this.user = this.authService.obtenerUser();
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    const sidebar = document.querySelector('.fit-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (this.sidebarOpen) {
      sidebar?.classList.add('open');
      overlay?.classList.add('visible');
    } else {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('visible');
    }
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
    const sidebar = document.querySelector('.fit-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    sidebar?.classList.remove('open');
    overlay?.classList.remove('visible');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navegarA(ruta: string) {
    this.router.navigate([ruta]).catch((err) => console.error(err));
  }

  irAlHome(): void {
    this.router.navigate(['/home/home-socio']).catch((err) => console.error(err));
  }
}
