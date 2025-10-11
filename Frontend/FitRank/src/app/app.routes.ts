
import { Route } from '@angular/router';
import { Ranking } from '../app/modules/ranking/components/ranking/ranking.component';
import { RegistrarEntrenamientoComponent } from './modules/entrenamiento/components/registrarEntrenamiento/registrar-entrenamiento.component';


export const appRoutes: Route[] = [
  { path: '', redirectTo: 'ranking', pathMatch: 'full' },
  { path: 'ranking', component: Ranking },
  { path: 'EjercicioRealizado', component: RegistrarEntrenamientoComponent } 
 
];

