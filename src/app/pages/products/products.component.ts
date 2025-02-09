import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator'; // Optional for pagination
import { MatSortModule } from '@angular/material/sort'; // Optional for sorting
import { MatTableModule } from '@angular/material/table'; // Import the correct module

import { MatTableDataSource } from '@angular/material/table';

export interface ProductElement {
  id: string;
  name: string;
  price: number;
  status: boolean;
  color: string;
  quantity: number;
}

const ELEMENT_DATA: ProductElement[] = [
  {
    id: '432432',
    name: 'Hydrogen',
    price: 1.0079,
    status: false,
    color: 'Cinza Espacial',
    quantity: 1,
  },
  {
    id: '432432',
    name: 'Helium',
    price: 4.0026,
    status: true,
    color: 'Cinza',
    quantity: 2,
  },
  {
    id: '432432',
    name: 'Lithium',
    price: 6.941,
    status: false,
    color: 'Cinza',
    quantity: 3,
  },
  {
    id: '432432',
    name: 'Beryllium',
    price: 9.0122,
    status: true,
    color: 'Cinza',
    quantity: 4,
  },
  {
    id: '432432',
    name: 'Boron',
    price: 10.811,
    status: true,
    color: 'Cinza',
    quantity: 5,
  },
  {
    id: '432432',
    name: 'Carbon',
    price: 12.0107,
    status: false,
    color: 'Cinza',
    quantity: 6,
  },
];

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductsComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'status',
    'color',
    'quantity',
  ];
  dataSource = new MatTableDataSource<any>([]);

  ngOnInit() {
    this.dataSource.data = [
      {
        id: 1,
        name: 'MacBook Pro',
        price: '$2000',
        status: 'Available',
        color: 'Space Gray',
        quantity: 10,
      },
      {
        id: 2,
        name: 'iMac',
        price: '$1500',
        status: 'Out of Stock',
        color: 'Silver',
        quantity: 5,
      },
    ];
  }
}
