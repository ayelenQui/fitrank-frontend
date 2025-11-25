import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { AsistenciaDetalleUsuarioDTO, SocioDTO } from '../../../../api/services/asistencia/interface/asistencia.interface';
import { AsistenciaService } from '../../../../api/services/asistencia/asistencia.service';
import { AuthService } from '../../../../api/services/activacion/AuthService.service';
import { TypingService } from "@app/api/services/typingService";
import { SignalRNotificacionesService } from '@app/api/services/notificacion/signalr-notificaciones.service';

@Component({
  selector: 'app-accesos',
  standalone: true,
  imports: [CommonModule, NgxScannerQrcodeComponent],
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent implements OnInit {

  @ViewChild('scanner', { static: false }) scanner!: NgxScannerQrcodeComponent;

  personasDentro: number = 0;


  selectedDevice: any = null;


  ocupacion: Array<{
    nombre: string;
    foto: string | null;
    fecha: Date;
    tipo: 'entrada' | 'salida';
  }> = [];

  resultado = '';
  mensaje = '';
  exito: boolean | null = null;
  loading = false;

  socio: SocioDTO | null = null;
  asistencias: AsistenciaDetalleUsuarioDTO[] = [];

  constructor(
    private asistenciaService: AsistenciaService,
    private authService: AuthService,
    private typingService: TypingService,
    private signalR: SignalRNotificacionesService
  ) { }

  ngOnInit(): void {

    // Actualización en tiempo real por SignalR
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

      console.log("🔥 Ocupación actualizada:", evento);
    });

    this.typingService.startTypingEffect('Control de Acceso QR ', 'typingText', 70);
  }

  // ======================================================
  // 📌 CAPTURA DEL QR — MÁXIMA COMPATIBILIDAD PRODUCCIÓN
  // ======================================================
  onScan(result: any) {
    console.log("📸 Resultado crudo del QR:", result);

    // Manejo universal de formatos (texto, objeto, value, text)
    const qrData =
      result?.text ??
      result?.value ??
      (typeof result === 'string' ? result : null);

    if (!qrData) {
      console.warn("⚠️ QR vacío o no reconocido");
      return;
    }

    this.resultado = qrData;
    this.validarQR(qrData);

    this.scanner.stop();
  }

  validarQR(qrData: string) {
    this.loading = true;

    this.asistenciaService.validarQR(qrData).subscribe({
      next: (res: any) => {
        this.mensaje = res.mensaje || 'Acceso validado correctamente ✅';
        this.exito = res.valido ?? true;
        this.loading = false;

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
    const token = this.authService.obtenerToken();

    if (!token) {
      this.mensaje = '⚠️ No hay sesión activa de administrador.';
      return;
    }

    this.loading = true;

    this.asistenciaService.getDetalleUsuarioAsistencia(usuarioId).subscribe({
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

  ngAfterViewInit() {

    this.scanner?.devices?.subscribe((devices: any[]) => {
      if (!devices || devices.length === 0) return;

    
      const backCam = devices.find(d =>
        d.label.toLowerCase().includes('back') ||
        d.label.toLowerCase().includes('rear')
      );

      const defaultCam = devices[0];

      this.selectedDevice = backCam || defaultCam;
    });
  }
}
