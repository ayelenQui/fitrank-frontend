import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { EntrenamientoService } from '@app/api/services/entrenamiento/entrenamiento.service';
import { EntrenamientoHistorialDTO, ProgresoEjercicioDTO } from '@app/api/services/entrenamiento/interface/entrenamientoHistorial.interface';
import { HeaderSocioComponent } from '@app/public/header-socio/header-socio.component';
import { GraficoProgreso } from './grafico-progreso/grafico-progreso';

interface ActividadAgrupada {
  nombre: string;
  progresoHistorico: ProgresoEjercicioDTO[];
  actividades: any[];
  urlImagen?: string;
}

@Component({
  selector: 'app-historial-entrenamientos',
  imports: [CommonModule, DatePipe, HeaderSocioComponent, GraficoProgreso],
  templateUrl: './historial-entrenamientos.html',
  styleUrls: ['./historial-entrenamientos.css']
})
export class HistorialEntrenamientos implements OnInit {
  historial: (EntrenamientoHistorialDTO & { ejerciciosAgrupados?: ActividadAgrupada[] })[] = [];
  cargando = true;
  socioId!: number;
  expandedIndex: number | null = null;
  graficosMostrados = new Set<string>();

  constructor(
    private entrenamientoService: EntrenamientoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.obtenerUser();
    this.socioId = user?.id ?? user?.Id;

    this.entrenamientoService.getHistorialDeSocio(this.socioId).subscribe({
      next: (data) => {
        this.historial = data.map(sesion => ({
          ...sesion,
          ejerciciosAgrupados: this.agruparActividades(sesion.actividades)
        }));
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error obteniendo historial:', err);
        this.cargando = false;
      }
    });
  }

  toggleExpand(i: number) {
    this.expandedIndex = this.expandedIndex === i ? null : i;
  }

  toggleGrafico(nombreEjercicio: string) {
    if (this.graficosMostrados.has(nombreEjercicio)) {
      this.graficosMostrados.delete(nombreEjercicio);
    } else {
      this.graficosMostrados.add(nombreEjercicio);
    }
  }

  mostrarGrafico(nombreEjercicio: string): boolean {
    return this.graficosMostrados.has(nombreEjercicio);
  }

private agruparActividades(actividades: any[]): ActividadAgrupada[] {
  const map = new Map<
    string,
    { 
      progresoHistorico: (ProgresoEjercicioDTO & { timestamp: number })[], 
      actividades: any[],
      counters: Record<string, number>
    }
  >();

  actividades.forEach(act => {

    if (!map.has(act.nombreEjercicio)) {
      map.set(act.nombreEjercicio, { 
        progresoHistorico: [], 
        actividades: [],
        counters: {}
      });
    }

    const entry = map.get(act.nombreEjercicio)!;
    entry.actividades.push(act);

    (act.progresoHistorico || []).forEach((p: ProgresoEjercicioDTO) => {

      const base = new Date(p.fecha).getTime();
      const dayKey = new Date(base).toISOString().split('T')[0];

      entry.counters[dayKey] = (entry.counters[dayKey] || 0) + 1;
      const offsetMs = (entry.counters[dayKey] - 1) * 1000;

      const punto = {
        ...p,
        timestamp: base + offsetMs
      };

      const exists = entry.progresoHistorico.some(x =>
        x.fecha === p.fecha &&
        x.peso === p.peso &&
        x.repeticiones === p.repeticiones
      );

      if (!exists) {
        entry.progresoHistorico.push(punto);
      }
    });

  });

  return Array.from(map.entries()).map(([nombre, { progresoHistorico, actividades }]) => ({
    nombre,
    progresoHistorico: progresoHistorico.sort(
      (a: any, b: any) => a.timestamp - b.timestamp
    ),
    actividades
  }));
}






}
