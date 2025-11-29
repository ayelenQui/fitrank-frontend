import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../api/services/activacion/AuthService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-exitoso',
  templateUrl: './pago-exitoso.component.html',
  styleUrls: ['./pago-exitoso.component.css'],
})
export class PagoExitosoComponent implements OnInit {

  esAdmin: boolean = false;
  redirigiendo: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.authService.obtenerUser();

    if (user) {
      this.redirigiendo = true; // Mostrar mensaje en pantalla

      const rol = user.rol?.toLowerCase();

      setTimeout(() => {
        if (rol === 'admin') {
          this.router.navigate(['/homeAdmin']);
          return;
        }

        if (rol === 'profesor') {
          this.router.navigate(['/homeProfesor']);
          return;
        }

        if (rol === 'socio') {
          this.router.navigate(['/homeSocio']);
          return;
        }
      }, 2000); // 2 segundos
    }
  }

}
