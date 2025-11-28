import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';

import { AsistenciaService } from '../../../../api/services/asistencia/asistencia.service';
import { AuthService } from '../../../../api/services/activacion/AuthService.service';
import { TypingService } from "@app/api/services/typingService";
import { SignalRNotificacionesService } from '@app/api/services/notificacion/signalr-notificaciones.service';

@Component({
  selector: 'app-accesos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent implements OnInit {

  @ViewChild('preview') preview!: ElementRef<HTMLVideoElement>;

  reader = new BrowserQRCodeReader();
  controls: IScannerControls | null = null;

  dispositivos: any[] = [];
  selectedDeviceId: string | null = null;

  leyendo = false;

  mensaje = '';
  exito: boolean | null = null;
  loading = false;

  socio: any = null;
  asistencias: any[] = [];

  personasDentro = 0;
  ocupacion: any[] = [];

  constructor(
    private asistenciaService: AsistenciaService,
    private authService: AuthService,
    private typingService: TypingService,
    private signalR: SignalRNotificacionesService
  ) { }

  ngOnInit(): void {
    this.typingService.startTypingEffect('Control de Acceso QR ', 'typingText', 70);
    this.asistenciaService.getOcupacionActual().subscribe(res => {
      this.personasDentro = res.personasDentro;
    });
    this.signalR.ocupacion$.subscribe(ev => {
      if (!ev) return;

      if (ev.tipo === "entrada") {
        this.personasDentro++;
      }

      if (ev.tipo === "salida") {
        // no bajar de 0
        if (this.personasDentro > 0) {
          this.personasDentro--;
        } 
      }

      this.ocupacion.unshift(ev);
    });
  }

  async iniciarScanner() {
    this.mensaje = '';
    this.exito = null;

    // Obtener cámaras
    const devices = await navigator.mediaDevices.enumerateDevices();
    this.dispositivos = devices.filter(d => d.kind === 'videoinput');

    if (this.dispositivos.length === 0) {
      this.mensaje = 'No hay cámaras disponibles.';
      this.exito = false;
      return;
    }

    const rear = this.dispositivos.find(d => /back|rear|environment/gi.test(d.label));
    this.selectedDeviceId = rear?.deviceId ?? this.dispositivos[0].deviceId;

    this.leerQR();
  }

  async leerQR() {
    if (!this.selectedDeviceId) return;

    if (this.controls) this.controls.stop();

    this.leyendo = false;

    this.controls = await this.reader.decodeFromVideoDevice(
      this.selectedDeviceId,
      this.preview.nativeElement,
      (result, err) => {
        if (result && !this.leyendo) {
          this.leyendo = true;
          const text = result.getText();
          this.controls?.stop();
          this.validarQR(text);
        }
      }
    );
  }

  validarQR(qr: string) {
    this.loading = true;

    this.asistenciaService.validarQR(qr).subscribe({
      next: (res) => {
        this.mensaje = res.mensaje;
        this.exito = res.valido;
        this.loading = false;

        if (res.usuarioId) this.cargarDetalle(res.usuarioId);

        this.reanudarScanner();
      },
      error: () => {
        this.mensaje = 'Error validando QR';
        this.exito = false;
        this.loading = false;
        this.reanudarScanner();
      }
    });
  }

  reanudarScanner() {
    setTimeout(() => {
      this.controls?.stop();
      setTimeout(() => this.leerQR(), 300);
    }, 1200);
  }

  cargarDetalle(id: number) {
    this.asistenciaService.getDetalleUsuarioAsistencia(id).subscribe({
      next: (res) => {
        this.socio = res.socio;
        this.asistencias = res.asistencias;
      }
    });
  }
}
