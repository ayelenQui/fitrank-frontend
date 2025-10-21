import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { GrupoMuscularDTO } from "../../../api/services/grupomuscular/interfaces/grupomuscular.interface";

@Injectable({
  providedIn: 'root'
})
export class GrupoMuscularService{
    private apiUrl = `${environment.apiUrl}/Grupomuscular`;
    constructor(private http: HttpClient){}

  listarGruposMusculares(): Observable<GrupoMuscularDTO[]> {
    return this.http.get<GrupoMuscularDTO[]>(this.apiUrl);
  }
}
