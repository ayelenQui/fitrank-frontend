import { Routes } from "@angular/router";
import { LogrosCrearComponent } from "./pages/logros-crear-component/logros-crear-component";
import { LogrosListarComponent } from "./pages/logros-listar-component/logros-listar-component";

export const logrosRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path:'',
                component: LogrosListarComponent
            },
            {
                path: 'crear',
                component: LogrosCrearComponent
            },
        ]
    }
]