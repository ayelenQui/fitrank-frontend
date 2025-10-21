import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrupoMuscularDTO } from './interfaces/grupomuscular.interface';



@Injectable({ providedIn: 'root' })
export class GrupoMuscularService {
  private baseUrl = 'https://localhost:7226/api/GrupoMuscular';

  constructor(private http: HttpClient) { }

  obtenerGrupos(): Observable<GrupoMuscularDTO[]> {
    return this.http.get<GrupoMuscularDTO[]>(this.baseUrl);
  }
}
