import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accesos',
  standalone: true,
  imports: [CommonModule, NgxScannerQrcodeComponent],
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent {
  @ViewChild('scanner', { static: false }) scanner!: NgxScannerQrcodeComponent;

  resultado = '';
  mensaje = '';
  exito: boolean | null = null;
  loading = false;

  constructor(private http: HttpClient) { }

  // ✅ este es el evento actual que emite los resultados
  onScan(results: ScannerQRCodeResult[]) {
    if (!results || results.length === 0) return;

    const qrData = results[0].value;
    this.resultado = qrData;
    this.validarQR(qrData);

    // detenemos momentáneamente para evitar lecturas múltiples
    this.scanner.stop();
  }

  validarQR(qrData: string) {
    this.loading = true;
    this.http.post('https://localhost:7226/api/Asistencia/validar-qr', { qrData })
      .subscribe({
        next: (res: any) => {
          this.mensaje = res.mensaje || 'Acceso validado correctamente ✅';
          this.exito = res.valido ?? true;
          this.loading = false;
        },
        error: (err) => {
          this.mensaje = err.error?.mensaje || 'Error al validar el QR ❌';
          this.exito = false;
          this.loading = false;
        }
      });
  }

  // 👇 control manual del escaneo
  startScanner() {
    this.scanner.start();
  }

  stopScanner() {
    this.scanner.stop();
  }
}
