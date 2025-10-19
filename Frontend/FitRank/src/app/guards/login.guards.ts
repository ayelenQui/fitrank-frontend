import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../api/services/activacion/AuthService.service';
@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const user = this.authService.obtenerUser();
      if (!user) {
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      }

      if (this.authService.isAdmin()) {  
        this.router.navigate(['/homeAdmin']);
      } else {
        this.router.navigate(['/home']);
      }
      return false;
    }
    return true;
  }
}
