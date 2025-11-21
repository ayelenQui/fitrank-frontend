import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 

@Component({
  selector: 'app-acceso-gimnasio',
  templateUrl: './acceso-gimnasio.component.html',
  styleUrls: ['./acceso-gimnasio.component.css']
})
export class AccesoGimnasioComponent implements OnInit {
  mensaje: string = '';
  loading = true;
  exito: boolean | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
     
      const qrUrl = `${window.location.origin}/acceso?token=${token}`;
      this.validarQR(qrUrl);
    } else {
      this.mensaje = 'QR inválido o faltante.';
      this.loading = false;
      this.exito = false;
    }
  }

  validarQR(qrData: string) {
    this.http.post(`${environment.apiUrl}/Asistencia/validar-qr`, { qrData })
      .subscribe({
        next: (res: any) => {
          this.mensaje = res.mensaje;
          this.loading = false;
          this.exito = res.valido;
        },
        error: (err) => {
          this.mensaje = err.error?.mensaje || 'Error al validar el pase.';
          this.loading = false;
          this.exito = false;
        }
      });
  }
}

