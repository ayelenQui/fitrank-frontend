import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GrupoMuscularDTO } from '../grupoMuscular/interfaces/grupomuscular.interface';

 

  @Injectable({ providedIn: 'root' })

  export class GrupoMuscularService {

  private baseUrl = `${environment.apiUrl}/GrupoMuscular`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<GrupoMuscularDTO[]> {
    return this.http.get<GrupoMuscularDTO[]>(this.baseUrl);
  }
}
