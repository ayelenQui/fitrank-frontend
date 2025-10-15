import { Component, OnInit } from '@angular/core';
import { SociohomeTarjetaperfil } from './components/sociohome-tarjetaperfil/sociohome-tarjetaperfil';
import { SociohomeAccionrapidaseccion } from './components/sociohome-accionrapidaseccion/sociohome-accionrapidaseccion';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import type { SocioType } from './type/SocioType';

@Component({
  selector: 'app-sociohome',
  imports: [SociohomeTarjetaperfil, SociohomeAccionrapidaseccion],
  templateUrl: './sociohome.html',
  styleUrls: ['./sociohome.css']
})
export class Sociohome implements OnInit {
  socio: SocioType | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const userData = this.authService.obtenerUser();
    if (userData) {
      this.socio = {
        Id: userData.Id,
        Nombre: userData.Nombre,
        Apellidos: userData.Apellidos
      };
    }
    console.log('Socio recuperado:', this.socio);
  }
}