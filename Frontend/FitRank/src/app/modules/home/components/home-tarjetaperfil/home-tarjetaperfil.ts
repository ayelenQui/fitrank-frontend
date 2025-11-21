import { Component, input } from '@angular/core';
import { HomeTargetaperfilMinitarjetainfo } from '../../components/home-targetaperfil-minitarjetainfo/home-targetaperfil-minitarjetainfo';

@Component({
  selector: 'app-home-tarjetaperfil',
  imports: [HomeTargetaperfilMinitarjetainfo],
  templateUrl: './home-tarjetaperfil.html',
  styleUrls: ['./home-tarjetaperfil.css'],
  standalone: true
})
export class HomeTarjetaperfil {
  socio = input<any | null>();
}