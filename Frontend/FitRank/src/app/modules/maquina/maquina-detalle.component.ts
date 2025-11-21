import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MaquinaService } from '@app/api/services/maquina/maquina.service';

@Component({
  selector: 'app-maquina-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maquina-detalle.component.html',
  styleUrls: ['./maquina-detalle.component.css']
})
export class MaquinaDetalleComponent implements OnInit {

  maquinaId!: number;
  maquina: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private maquinaService: MaquinaService,
    public sanitizer: DomSanitizer   // 👈 AGREGADO
  ) { }

  ngOnInit(): void {
    this.maquinaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDetalles();
  }

  cargarDetalles() {
    this.maquinaService.obtenerDetalles(this.maquinaId)
      .subscribe({
        next: (res) => {
          this.maquina = res;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  // ⭐ CONVIERTE LINKS NORMALES O SHORTS A /embed/
  convertirAEmbed(url: string): string {
    if (!url) return '';

    // Shorts
    if (url.includes('shorts')) {
      const id = url.split('/shorts/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    // watch?v=
    if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    // youtu.be
    if (url.includes('youtu.be')) {
      const id = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  }

  // ⭐ PARA VIDEOS DE EJERCICIOS
  embedVideo(url: string): string {
    if (!url) return '';

    if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes('youtu.be')) {
      const id = url.split('.be/')[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  }
}
