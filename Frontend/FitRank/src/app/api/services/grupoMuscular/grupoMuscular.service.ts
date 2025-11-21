import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GrupoMuscularDTO } from './grupoMuscular.interface';



@Injectable({ providedIn: 'root' })
export class GrupoMuscularService {

  private apiUrl = `${environment.apiUrl}/GrupoMuscular`;

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<GrupoMuscularDTO[]> {
    return this.http.get<GrupoMuscularDTO[]>(this.apiUrl);
  }
}
