import { Component, OnInit } from '@angular/core';
import { SociohomeTarjetaperfil } from './components/sociohome-tarjetaperfil/sociohome-tarjetaperfil';
import { SociohomeAccionrapidaseccion } from './components/sociohome-accionrapidaseccion/sociohome-accionrapidaseccion';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sociohome',
  imports: [SociohomeTarjetaperfil, SociohomeAccionrapidaseccion],
  templateUrl: './sociohome.html',
  styleUrls: ['./sociohome.css'],
  standalone: true
})
export class Sociohome implements OnInit {
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