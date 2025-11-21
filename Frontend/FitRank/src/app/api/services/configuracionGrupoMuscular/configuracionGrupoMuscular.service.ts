import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import {
  AgregarConfiguracionGrupoMuscularDTO,
  ConfiguracionGrupoMuscularDTO
} from '../configuracionGrupoMuscular/interfaces/configuracionGrupoMuscular.interface';

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

  agregar(dto: AgregarConfiguracionGrupoMuscularDTO): Observable<ConfiguracionGrupoMuscularDTO> {
    return this.http.post<ConfiguracionGrupoMuscularDTO>(this.apiUrl, dto);
  }

  actualizarConfiguracion(id: number, dto: AgregarConfiguracionGrupoMuscularDTO): Observable<ConfiguracionGrupoMuscularDTO> {
    return this.http.put<ConfiguracionGrupoMuscularDTO>(`${this.apiUrl}/${id}`, dto);
  }

  obtenerActual(): Observable<ConfiguracionGrupoMuscularDTO | null> {
    return new Observable(observer => {
      this.obtenerTodas().subscribe({
        next: configs => {
          if (configs && configs.length > 0) {
            observer.next(configs[0]);
          } else {
            observer.next(null);
          }
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }
}
