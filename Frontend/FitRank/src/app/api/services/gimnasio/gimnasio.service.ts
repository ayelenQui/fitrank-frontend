import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GimnasioService {
    private baseUrl ='https://localhost:7226/api'
  private http = inject(HttpClient);

  listarLogrosGimnasio(gimnasioId: number) {
  // GET /api/gimnasios/{gimnasioId}/logros  (todos con su estado)
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

listarLogrosActivos(gimnasioId: number) {
  // GET /api/gimnasios/{gimnasioId}/logros/activos  (solo activos)
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