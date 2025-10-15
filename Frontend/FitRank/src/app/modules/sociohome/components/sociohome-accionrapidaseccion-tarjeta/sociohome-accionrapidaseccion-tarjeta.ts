import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sociohome-accionrapidaseccion-tarjeta',
  imports: [RouterLink],
  templateUrl: './sociohome-accionrapidaseccion-tarjeta.html',
  styleUrl: './sociohome-accionrapidaseccion-tarjeta.css'
})
export class SociohomeAccionrapidaseccionTarjeta {
  imagenSrc = input<string>();
  titulo = input<string>();
  descripcion = input<string>();
  ruta = input<string>();
}
