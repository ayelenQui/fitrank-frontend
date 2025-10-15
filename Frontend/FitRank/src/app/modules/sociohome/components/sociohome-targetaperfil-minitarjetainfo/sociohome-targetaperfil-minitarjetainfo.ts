import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sociohome-targetaperfil-minitarjetainfo',
  imports: [],
  templateUrl: './sociohome-targetaperfil-minitarjetainfo.html',
  styleUrl: './sociohome-targetaperfil-minitarjetainfo.css'
})
export class SociohomeTargetaperfilMinitarjetainfo {
  texto = input<string>();
  imagen = input<string>();
  titulo = input<string>();
}
