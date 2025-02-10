import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../services/abstract-product.service';
import { ProductService } from '../../../services/product.service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormComponent, NgIf],
  template: `<app-form *ngIf="data" [filledForm]="data"></app-form>`,
})
export class EditComponent {
  data!: Product;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.productService
      .getProductById(this.id)
      .subscribe((data) => (this.data = data)),
      (error: { message: string }) =>
        console.error('Error fetching product:', error);
  }
}
