import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ProgresoEjercicioDTO } from '@app/api/services/entrenamiento/interface/entrenamientoHistorial.interface';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-progreso',
  imports: [],
  templateUrl: './grafico-progreso.html',
  styleUrl: './grafico-progreso.css'
})
export class GraficoProgreso implements AfterViewInit{
  @Input() progreso: ProgresoEjercicioDTO[] = [];
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit(): void {
    if (!this.progreso?.length) return;

    const labels = this.progreso.map(p => new Date(p.fecha).toLocaleDateString());
    const data = this.progreso.map(p => p.peso ?? 0);

   this.chart = new Chart(this.canvasRef.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Peso levantado (kg)',
          data,
          borderColor: '#7b3fe4',
          backgroundColor: 'rgba(123, 63, 228, 0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            labels: {
              color: '#fff'
            }
          },
          tooltip: {
            bodyColor: '#fff',
            titleColor: '#fff',
            footerColor: '#fff'
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#fff',
              font: { size: 14 }
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff',
              font: { size: 14 }
            },
          }
        }
      }
    });
  }
}