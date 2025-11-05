import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { HttpClient } from '@angular/common/http';
import { AsistenciaDetalleUsuarioDTO, SocioDTO } from '../../../../api/services/asistencia/interface/asistencia.interface';
import { AsistenciaService } from '../../../../api/services/asistencia/asistencia.service';
import { AuthService } from '../../../../api/services/activacion/AuthService.service';
import { TypingService } from "@app/api/services/typingService"; 

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

  socio: SocioDTO | null = null;
  asistencias: AsistenciaDetalleUsuarioDTO[] = [];

  constructor(private asistenciaService: AsistenciaService, private authService: AuthService, private typingService: TypingService) { }
  ngOnInit(): void {
    this.typingService.startTypingEffect('Control de Acceso QR ', 'typingText', 70);
  }
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

    this.asistenciaService.validarQR(qrData).subscribe({
      next: (res: any) => {
        this.mensaje = res.mensaje || 'Acceso validado correctamente ✅';
        this.exito = res.valido ?? true;
        this.loading = false;

        // Solo si el QR fue válido
        if (res.usuarioId) {
          this.cargarDetalleComoAdmin(res.usuarioId);
        }
      },
      error: (err) => {
        this.mensaje = err.error?.mensaje || 'Error al validar el QR ❌';
        this.exito = false;
        this.loading = false;
      }
    });
  }

  cargarDetalleComoAdmin(usuarioId: number) {
    const token = this.authService.obtenerToken(); // ✅ token del admin logueado
    if (!token) {
      this.mensaje = '⚠️ No hay sesión activa de administrador.';
      return;
    }

    this.loading = true;
    this.asistenciaService.getDetalleUsuarioAsistencia(usuarioId, token).subscribe({
      next: (res) => {
        console.log('📋 Detalle socio:', res);
        if (res.exito) {
          this.socio = res.socio;
          this.asistencias = res.asistencias;
        } else {
          this.mensaje = res.mensaje;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al obtener detalle:', err);
        this.mensaje = 'No se pudieron cargar los datos del socio.';
        this.loading = false;
      }
    });
  }

  
  startScanner() {
    this.scanner.start();
  }

  stopScanner() {
    this.scanner.stop();
  }
}
