// src/app/api/services/configuracion-grupo-muscular/configuracion-grupo-muscular.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface ConfiguracionGrupoMuscularDTO {
  id: number;
  grupoMuscularId: number;
  multiplicadorPeso: number;
  multiplicadorRepeticiones: number;
  factorProgresion: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionGrupoMuscularService {
    private apiUrl = `${environment.apiUrl}/ConfiguracionGrupoMuscular`;

  constructor(private http: HttpClient) { }

  obtenerTodas(): Observable<ConfiguracionGrupoMuscularDTO[]> {
    return this.http.get<ConfiguracionGrupoMuscularDTO[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<ConfiguracionGrupoMuscularDTO> {
    return this.http.get<ConfiguracionGrupoMuscularDTO>(`${this.apiUrl}/${id}`);
  }
}