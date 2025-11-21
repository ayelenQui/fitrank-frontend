import { Component, input } from '@angular/core';

@Component({
  selector: 'app-home-targetaperfil-minitarjetainfo',
  imports: [],
  templateUrl: './home-targetaperfil-minitarjetainfo.html',
  styleUrl: './home-targetaperfil-minitarjetainfo.css',
  standalone: true
})
export class HomeTargetaperfilMinitarjetainfo {
  texto = input<string>();
  imagen = input<string>();
  titulo = input<string>();
}