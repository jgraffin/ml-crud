import { Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ProductsComponent } from './products.component';

export const productsRoutes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/edit/:id',
    component: EditComponent,
  },
];
