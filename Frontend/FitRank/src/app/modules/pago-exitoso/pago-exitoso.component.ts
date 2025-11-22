import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../api/services/activacion/AuthService.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pago-exitoso',
  templateUrl: './pago-exitoso.component.html',
  styleUrls: ['./pago-exitoso.component.css'],
})
export class PagoExitosoComponent implements OnInit {

  esAdmin: boolean = false;

  constructor(
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const user = this.authService.obtenerUser();
    this.esAdmin = user?.Rol === 'Admin';
  }

  volver() {
    this.location.back();  
  }
}
