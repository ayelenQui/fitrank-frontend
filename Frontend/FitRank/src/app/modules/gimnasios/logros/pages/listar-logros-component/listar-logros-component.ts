import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GimnasioService } from '../../../../../api/services/gimnasio/gimnasio.service';
import { HeaderComponent } from '@app/modules/header/components/header.component';

type Order = 'nombre' | 'puntos';

@Component({
  selector: 'app-logros-gim',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './listar-logros-component.html',
  styleUrls: ['./listar-logros-component.css'],
})
export class ListarLogrosComponent {
  private route = inject(ActivatedRoute);
  private data = inject(GimnasioService);

  gimnasioId = Number(this.route.snapshot.paramMap.get('gimnasioId'));

  loading = signal(true);
  error = signal<string | null>(null);
  soloActivos = signal(true);
  orden = signal<Order>('nombre');
  filtro = signal('');

  // VM
  logros = signal<Array<{id:number; nombre:string; descripcion:string; puntos:number; activo:boolean;}>>([]);

  logrosFiltrados = computed(() => {
    const term = this.filtro().toLowerCase().trim();
    let arr = [...this.logros()];
    if (this.soloActivos()) arr = arr.filter(x => x.activo);
    if (term) arr = arr.filter(x => x.nombre.toLowerCase().includes(term) || x.descripcion.toLowerCase().includes(term));
    if (this.orden() === 'puntos') arr.sort((a,b)=> b.puntos - a.puntos);
    else arr.sort((a,b)=> a.nombre.localeCompare(b.nombre));
    return arr;
  });

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.loading.set(true);
    const src = this.soloActivos()
      ? this.data.listarLogrosActivos(this.gimnasioId)
      : this.data.listarLogrosGimnasio(this.gimnasioId);

    src.subscribe({
      next: r => { this.logros.set(r); this.loading.set(false); },
      error: e => { console.error(e); this.error.set('No se pudieron cargar los logros.'); this.loading.set(false); }
    });
  }

  toggleActivos() { this.soloActivos.set(!this.soloActivos()); this.cargar(); }
  setOrden(v: string) { this.orden.set((v as Order)); }
  setFiltro(v: string) { this.filtro.set(v); }

  trackById = (_: number, it: {id:number}) => it.id;
}
