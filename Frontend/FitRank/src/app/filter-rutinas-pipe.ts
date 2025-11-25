import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterRutinas', standalone: true })
export class FilterRutinasPipe implements PipeTransform {

  transform(rutinas: any[], mostrarInactivas: boolean): any[] {
    return mostrarInactivas
      ? rutinas
      : rutinas.filter(r => r.activa);
  }
}
