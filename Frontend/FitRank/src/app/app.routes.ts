
import { Route } from '@angular/router';
import { Ranking } from '../app/modules/ranking/components/ranking/ranking.component';
import { RegistrarEntrenamientoComponent } from './modules/entrenamiento/components/registrarEntrenamiento/registrar-entrenamiento.component';
import { HomeComponent } from './modules/home/components/home.component';
import { ActivacionComponent } from './modules/invitacion/components/activacion.component';
import { LoginComponent } from './modules/login/components/login.component';


export const routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, ActivacionComponent },
  { path: 'login', component: LoginComponent },
  
];


export const appRoutes: Route[] = [
  { path: '', redirectTo: 'ranking', pathMatch: 'full' },
  { path: 'ranking', component: Ranking },
  { path: 'EjercicioRealizado', component: RegistrarEntrenamientoComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'activar-cuenta', component: ActivacionComponent },
  { path: '**', redirectTo: '/login' }
  
];

