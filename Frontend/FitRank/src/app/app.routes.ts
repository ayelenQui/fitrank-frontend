import { Route } from '@angular/router';
import { LoginComponent } from './modules/login/components/login.component';
import { Home } from './modules/home/home';
import { VisitanteHome } from '../app/modules/visitante-home/visitante-home';
import { homeAdminRoutes } from '../app/homeAdmin.routes';
import { RankingComponent } from './modules/ranking/components/ranking/ranking.component';
import { RegistrarEntrenamientoComponent } from './modules/entrenamiento/components/registrarEntrenamiento/registrar-entrenamiento.component';
import { AdminInvitacionComponent } from './modules/admin-invitacion/components/admin-invitacion.component';
import { ActivacionComponent } from './modules/invitacion/components/activacion.component';
import { AuthGuard } from './guards/auth.guards';
import { LoginGuard } from './guards/login.guards';
import { AdminGuard } from './guards/admin.guards';
import { CrearRutinaComponent } from './modules/rutinas/crear-rutina/crear-rutina';
import { CrearRutinaManualComponent } from './modules/rutinas/crear-rutina-manual/crear-rutina-manual';
import { MisRutinasComponent } from './modules/rutinas/mis-rutinas/mis-rutinas';
import { EditarRutinaComponent } from './modules/rutinas/editar-rutina/editar-rutina';
import { IniciarRutina } from './modules/rutinas/iniciar-rutina/iniciar-rutina/iniciar-rutina';
import { TerminarRutinaComponent } from './modules/rutinas/terminar-rutina/terminar-rutina';
import { Ranking } from './modules/rutinas/ranking/ranking';
import { VerRutinaComponent } from './modules/rutinas/ver-rutina/ver-rutina';
import { HomeSocioComponent } from './modules/home/components/home-socio/home-socio.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/visitante-home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'visitante-home', component: VisitanteHome },
  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'homeAdmin', children: homeAdminRoutes },
  { path: 'ranking', component: RankingComponent, canActivate: [AuthGuard] },
  { path: 'EjercicioRealizado', component: RegistrarEntrenamientoComponent, canActivate: [AuthGuard] },
  { path: 'admin-invitacion', component: AdminInvitacionComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'activar-cuenta', component: ActivacionComponent },// Rutas rutinas
  {path: 'rutina/crear', component: CrearRutinaComponent},
  {path: 'rutina/crear-manual', component: CrearRutinaManualComponent},
  {path: 'rutina/editar/:id', component: CrearRutinaComponent},
  {path: 'rutina/ver/:id', component: CrearRutinaComponent},
  {path: 'rutina/mis-rutinas', component: MisRutinasComponent},
  {path: 'rutina/editar-rutina/:id', component: EditarRutinaComponent},
  {path: 'rutina/iniciar/:id', component: IniciarRutina},
  {path: 'rutina/terminar-rutina', component: TerminarRutinaComponent},
  {path: 'rutina/ranking', component: Ranking},
  {path: 'home/home-socio', component: HomeSocioComponent},


  
  { path: 'rutina/crear', component: CrearRutinaComponent, canActivate: [AuthGuard] },
  { path: 'rutina/crear-manual', component: CrearRutinaManualComponent, canActivate: [AuthGuard] },
  { path: 'rutina/editar/:id', component: CrearRutinaComponent, canActivate: [AuthGuard] },
  { path: 'rutina/ver/:id', component: VerRutinaComponent, canActivate: [AuthGuard] },
  { path: 'rutina/mis-rutinas', component: MisRutinasComponent, canActivate: [AuthGuard] },
  { path: 'rutina/editar-rutina/:id', component: EditarRutinaComponent, canActivate: [AuthGuard] },
  { path: 'rutina/iniciar/:id', component: IniciarRutina, canActivate: [AuthGuard] },


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
