import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogroService } from '../../../../api/services/logro/logro.service';
import { LogroRest } from '../../../../api/services/logro/interfaces/logro.rest';

@Component({
  selector: 'app-logros-listar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logros-listar-component.html',
  styleUrls: ['./logros-listar-component.css'],
})
export class LogrosListarComponent implements OnInit {
  private logroServicio = inject(LogroService);

  logros: LogroRest[] = [];
  loading = false;
  errorMsg: string | null = null;

  ngOnInit(): void {
    this.listarLogros();
  }

  listarLogros(): void {
    this.loading = true;
    this.errorMsg = null;

    this.logroServicio.listar().subscribe({
      next: (data) => {
        this.logros = data;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = err?.error?.message ?? 'No se pudo cargar la lista de logros';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
