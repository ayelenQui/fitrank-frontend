import { Component } from '@angular/core';
import { SociohomeTarjetaperfil } from './components/sociohome-tarjetaperfil/sociohome-tarjetaperfil';
import { SociohomeAccionrapidaseccion } from './components/sociohome-accionrapidaseccion/sociohome-accionrapidaseccion';

@Component({
  selector: 'app-sociohome',
  imports: [SociohomeTarjetaperfil, SociohomeAccionrapidaseccion],
  templateUrl: './sociohome.html',
  styleUrls: ['./sociohome.css']
})
export class Sociohome {

}
