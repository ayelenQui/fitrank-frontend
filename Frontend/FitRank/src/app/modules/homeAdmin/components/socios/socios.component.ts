import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocioService, Socio } from '../../../../api/services/socio/socio.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, map, startWith, combineLatest } from 'rxjs';
import { AsistenciaDetalleUsuarioDTO, SocioDTO } from '../../../../api/services/asistencia/interface/asistencia.interface';
import { AsistenciaService } from '../../../../api/services/asistencia/asistencia.service';
import { SocioApiService } from '../../../../api/services/socio/socioApiService'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-socios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent implements OnInit {
  socios: SocioDTO[] = [];
  searchTerm: string = '';

  sociosFiltrados: SocioDTO[] = [];
  socioSeleccionado: SocioDTO | null = null;

  socio: SocioDTO | null = null;
  asistencias: AsistenciaDetalleUsuarioDTO[] = [];

  filtroActivo: string = 'todos';


  cantidadFemeninos: number = 0;
  cantidadMasculinos: number = 0;

  constructor(
    private socioService: SocioApiService,
    private router: Router,
    private asistenciaService: AsistenciaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.socioService.getTodosLosSocios().subscribe(data => {
      this.socios = data;
      this.sociosFiltrados = data;
        this.route.queryParams.subscribe(params => {
        const socioId = Number(params['socioId']);
        if (socioId) {
          this.verDetalle(socioId);

          setTimeout(() => {
            const el = document.getElementById('socio-' + socioId);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        }
      });
    });
  }
    

  

  cargarSocios() {
    this.socioService.getTodosLosSocios().subscribe({
      next: (data) => this.socios = data,
      error: (err) => console.error("Error cargando socios", err)
    });
  }
  onSearchChange() {
    const term = this.searchTerm.toLowerCase();

    this.sociosFiltrados = this.socios.filter(s =>
      `${s.nombre} ${s.apellido}`.toLowerCase().includes(term)
    );
  }


  verDetalle(id: number) {
    this.socioSeleccionado = this.socios.find(s => s.id === id) || null;
  }

  filtrarProximosVencimientos() {
    const hoy = new Date();
    const limite = new Date();
    limite.setDate(hoy.getDate() + 7);

    this.sociosFiltrados = this.socios.filter(s => {
      if (!s.cuotaPagadaHasta) return false;

      const fechaCuota = new Date(s.cuotaPagadaHasta);

      return fechaCuota >= hoy && fechaCuota <= limite;
    });
  }

  limpiarFiltros() {
    this.sociosFiltrados = [...this.socios];
  }

  filtrarVencidos() {
    const hoy = new Date();

    this.sociosFiltrados = this.socios.filter(s => {
      if (!s.cuotaPagadaHasta) return false;

      const fechaCuota = new Date(s.cuotaPagadaHasta);
      return fechaCuota < hoy;
    });
  }
  isCuotaAlDia(s: SocioDTO) {
    return new Date(s.cuotaPagadaHasta!) > new Date();
  }

  isCuotaProximaVencer(s: SocioDTO) {
    const hoy = new Date();
    const limite = new Date();
    limite.setDate(hoy.getDate() + 7);

    const fecha = new Date(s.cuotaPagadaHasta!);
    return fecha >= hoy && fecha <= limite;
  }

  isCuotaVencida(s: SocioDTO) {
    return new Date(s.cuotaPagadaHasta!) < new Date();
  }

  getEstadoCuota(s: SocioDTO) {
    if (this.isCuotaVencida(s)) return "Vencida";
    if (this.isCuotaProximaVencer(s)) return "Por vencer";
    return "Al día";
  }
  calcularGenero() {
    this.cantidadFemeninos = this.socios.filter(s => s.sexo?.toLowerCase() === 'f').length;
    this.cantidadMasculinos = this.socios.filter(s => s.sexo?.toLowerCase() === 'm').length;
  }
  cerrarDrawer() {
    this.socioSeleccionado = null;
  }

  generarInvitacion() {
    this.router.navigate(['/admin-invitacion']);
  } 


}
