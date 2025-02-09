import { Routes } from '@angular/router';

export const productsRoutes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./products.component').then((m) => m.ProductsComponent),
  },
];
