import { Routes } from '@angular/router';
import { HomeAdminComponent } from '../home-admin.component';

export const homeAdminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'natural',
        loadComponent: () =>
          import('./../screens/places-natural/places-natural.component').then(
            (m) => m.PlacesNaturalComponent
          ),
      },
      {
        path: 'tourist',
        loadComponent: () =>
          import('./../screens/places-tourist/places-tourist.component').then(
            (m) => m.PlacesTouristComponent
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        component: HomeAdminComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ],
  },
];
