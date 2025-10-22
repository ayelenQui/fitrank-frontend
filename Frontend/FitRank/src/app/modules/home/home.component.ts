import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeTarjetaperfil } from './components/home-tarjetaperfil/home-tarjetaperfil';
import { HomeAccionrapidaseccion } from './components/home-accionrapidaseccion/home-accionrapidaseccion';
import { AuthService } from '../../api/services/activacion/AuthService.service';
import { HeaderSocioComponent } from '../../public/header-socio/header-socio.component';
import { Avatar3DComponent } from '../../modules/avatar/avatar.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [HomeTarjetaperfil, HomeAccionrapidaseccion, Avatar3DComponent, HeaderSocioComponent],
    templateUrl: './home.html',
    styleUrls: ['./home.css'],
  standalone: true
})
export class HomeComponent implements OnInit {
    user: any = null;

    constructor(
        private authService: AuthService,
        private router: Router
  ) { }
  @ViewChild(Avatar3DComponent) avatar3D!: Avatar3DComponent;

  actualizarAvatar() {
    const medidas = { cintura: 90, altura: 165 }; // simuladas
    this.avatar3D.actualizarMedidas(medidas.cintura, medidas.altura);
  }

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
