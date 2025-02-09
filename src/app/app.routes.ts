import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/products/products.routes').then(
            (m) => m.productsRoutes
          ),
      },
      {
        path: 'error/404',
        loadComponent: () =>
          import('./pages/error/404/404.component').then(
            (m) => m.FourZeroFourComponent
          ),
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'error/404',
  },
];
