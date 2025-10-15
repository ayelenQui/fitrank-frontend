// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/services/activacion/AuthService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule],
  standalone: true,
})
export class HomeComponent implements OnInit {
  user: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.authService.obtenerUser();
    if (!this.user) {
      // Si no hay user (JWT inválido), redirige a login
      this.router.navigate(['/login']);
    }

    // Si el usuario es admin, redirige a homeAdmin
    if (this.authService.isAdmin()) {
      this.router.navigate(['/homeAdmin']);
    }
  }
  

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
