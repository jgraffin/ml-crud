import { CommonModule } from '@angular/common';
import { Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';

import { Observable } from 'rxjs';
import { Product } from '../../services/abstract-product.service';
import { ProductService } from '../../services/product.service';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductsComponent {
  displayedColumns: string[] = [
    'id',
    'thumb',
    'name',
    'price',
    'status',
    'color',
    'quantity',
    'actions',
  ];

  products$!: Observable<Product[]>;

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }

  editProduct(event: Event) {
    console.log('event', event);
  }

  deleteProduct(event: Event) {
    console.log('event', event);
  }
}
