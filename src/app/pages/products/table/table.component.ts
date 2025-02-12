import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Product } from '../../../services/abstract-product.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    CommonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() data!: Observable<Product[]>;
  @Input() displayedColumns: string[] = [];

  @Output() handleEdit = new EventEmitter();
  @Output() handleDelete = new EventEmitter();

  editProduct(id: string) {
    this.handleEdit.emit(id);
  }

  deleteProduct(product: Product) {
    this.handleDelete.emit(product);
  }
}
