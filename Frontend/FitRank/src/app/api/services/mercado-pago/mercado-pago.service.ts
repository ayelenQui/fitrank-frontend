import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MercadoPagoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Mercadopago`;

  crearPreferencia(invitacionId: number, monto: number, email: string): Observable<{ url: string }> {
    return this.http.post<{ url: string }>(
      `${this.apiUrl}/crear-preferencia?invitacionId=${invitacionId}&monto=${monto}&email=${email}`,
      {}
    );
  }
}
