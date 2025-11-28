import { Routes } from '@angular/router';
import { HomeAdminComponent } from './modules/homeAdmin/components/homeAdmin.component';
import { ResumenComponent } from './modules/homeAdmin/components/resumen/resumen.component';
import { SociosComponent } from './modules/homeAdmin/components/socios/socios.component';
import { ProfesoresComponent } from './modules/homeAdmin/components/profesores/profesores.component';

import { RankingComponent } from './modules/homeAdmin/components/ranking/ranking.component';
import { AccesosComponent } from './modules/homeAdmin/components/accesos/accesos.component';
import { NotificacionesComponent } from './modules/homeAdmin/components/notificaciones/notificaciones.component';
import { AbandonoComponent } from './modules/homeAdmin/components/abandono/abandono.component';

import { AdminLayoutComponent } from './modules/homeAdmin/layout/admin-layout.component';
import { PagosComponent } from './modules/homeAdmin/components/pagos/pagos.component';
import { ConfigGimnasioComponent } from './modules/homeAdmin/components/personalizacion/configuracion-gimnasio.component';
import { ReportesAdmin } from './modules/reportes/reportes-admin/reportes-admin';
import { LogrosAdminComponent } from "./modules/homeAdmin/components/logro/logros-admin.component"; 
import { AuthGuard } from './guards/auth.guards';


export const homeAdminRoutes: Routes = [

  {
    path: '',
    component: AdminLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'resumen', pathMatch: 'full' },
      { path: 'resumen', component: ResumenComponent },
      { path: 'socios', component: SociosComponent },
      { path: 'profesores', component: ProfesoresComponent },
      { path: 'pagos', component: PagosComponent },
      { path: 'ranking', component: RankingComponent },
      { path: 'accesos', component: AccesosComponent },
      { path: 'notificaciones', component: NotificacionesComponent },
      { path: 'abandono', component: AbandonoComponent },
      {
        path: 'configuracion-gimnasio',
        component: ConfigGimnasioComponent
      },
      { path: 'logros-admin', component: LogrosAdminComponent, canActivate: [AuthGuard] },
     
      { path: 'reportes-admin', component: ReportesAdmin, canActivate: [AuthGuard] },
      {
        path: 'socios/:id', canActivate: [AuthGuard],
        loadComponent: () => import('./../app/modules/homeAdmin/components/socios/socios-detalle/socio-detalle.component').then(m => m.SocioDetalleComponent)
      },
      {
        path: 'maquina-ejercicio', canActivate: [AuthGuard],
        loadComponent: () =>
          import('./../app/modules/homeAdmin/components/maquina-ejercicio/maquina-ejercicio.component')
            .then(m => m.MaquinaejercicioComponent)
      },

      {
        path: 'maquina/:id', canActivate: [AuthGuard],
        loadComponent: () =>
          import('@app/modules/maquina/maquina-detalle.component')
            .then(m => m.MaquinaDetalleComponent)
      },

      {
        path: 'logros-gimnasio', canActivate: [AuthGuard],
        loadComponent: () =>
          import('./modules/homeAdmin/components/logro/logros-admin.component')
            .then(m => m.LogrosAdminComponent)
      },

     
    ],
  },
];
