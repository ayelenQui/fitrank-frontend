import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LogroService } from '../../../../../api/services/logro/logro.service';
import { LogroUsuarioDto } from '../../../../../api/services/socio/interfaces/socio-logro.rest';
import { HeaderComponent } from '@app/modules/header/components/header.component';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';

type Order = 'recientes' | 'antiguos' | 'puntos';

@Component({
  selector: 'app-mis-logros',
  standalone: true,
  imports: [CommonModule, HeaderSocioComponent],
  templateUrl: './mis-logros-component.html',
  styleUrls: ['./mis-logros-component.css'],
})
export class MisLogrosComponent {
  user: any = null;

    constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

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
    this.user = this.authService.obtenerUser();

    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.authService.isAdmin()) {
      this.router.navigate(['/homeAdmin']);
      return;
    }

    this.data.misLogros(this.user.socioId, this.user.gimnasioId).subscribe({
      next: r => { this.logros.set(r); this.loading.set(false); },
      //error: e => { console.error(e); this.error.set('No se pudo cargar tus logros.'); this.loading.set(false); }
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
