import { Routes } from '@angular/router';
import { Home } from './public/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home
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
    loadChildren: () =>
      import('./modules/socios/mis-logros/mis-logros.routes').then(r => r.misLogrosRoutes)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
