import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../api/services/activacion/AuthService.service';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@Component({
  selector: 'app-homeAdmin',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet],
  templateUrl: './homeAdmin.component.html',
})
export class HomeAdminComponent {
  user: any;


  constructor(private router: Router, private authService: AuthService) {
    this.user = this.authService.obtenerUser();
  }

  irA(ruta: string) {
    this.router.navigate([ruta]);
  }

  irAGenerarInvitacion() {
    this.router.navigate(['/admin-invitacion']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
