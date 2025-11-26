import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxScannerQrcodeComponent, ScannerQRCodeDevice } from 'ngx-scanner-qrcode';
import { AsistenciaDetalleUsuarioDTO, SocioDTO } from '../../../../api/services/asistencia/interface/asistencia.interface';
import { AsistenciaService } from '../../../../api/services/asistencia/asistencia.service';
import { AuthService } from '../../../../api/services/activacion/AuthService.service';
import { TypingService } from "@app/api/services/typingService";
import { SignalRNotificacionesService } from '@app/api/services/notificacion/signalr-notificaciones.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accesos',
  standalone: true,
  imports: [CommonModule, NgxScannerQrcodeComponent, FormsModule],
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent implements OnInit, AfterViewInit {

  @ViewChild('scanner') scanner!: NgxScannerQrcodeComponent;

  personasDentro = 0;
  dispositivos: ScannerQRCodeDevice[] = [];
  selectedDeviceId: string | null = null;

  socio: SocioDTO | null = null;
  asistencias: AsistenciaDetalleUsuarioDTO[] = [];

  mensaje = '';
  exito: boolean | null = null;
  loading = false;

  ocupacion: Array<{
    nombre: string;
    foto: string | null;
    fecha: Date;
    tipo: 'entrada' | 'salida';
  }> = [];

  constructor(
    private asistenciaService: AsistenciaService,
    private authService: AuthService,
    private typingService: TypingService,
    private signalR: SignalRNotificacionesService
  ) { }

  ngOnInit(): void {
    this.signalR.ocupacion$.subscribe(evento => {
      if (!evento) return;

      if (evento.tipo === "entrada") this.personasDentro++;
      if (evento.tipo === "salida") this.personasDentro--;

      this.ocupacion.unshift({
        nombre: evento.nombre,
        foto: evento.foto,
        fecha: new Date(evento.fecha),
        tipo: evento.tipo
      });
    });

    this.typingService.startTypingEffect('Control de Acceso QR ', 'typingText', 70);
  }

  ngAfterViewInit() {
    this.scanner.devices.subscribe((devices: ScannerQRCodeDevice[]) => {
      console.log("Dispositivos detectados:", devices);
      this.dispositivos = devices;

      if (devices.length === 0) {
        console.error("No se encontraron cámaras. Verifica permisos y HTTPS.");
        this.mensaje = "No se pudo acceder a la cámara. Asegúrate de estar en HTTPS y otorgar permisos.";
        this.exito = false;
        return;
      }

      // Seleccionar cámara trasera SIEMPRE en mobile
      const rear = devices.find(d =>
        /back|rear|environment/gi.test(d.label)
      );

      this.selectedDeviceId = rear?.deviceId ?? devices[0].deviceId;

      console.log("🎥 Cámara seleccionada:", this.selectedDeviceId);

      // IMPORTANTE: iniciar scanner SOLO luego de seleccionar cámara
      setTimeout(() => {
        try {
          this.scanner.start();  // SIN .then() ni .catch()
          console.log("Escáner iniciado.");
        } catch (err: any) {
          console.error("Error al iniciar escáner:", err);
          this.mensaje = "Error al iniciar la cámara: " + err.message;
          this.exito = false;
        }
      }, 1000);
    });

    // REMOVIDO: this.scanner.scanError.subscribe(...) - no existe en esta versión
  }

  // EVENTO DE LECTURA REAL
  onScan(result: any) {
    console.log("Resultado crudo del escaneo:", result);
    const qrText =
      result?.text ||
      result?.value ||
      (typeof result === 'string' ? result : null);

    if (!qrText) {
      console.warn("QR detectado pero sin texto válido.");
      return;
    }

    console.log("QR detectado:", qrText);

    this.scanner.stop();
    this.validarQR(qrText);
  }

  // Método opcional para fallos (maneja errores manualmente si es necesario)
  onScanFail(err: any) {
    console.error("Fallo en escaneo:", err);
    this.mensaje = "Error al escanear: " + err.message;
    this.exito = false;
  }

  onDeviceChange() {
    if (!this.selectedDeviceId) return;

    this.scanner.stop();
    setTimeout(() => {
      this.scanner.start();
    }, 200);
  }

  validarQR(qrData: string) {
    this.loading = true;

    this.asistenciaService.validarQR(qrData).subscribe({
      next: (res: any) => {
        this.mensaje = res.mensaje || 'Acceso validado correctamente';
        this.exito = res.valido ?? true;
        this.loading = false;

        if (res.usuarioId) {
          this.cargarDetalleComoAdmin(res.usuarioId);
        }

        // volver a activar cámara después de validar
        setTimeout(() => this.scanner.start(), 1200);
      },

      error: (err: any) => {
        this.mensaje = err.error?.mensaje || 'Error al validar QR';
        this.exito = false;
        this.loading = false;

        setTimeout(() => this.scanner.start(), 1200);
      }
    });
  }

  cargarDetalleComoAdmin(usuarioId: number) {
    const token = this.authService.obtenerToken();
    if (!token) return;

    this.loading = true;

    this.asistenciaService.getDetalleUsuarioAsistencia(usuarioId).subscribe({
      next: (res: any) => {
        if (res.exito) {
          this.socio = res.socio;
          this.asistencias = res.asistencias;
        }
        this.loading = false;
      },

      error: (err: any) => {
        this.mensaje = 'Error recuperando datos del socio';
        this.loading = false;
      }
    });
  }
}
