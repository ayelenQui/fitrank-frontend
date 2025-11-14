import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRNotificacionesService {

  private hubConnection!: signalR.HubConnection;

  private notificacionSubject = new Subject<any>();
  notificacion$ = this.notificacionSubject.asObservable();

  private ocupacionSource = new BehaviorSubject<any>(null);
  ocupacion$ = this.ocupacionSource.asObservable();

  private conectado = false; // <-- evita conexiones dobles

  constructor(private authService: AuthService) { }

  iniciarConexion() {

    if (this.conectado) {
      console.warn("⚠️ SignalR ya estaba conectado, se ignora iniciarConexion()");
      return;
    }

    const token = this.authService.obtenerToken();
    if (!token) {
      console.error("❌ NO HAY TOKEN, NO SE PUEDE CONECTAR A SIGNALR");
      return;
    }

    console.log("🔑 Token enviado al hub:", token.substring(0, 20) + "...");

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7226/hubs/notificaciones', {
        accessTokenFactory: () => this.authService.obtenerToken() ?? ''
      })
      .withAutomaticReconnect()
      .build();

    // ==========================
    // 🟡 Logs de conexión
    // ==========================
    this.hubConnection.onreconnecting(error => {
      console.warn("🟡 SignalR reconectando...", error);
    });

    this.hubConnection.onreconnected(connectionId => {
      console.log("🟢 SignalR reconectado:", connectionId);
    });

    this.hubConnection.onclose(error => {
      console.error("🔴 SignalR desconectado", error);
      this.conectado = false;
    });

    // ==========================
    // 🎯 Eventos recibiendo datos
    // ==========================

    this.hubConnection.on('NotificacionRecibida', (data) => {
      console.log('🔔 [EVENTO] NotificacionRecibida:', data);
      this.notificacionSubject.next(data);
    });

    this.hubConnection.on('OcupacionActualizada', (data) => {
      console.log("📊 [EVENTO] OcupacionActualizada:", data);
      this.ocupacionSource.next(data);
    });

    // ==========================
    // 🚀 Iniciar conexión
    // ==========================

    this.hubConnection
      .start()
      .then(() => {
        this.conectado = true;
        console.log('%c🟢 SignalR CONECTADO OK', 'color: #00c853; font-size: 14px; font-weight: bold;');
      })
      .catch(err => {
        console.error('❌ Error al conectar con SignalR (NEGO FAIL / 401 / CORS / TOKEN)', err);
      });
  }
}
