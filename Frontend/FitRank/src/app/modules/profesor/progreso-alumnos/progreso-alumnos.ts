import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { EntrenamientoService } from '@app/api/services/entrenamiento/entrenamiento.service';
import { EntrenamientoHistorialDTO, ProgresoEjercicioDTO } from '@app/api/services/entrenamiento/interface/entrenamientoHistorial.interface';
import { GraficoProgreso } from '@app/modules/entrenamiento/historial-entrenamientos/grafico-progreso/grafico-progreso';

interface ActividadAgrupada {
  nombre: string;
  progresoHistorico: ProgresoEjercicioDTO[];
  actividades: any[];
}

@Component({
  selector: 'app-progreso-alumnos',
  imports: [CommonModule, DatePipe, GraficoProgreso, FormsModule],
  templateUrl: './progreso-alumnos.html',
  styleUrl: './progreso-alumnos.css'
})

export class ProgresoAlumnos implements OnInit {
  historial: (EntrenamientoHistorialDTO & { ejerciciosAgrupados?: ActividadAgrupada[] })[] = [];
  cargando = true;
  profesorId!: number;
  nombreFiltro: string = '';
  expandedIndex: number | null = null;
  graficosMostrados = new Set<string>();
  alumnos: any[] = [];
  alumnosFiltrados: any[] = [];

  
  constructor(
    private entrenamientoService: EntrenamientoService,
    private authService: AuthService
  ) {}

   ngOnInit(): void {
    const user = this.authService.obtenerUser();
    console.log("👤 Usuario obtenido:", user);

    this.profesorId = user?.id ?? user?.Id;
    console.log("📌 profesorId asignado:", this.profesorId);

    this.buscarHistorial();
  }

    buscarHistorial() {
    this.cargando = true;

    this.entrenamientoService
      .getHistorialAlumnosDelProfesor(this.profesorId, this.nombreFiltro)
      .subscribe({
        next: (data) => {

          console.log("📦 Historial recibido del backend:", data);

          this.historial = data.map(sesion => ({
            ...sesion,
            ejerciciosAgrupados: this.agruparActividades(sesion.actividades)
          }));

          console.log("📊 Historial final procesado:", this.historial);
          this.cargando = false;
        },
        error: (err) => {
          console.error("Error:", err);
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
  
  filtrar() {
  const filtro = this.nombreFiltro.trim().toLowerCase();
  this.alumnosFiltrados = this.alumnos.filter(a =>
    a.nombreCompleto.toLowerCase().includes(filtro)
  );
}

  mostrarGrafico(nombreEjercicio: string): boolean {
    return this.graficosMostrados.has(nombreEjercicio);
  }

  // ⬇️ MISMO agruparActividades QUE TENÍAS ANTES
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
  
        // evitar duplicados exactos
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
