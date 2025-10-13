import { Routes } from '@angular/router';
import { Home } from './public/home/home';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'logros',
        loadChildren: () => import('./modules/logros/logros.routes').then(r => r.logrosRoutes)
    },
    {
        path: '**',
        redirectTo: ''
    }
]