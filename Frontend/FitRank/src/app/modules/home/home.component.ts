import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeTarjetaperfil } from './components/home-tarjetaperfil/home-tarjetaperfil';
import { HomeAccionrapidaseccion } from './components/home-accionrapidaseccion/home-accionrapidaseccion';
import { AuthService } from '../../api/services/activacion/AuthService.service';
import { HeaderSocioComponent } from '../../public/header-socio/header-socio.component';

import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [HomeTarjetaperfil, HomeAccionrapidaseccion, HeaderSocioComponent],
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
 


    ngOnInit() {
        this.user = this.authService.obtenerUser();
        if (!this.user) {
            this.router.navigate(['/login']);
        }

        if (this.authService.isAdmin()) {
            this.router.navigate(['/homeAdmin']);
      }


    }


    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
