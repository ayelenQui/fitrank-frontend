import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoService } from '@app/api/services/ingreso/ingreso.service';
import { Ingreso } from '@app/api/services/ingreso/ingreso.interface';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  filtroIngresos: 'hoy' | 'mes' | 'total' = 'total';

  ingresos: Ingreso[] = [];
  ingresoHoy = 0;
  ingresoMes = 0;
  ingresoTotal = 0;

  ingresoEfectivo = 0;
  ingresoMpago = 0;

  cuotaActual = 0;

  mesActual: number = new Date().getMonth();
  anioActual: number = new Date().getFullYear();
  mesActualNombre: string = '';

  // ⭐ Nuevo → KPI seleccionado
  kpiSeleccionado: string = 'hoy';

  constructor(
    private ingresoService: IngresoService
  ) { }

  ngOnInit(): void {
    this.mesActualNombre = this.obtenerNombreMes(this.mesActual);
    this.cargarIngresos();
  }

  // ⭐ Nuevo → lo llamamos desde los botones
  seleccionarKPI(kpi: string): void {
    this.kpiSeleccionado = kpi;
  }

  cargarIngresos() {
    this.ingresoService.obtenerPorGimnasio().subscribe({
      next: (ingresos) => {
        this.ingresos = ingresos;

        const hoyStr = new Date().toISOString().split("T")[0];
        const hoy = new Date();

        this.ingresoTotal = ingresos.reduce((sum, x) => sum + x.monto, 0);

        this.ingresoHoy = ingresos
          .filter(x => x.fecha.split("T")[0] === hoyStr)
          .reduce((sum, x) => sum + x.monto, 0);

        this.ingresoMes = ingresos
          .filter(x => {
            const f = new Date(x.fecha);
            return (
              f.getMonth() === hoy.getMonth() &&
              f.getFullYear() === hoy.getFullYear()
            );
          })
          .reduce((sum, x) => sum + x.monto, 0);

        this.ingresoEfectivo = ingresos
          .filter(x => x.metodoPago.toLowerCase() === "efectivo")
          .reduce((sum, x) => sum + x.monto, 0);

        this.ingresoMpago = ingresos
          .filter(x =>
            x.metodoPago.toLowerCase() === "mercado pago" ||
            x.metodoPago.toLowerCase() === "mp" ||
 x.metodoPago.toLowerCase() === "mercadoPago"
          )
          .reduce((sum, x) => sum + x.monto, 0);

        const ingresosConMonto = ingresos
          .filter(x => x.monto > 0)
          .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

        this.cuotaActual = ingresosConMonto.length > 0 ? ingresosConMonto[0].monto : 0;
      }

    });
  }

  obtenerNombreMes(mesIndex: number): string {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[mesIndex];
  }
}
