import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LogroService } from '../../../../../api/services/logro/logro.service';
import { LogroUsuarioDto } from '../../../../../api/services/socio/interfaces/socio-logro.rest';

type Order = 'recientes' | 'antiguos' | 'puntos';

@Component({
  selector: 'app-mis-logros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-logros-component.html',
  styleUrls: ['./mis-logros-component.css'],
})
export class MisLogrosComponent {
  private route = inject(ActivatedRoute);
  private data = inject(LogroService);

  socioId = Number(this.route.snapshot.paramMap.get('socioId'));
  gimnasioId = Number(this.route.snapshot.paramMap.get('gimnasioId'));

  loading = signal(true);
  error = signal<string | null>(null);
  logros = signal<LogroUsuarioDto[]>([]);
  orden = signal<Order>('recientes');
  filtroTexto = signal<string>('');

  // Derivados
  logrosFiltrados = computed(() => {
    const term = this.filtroTexto().toLowerCase().trim();
    let arr = [...this.logros()];

    if (term) {
      arr = arr.filter(l =>
        l.nombre.toLowerCase().includes(term)
      );
    }

    switch (this.orden()) {
      case 'antiguos':
        arr.sort((a, b) => new Date(a.fechaOtorgado).getTime() - new Date(b.fechaOtorgado).getTime());
        break;
      case 'puntos':
        arr.sort((a, b) => b.puntosOtorgados - a.puntosOtorgados);
        break;
      default: // 'recientes'
        arr.sort((a, b) => new Date(b.fechaOtorgado).getTime() - new Date(a.fechaOtorgado).getTime());
    }

    return arr;
  });

  ngOnInit() {
    this.data.misLogros(this.socioId, this.gimnasioId).subscribe({
      next: r => { this.logros.set(r); this.loading.set(false); },
      error: e => { console.error(e); this.error.set('No se pudo cargar tus logros.'); this.loading.set(false); }
    });
  }

  
  setOrden(value: string) {
    // normalizamos el string a nuestro tipo
    const v = (value as Order);
    this.orden.set(v);
  }

    onBuscar(value: string) {
    this.filtroTexto.set(value);
  }

    trackBylogroId = (_: number, item: LogroUsuarioDto) => item.logroId;
}
