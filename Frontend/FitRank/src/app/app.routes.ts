import { Route } from '@angular/router';
import { LoginComponent } from './modules/login/components/login.component';
import { HomeComponent } from './modules/home/components/home.component';
import { VisitanteHome } from '../app/modules/visitante-home/visitante-home';
import { HomeAdminComponent } from './modules/homeAdmin/components/homeAdmin.component';
import { RankingComponent } from './modules/ranking/components/ranking/ranking.component';
import { RegistrarEntrenamientoComponent } from './modules/entrenamiento/components/registrarEntrenamiento/registrar-entrenamiento.component';
import { AdminInvitacionComponent } from './modules/admin-invitacion/components/admin-invitacion.component';
import { ActivacionComponent } from './modules/invitacion/components/activacion.component';
import { AuthGuard } from './guards/auth.guards';
import { LoginGuard } from './guards/login.guards';
import { AdminGuard } from './guards/admin.guards';
import { Sociohome } from './modules/sociohome/sociohome';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/visitante-home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'visitante-home', component: VisitanteHome },
  { path: 'home', component: Sociohome, canActivate: [AuthGuard] },
  { path: 'homeAdmin', component: HomeAdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'ranking', component: RankingComponent, canActivate: [AuthGuard] },
  { path: 'EjercicioRealizado', component: RegistrarEntrenamientoComponent, canActivate: [AuthGuard] },
  { path: 'admin-invitacion', component: AdminInvitacionComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'activar-cuenta', component: ActivacionComponent },

  //LOGROS (Corregir para renderizar igual que el resto para el próximo MVP)
    {
    path: 'logros',
    loadChildren: () =>
      import('./modules/logros/logros.routes').then(r => r.logrosRoutes)
  },
    {
  path: 'gimnasios/:gimnasioId/logros',
  loadChildren: () =>
    import('./modules/gimnasios/logros/gim-logros.routes').then(r => r.gimnasioLogrosRoutes)
  },
  {
    path: 'socios/:socioId/gimnasios/:gimnasioId/logros',
    loadChildren: () =>
      import('./modules/socios/mis-logros/mis-logros.routes').then(r => r.misLogrosRoutes)
  },

  { path: '**', redirectTo: 'login' }
];
