import { Component, input } from '@angular/core';
import { SociohomeTargetaperfilMinitarjetainfo } from '../sociohome-targetaperfil-minitarjetainfo/sociohome-targetaperfil-minitarjetainfo';
import type { SocioType } from '../../type/SocioType';

@Component({
  selector: 'app-sociohome-tarjetaperfil',
  imports: [SociohomeTargetaperfilMinitarjetainfo],
  templateUrl: './sociohome-tarjetaperfil.html',
  styleUrls: ['./sociohome-tarjetaperfil.css']
})
export class SociohomeTarjetaperfil {
  socio = input<SocioType | null>();
}
