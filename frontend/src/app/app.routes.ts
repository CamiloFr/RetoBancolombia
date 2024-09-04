import { Routes } from "@angular/router";

export const principalRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./screens/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./screens/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'admin',
        loadChildren: () => import('./screens/home-admin/routes/home-admin.routes').then(m => m.homeAdminRoutes),
    },
]