import { Component, OnInit } from '@angular/core';
import { HomeTarjetaperfil } from './components/home-tarjetaperfil/home-tarjetaperfil';
import { HomeAccionrapidaseccion } from './components/home-accionrapidaseccion/home-accionrapidaseccion';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [HomeTarjetaperfil, HomeAccionrapidaseccion],
    templateUrl: './home.html',
    styleUrls: ['./home.css'],
    standalone: true
})
export class Home implements OnInit {
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