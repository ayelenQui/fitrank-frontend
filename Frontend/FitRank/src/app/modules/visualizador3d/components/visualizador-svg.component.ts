import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-visualizador-svg',
  standalone: true,
  templateUrl: './visualizador-svg.component.html',
  styleUrls: ['./visualizador-svg.component.css']

})
export class VisualizadorSvgComponent implements OnChanges {

  @Input() gruposMusculares: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gruposMusculares']) {
      this.actualizarColores();
    }
  }

  private actualizarColores(): void {
    // limpiar todos los músculos
    document.querySelectorAll('.muscle').forEach(el => el.classList.remove('highlight'));

    // marcar los seleccionados
    this.gruposMusculares.forEach(nombre => {
      const id = this.mapearMusculo(nombre);
      if (id) {
        const el = document.getElementById(id);
        if (el) el.classList.add('highlight');
      }
    });
  }

  // Mapa flexible: lo adaptás según tus nombres del backend
  private mapearMusculo(nombre: string): string {
    const n = nombre.toLowerCase();
    if (n.includes('bicep')) return 'biceps';
    if (n.includes('pectoral') || n.includes('pecho')) return 'chest';
    if (n.includes('espalda')) return 'back';
    if (n.includes('tricep')) return 'triceps';
    if (n.includes('cuadricep') || n.includes('pierna')) return 'legs';
    if (n.includes('gluteo')) return 'glutes';
    if (n.includes('abdomen')) return 'abs';
    return '';
  }
}
