import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-accionrapidaseccion-tarjeta',
  imports: [RouterLink],
  templateUrl: './home-accionrapidaseccion-tarjeta.html',
  styleUrl: './home-accionrapidaseccion-tarjeta.css',
  standalone: true
})
export class HomeAccionrapidaseccionTarjeta {
  imagenSrc = input<string>();
  titulo = input<string>();
  descripcion = input<string>();
  ruta = input<string>();
}