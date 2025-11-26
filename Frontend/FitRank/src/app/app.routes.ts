import { Route } from '@angular/router';
import { LoginComponent } from './modules/login/components/login.component';
import { VisitanteHome } from '../app/modules/visitante-home/visitante-home';
import { homeAdminRoutes } from '../app/homeAdmin.routes';
import { RankingComponent } from './modules/ranking/components/ranking/ranking.component';
import { AdminInvitacionComponent } from './modules/admin-invitacion/components/admin-invitacion.component';
import { ActivacionComponent } from './modules/invitacion/components/activacion.component';
import { AuthGuard } from './guards/auth.guards';
import { LoginGuard } from './guards/login.guards';
import { AdminGuard } from './guards/admin.guards';
import { CrearRutinaComponent } from './modules/rutinas/crear-rutina/crear-rutina';
import { CrearRutinaManualComponent } from './modules/rutinas/crear-rutina-manual/crear-rutina-manual';
import { HomeSocioComponent } from './modules/home/components/home-socio/home-socio.component';
import { CrearSesionesRutinaComponent } from './modules/rutinas/crear-sesiones-rutina/crear-sesiones-rutina';
import { MisRutinasComponent } from './modules/rutinas/mis-rutinas/components/mis-rutinas.component';
import { IniciarRutinaComponent } from './modules/rutinas/iniciar-rutina/components/iniciar-rutina.component';
import { ListaTorneosComponent } from './modules/torneo/lista-torneo/lista-torneo.component';
import { RankingTorneoComponent } from './modules/torneo/ver-torneo/ver-torneo.component';
import { GeneralLayoutComponent } from './layouts/general-layout/general-layout.component';
import { AccesoGimnasioComponent } from './modules/asistencia/acceso-gimnasio/acceso-gimnasio.component';
import { CalcularPuntajeComponent } from './modules/rutinas/calcular-puntaje/calcular-puntaje.component';
import { FormularioRutinaIa } from './modules/rutinas/formulario-rutina-ia/formulario-rutina-ia';
import { SolicitudesProfesor } from './modules/profesor/solicitudes-profesor/solicitudes-profesor';
import { FormularioRutinaAsistida } from './modules/rutinas/formulario-rutina-asistida/formulario-rutina-asistida';
import { PagoExitosoComponent } from './modules/pago-exitoso/pago-exitoso.component';
import { PagoFallidoComponent } from './modules/pago-fallido/pago-fallido.component';
import { PagoPendienteComponent } from './modules/pago-pendiente/pago-pendiente.component';
import { HistorialEntrenamientos } from './modules/entrenamiento/historial-entrenamientos/historial-entrenamientos';
import { CrearBatallaComponent } from './modules/batalla/crear-batalla/components/crear-batalla.component';
import { MisBatallasComponent } from './modules/batalla/mis-batallas/components/mis-batallas.component';
import { DetalleBatallaComponent } from './modules/batalla/detalle-batalla/detalle-batalla.component';
import { ProgresoAlumnos } from './modules/profesor/progreso-alumnos/progreso-alumnos';
import { MisReportes } from './modules/reportes/mis-reportes/mis-reportes';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/visitante-home', pathMatch: 'full' },
  
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'visitante-home', component: VisitanteHome },
  { path: 'home/home-socio', component: HomeSocioComponent, canActivate: [AuthGuard] },
  { path: 'homeAdmin', children: homeAdminRoutes },
  { path: 'ranking', component: RankingComponent, canActivate: [AuthGuard] },
   { path: 'admin-invitacion', component: AdminInvitacionComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'activar-cuenta', component: ActivacionComponent },// Rutas rutinas
  { path: 'rutina/editar/:id', component: CrearRutinaComponent },
  { path: 'torneo/lista-torneo', component: ListaTorneosComponent, canActivate: [AuthGuard] },
  { path: 'torneo/ver-torneo/:id', component: RankingTorneoComponent, canActivate: [AuthGuard] },

  { path: 'acceso', component: AccesoGimnasioComponent },

  {
  path: 'solicitudes-profesor',
  component: GeneralLayoutComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', component: SolicitudesProfesor }
  ]
},
  { path: 'batalla',
   component: GeneralLayoutComponent,
   canActivate: [AuthGuard],
   children: [
    { path: 'crear', component: CrearBatallaComponent },
    { path: 'mis-batallas', component: MisBatallasComponent },
    { path: 'batallas/:id', component: DetalleBatallaComponent }
   ]
  },

  {
    path: 'profesor',
    component: GeneralLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      //{path: 'alumnos', component : Alumnos}, //Jero: no se que vamos a mostrar aca en la vista lo dejo comentado
      {path: 'progreso-alumnos', component : ProgresoAlumnos}
    ]
  },

  {
    path: 'rutina',
    component: GeneralLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'mis-rutinas', component: MisRutinasComponent },
      { path: 'crear-manual', component: CrearRutinaManualComponent },
      { path: 'crear', component: CrearRutinaComponent },
      { path: 'iniciar-rutina/:id', component: IniciarRutinaComponent },
      { path: 'crear-sesiones-rutina/:id', component: CrearSesionesRutinaComponent },
      { path: 'editar/:id', component: CrearRutinaComponent },
      { path: '', redirectTo: 'mis-rutinas', pathMatch: 'full' },
      { path: 'calcular-puntaje', component: CalcularPuntajeComponent },
      //{ path: '', redirectTo: 'mis-rutinas', pathMatch: 'full' },
      { path: 'solicitar-rutina', component: FormularioRutinaAsistida },
      { path: 'ia', component: FormularioRutinaIa },
      { path: 'mis-entrenamientos', component: HistorialEntrenamientos }
    ]
  },


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
    component: GeneralLayoutComponent,
    loadChildren: () =>
      import('./modules/socios/mis-logros/mis-logros.routes').then(r => r.misLogrosRoutes)
  },
  { path: 'pago-exitoso', component: PagoExitosoComponent },
  { path: 'pago-fallido', component: PagoFallidoComponent },
  { path: 'pago-pendiente', component: PagoPendienteComponent },

  
  {
    path: 'maquina/:id',
    loadComponent: () =>
      import('./modules/maquina/maquina-detalle.component')
        .then(m => m.MaquinaDetalleComponent)
  },

  {
    path: 'reportes', 
    component: GeneralLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'mis-reportes', component : MisReportes}
    ]
  }
  
];