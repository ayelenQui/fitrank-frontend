import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../activacion/AuthService.service';

@Injectable({ providedIn: 'root' })
export class GimnasioService {

  private http = inject(HttpClient);
  private auth = inject(AuthService);

  private baseUrl = `${environment.apiUrl}/Gimnasio`;

  listarLogrosGimnasio(gimnasioId: number) {

  return this.http.get<any[]>(`${this.baseUrl}/gimnasios/${gimnasioId}/logros`).pipe(
    map(items => items.map(x => ({
      id: x.id ?? x.Id ?? x.logroId ?? x.LogroId,
      nombre: x.nombre ?? x.Nombre,
      descripcion: x.descripcion ?? x.Descripcion ?? '',
      puntos: x.puntos ?? x.Puntos ?? x.puntosOtorgados ?? x.PuntosOtorgados ?? 0,
      activo: x.activo ?? x.Activo ?? false
    })))
  );
  }
  obtenerMiGimnasio() {
    const gimnasioId = this.auth.obtenerGimnasioId();
    return this.http.get(`${this.baseUrl}/${gimnasioId}`);
  }

  actualizarGimnasio(dto: any) {
    return this.http.put(`${this.baseUrl}/${dto.Id}`, dto);
  }

  subirLogo(fd: FormData) {
    const gimnasioId = this.auth.obtenerGimnasioId();
    return this.http.post(`${this.baseUrl}/${gimnasioId}/logo`, fd);
  }

  actualizarPersonalizacion(dto: any) {
    return this.http.put(`${this.baseUrl}/personalizacion`, dto);
  }

listarLogrosActivos(gimnasioId: number) {
 
  return this.http.get<any[]>(`${this.baseUrl}/gimnasios/${gimnasioId}/logros/activos`).pipe(
    map(items => items.map(x => ({
      id: x.id ?? x.Id ?? x.logroId ?? x.LogroId,
      nombre: x.nombre ?? x.Nombre,
      descripcion: x.descripcion ?? x.Descripcion ?? '',
      puntos: x.puntos ?? x.Puntos ?? x.puntosOtorgados ?? x.PuntosOtorgados ?? 0,
      activo: true
    })))
  );


}
}
