import { Route } from '@angular/router';
import { LoginComponent } from './modules/login/components/login.component';
import { HomeComponent } from './modules/home/components/home.component';
import { VisitanteComponent } from './modules/visitante/components/visitante.component';
import { HomeAdminComponent } from './modules/homeAdmin/components/homeAdmin.component';
import { RankingComponent } from './modules/ranking/components/ranking/ranking.component';
import { RegistrarEntrenamientoComponent } from './modules/entrenamiento/components/registrarEntrenamiento/registrar-entrenamiento.component';
import { AdminInvitacionComponent } from './modules/admin-invitacion/components/admin-invitacion.component';
import { ActivacionComponent } from './modules/invitacion/components/activacion.component';
import { AuthGuard } from './guards/auth.guards';
import { LoginGuard } from './guards/login.guards';
import { AdminGuard } from './guards/admin.guards';

export const appRoutes: Route[] = [
  // primera ruta por defecto axel :visitante 
  { path: '', redirectTo: '/visitante', pathMatch: 'full' },
  // Login
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },

  // Home público (sin login)
  { path: 'visitante', component: VisitanteComponent },


  // Home socio logueado
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  // Home admin logueado
  { path: 'home-admin', component: HomeAdminComponent, canActivate: [AuthGuard, AdminGuard] },

  // Rutas compartidas (logueados)
  { path: 'ranking', component: RankingComponent, canActivate: [AuthGuard] },
  { path: 'EjercicioRealizado', component: RegistrarEntrenamientoComponent, canActivate: [AuthGuard] },

  // Rutas solo admin
  { path: 'admin-invitacion', component: AdminInvitacionComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'activar', component: ActivacionComponent, canActivate: [AuthGuard, AdminGuard] },

  // Redirecciones
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
