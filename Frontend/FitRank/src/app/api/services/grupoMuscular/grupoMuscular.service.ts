import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObtenerGrupoMuscularDTO } from './interfaces/grupoMuscular.interface';


@Injectable({ providedIn: 'root' })
export class GrupoMuscularService    {
  private apiUrl = `${environment.apiUrl}/GrupoMuscular`;

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<ObtenerGrupoMuscularDTO[]> {
    return this.http.get<ObtenerGrupoMuscularDTO[]>(this.apiUrl);
  }

}
