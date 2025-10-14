import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../api/services/activacion/AuthService.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const user = this.authService.obtenerUser();
      if (user?.role === 'admin') {
        this.router.navigate(['/home-admin']);
      } else {
        this.router.navigate(['/home']);
      }
      return false;
    }
    return true;
  }
}


