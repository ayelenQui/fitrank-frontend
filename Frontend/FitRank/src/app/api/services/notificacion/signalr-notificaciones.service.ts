import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AuthService } from '@app/api/services/activacion/AuthService.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRNotificacionesService {

  private hubConnection!: signalR.HubConnection;

  private notificacionSubject = new Subject<any>();
  notificacion$ = this.notificacionSubject.asObservable();

  private ocupacionSource = new BehaviorSubject<any>(null);
  ocupacion$ = this.ocupacionSource.asObservable();

  private themeSubject = new BehaviorSubject<any>(null);
  theme$ = this.themeSubject.asObservable();


  private conectado = false;

  constructor(private authService: AuthService) { }

  iniciarConexion() {

    if (this.conectado) {
      console.warn(" SignalR ya estaba conectado, se ignora iniciarConexion()");
      return;
    }

    const token = this.authService.obtenerToken();
    if (!token) {
      console.error(" NO HAY TOKEN, NO SE PUEDE CONECTAR A SIGNALR");
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.hubUrl, {
        accessTokenFactory: () => this.authService.obtenerToken() ?? ''
      })
      .withAutomaticReconnect()
      .build();


    this.hubConnection.onreconnecting(error => {
    });

    this.hubConnection.onreconnected(connectionId => {
    });

    this.hubConnection.onclose(error => {
      console.error(" SignalR desconectado", error);
      this.conectado = false;
    });



    this.hubConnection.on('NotificacionRecibida', (data) => {
      this.notificacionSubject.next(data);
    });

    this.hubConnection.on('OcupacionActualizada', (data) => {
      this.ocupacionSource.next(data);
    });

    this.hubConnection.on('ThemeUpdated', (data) => {

      
      localStorage.setItem('gym-theme', JSON.stringify(data));

      
      document.documentElement.style.setProperty('--color-principal', data.colorPrincipal);
      document.documentElement.style.setProperty('--color-secundario', data.colorSecundario);

      if (data.logoUrl) {
        document.documentElement.style.setProperty('--logo-gimnasio', `url('${data.logoUrl}')`);
      }


      this.themeSubject.next(data);
    });

    this.hubConnection.on('pagoAcreditado', (data) => {
      this.notificacionSubject.next({
        tipo: 'pagoAcreditado',
        data
      });
    });



    this.hubConnection
      .start()
      .then(() => {
        this.conectado = true;
      })
      .catch(err => {
        console.error(' Error al conectar con SignalR (NEGO FAIL / 401 / CORS / TOKEN)', err);
      });
  }
}
