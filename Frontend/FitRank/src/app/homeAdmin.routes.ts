import { Routes } from '@angular/router';
import { HomeAdminComponent } from './modules/homeAdmin/components/homeAdmin.component';
import { ResumenComponent } from './modules/homeAdmin/components/resumen/resumen.component';
import { SociosComponent } from './modules/homeAdmin/components/socios/socios.component';
import { ProfesoresComponent } from './modules/homeAdmin/components/profesores/profesores.component';
import { ClasesComponent } from './modules/homeAdmin/components/clases/clases.component';
import { RankingComponent } from './modules/homeAdmin/components/ranking/ranking.component';
import { AccesosComponent } from './modules/homeAdmin/components/accesos/accesos.component';
import { NotificacionesComponent } from './modules/homeAdmin/components/notificaciones/notificaciones.component';
import { AbandonoComponent } from './modules/homeAdmin/components/abandono/abandono.component';
import { RealtimeComponent } from './modules/homeAdmin/components/realtime/realtime.component';
import { AdminLayoutComponent } from './modules/homeAdmin/layout/admin-layout.component';



export const homeAdminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'resumen', pathMatch: 'full' },
      { path: 'resumen', component: ResumenComponent },
      { path: 'socios', component: SociosComponent },
      { path: 'profesores', component: ProfesoresComponent },
      { path: 'clases', component: ClasesComponent },
      { path: 'ranking', component: RankingComponent },
      { path: 'accesos', component: AccesosComponent },
      { path: 'notificaciones', component: NotificacionesComponent },
      { path: 'abandono', component: AbandonoComponent },
      { path: 'realtime', component: RealtimeComponent },
      {
        path: 'socios/:id',
        loadComponent: () => import('./../app/modules/homeAdmin/components/socios/socios-detalle/socio-detalle.component').then(m => m.SocioDetalleComponent)
      },
    ],
  },
];
