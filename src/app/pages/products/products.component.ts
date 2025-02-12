import { CommonModule } from '@angular/common';
import { Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AskDialogComponent } from '../../components/dialogs/ask-dialog/ask-dialog.component';
import { DeleteDialogComponent } from '../../components/dialogs/delete-dialog/delete-dialog.component';
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
  private router = inject(Router);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }

  editProduct(event: Event) {
    this.router.navigate(['products/edit', event]);
  }

  createProduct() {
    this.router.navigate(['products/create']);
  }

  deleteProduct(event: any) {
    const dialogRef = this.askDialog(event);
    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.productService.deleteProduct(event.id).subscribe();
        this.deletionDialog();
        this.ngOnInit();
      }
    });
  }

  askDialog(event: any) {
    return this.dialog.open(AskDialogComponent, {
      panelClass: 'custom-dialog',
      data: {
        message: `Deseja realmente excluir o produto ${event.name}?`,
        id: event.id,
      },
    });
  }

  deletionDialog() {
    return this.dialog.open(DeleteDialogComponent, {
      panelClass: 'custom-dialog',
      data: {
        message: 'Produto excluído com sucesso!',
      },
    });
  }
}
