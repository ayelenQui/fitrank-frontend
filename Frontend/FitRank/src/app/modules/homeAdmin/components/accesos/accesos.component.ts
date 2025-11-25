import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
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

  @ViewChild('scanner', { static: false }) scanner!: NgxScannerQrcodeComponent;

  personasDentro: number = 0;

  dispositivos: any[] = [];
  selectedDevice: any = null;

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

  // =======================================================
  // 📌 LECTURA QR
  // =======================================================
  onScan(result: any) {
    const qrText =
      result?.text ||
      result?.value ||
      (typeof result === 'string' ? result : null);

    if (!qrText) return;

    this.scanner.stop();
    this.validarQR(qrText);
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
      },
      error: (err) => {
        this.mensaje = err.error?.mensaje || 'Error al validar QR';
        this.exito = false;
        this.loading = false;
      }
    });
  }

  cargarDetalleComoAdmin(usuarioId: number) {
    const token = this.authService.obtenerToken();

    if (!token) {
      this.mensaje = 'No hay sesión activa';
      return;
    }

    this.loading = true;

    this.asistenciaService.getDetalleUsuarioAsistencia(usuarioId).subscribe({
      next: (res) => {
        if (res.exito) {
          this.socio = res.socio;
          this.asistencias = res.asistencias;
        } else {
          this.mensaje = res.mensaje;
        }
        this.loading = false;
      },
      error: () => {
        this.mensaje = 'Error recuperando datos del socio';
        this.loading = false;
      }
    });
  }

  // =======================================================
  // 📌 INICIO / STOP
  // =======================================================
  startScanner() {
    if (!this.selectedDevice) return;
    this.scanner.start(this.selectedDevice);
  }

  stopScanner() {
    this.scanner.stop();
  }

  // =======================================================
  // 📌 DETECCIÓN DE CÁMARAS (Celular / Escritorio)
  // =======================================================
  ngAfterViewInit() {
    this.scanner.devices.subscribe(devices => {
      this.dispositivos = devices;

      if (!devices || devices.length === 0) return;

      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

      if (isMobile) {
        // Buscar cámara trasera
        const rear = devices.find(d =>
          d.label.toLowerCase().includes("back") ||
          d.label.toLowerCase().includes("rear") ||
          d.label.toLowerCase().includes("environment")
        );

        this.selectedDevice = rear ?? devices[0];   // fallback
        console.log("📱 Modo CELULAR -> cámara trasera seleccionada:", this.selectedDevice);

      } else {
        // Escritorio → usamos la primera cámara
        this.selectedDevice = devices[0];
        console.log("🖥️ Modo ESCRITORIO -> cámara por defecto:", this.selectedDevice);
      }
    });
  }

}
