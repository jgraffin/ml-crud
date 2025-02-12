import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NgxCurrencyDirective } from 'ngx-currency';
import { EditDialogComponent } from '../../../components/dialogs/edit-dialog/edit-dialog.component';
import { Product } from '../../../services/abstract-product.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    JsonPipe,
    NgxCurrencyDirective,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  @Input() filledForm!: Product;

  formData!: FormGroup;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialog: MatDialog
  ) {
    this.formData = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      thumb: [null],
      price: [null, [Validators.required]],
      color: [null, [Validators.required]],
      quantity: [null],
      description: [null, [Validators.required]],
      characteristics: this.fb.group({
        memory: [null],
        screen: [null],
        batteryDuration: [null],
        resolution: [null],
        touchableScreen: [null],
      }),
    });
  }

  ngOnInit() {
    if (!this.filledForm) {
      return;
    }

    this.initializeFormData(this.filledForm);
  }

  initializeFormData(filledForm: Product) {
    if (!this.formData.get('characteristics')) {
      this.formData.setControl(
        'characteristics',
        this.fb.group({
          memory: [null],
          screen: [null],
          batteryDuration: [null],
          resolution: [null],
          touchableScreen: [null],
        })
      );
    }

    this.formData.patchValue({
      id: filledForm.id,
      name: filledForm.name,
      thumb: filledForm.thumb,
      price: filledForm.price,
      color: filledForm.color,
      quantity: filledForm.quantity,
      description: filledForm.description,
    });

    this.formData.get('characteristics')?.patchValue({
      memory: filledForm.characteristics?.memory || null,
      screen: filledForm.characteristics?.screen || null,
      batteryDuration: filledForm.characteristics?.batteryDuration || null,
      resolution: filledForm.characteristics?.resolution || null,
      touchableScreen:
        String(filledForm.characteristics?.touchableScreen) || null,
    });
  }

  closeForm() {
    history.back();
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  submitForm() {
    if (!this.formData.valid) {
      console.log('formData', this.formData.value);
      this.scrollToTop();
      return;
    }

    const isUpdate = !!this.filledForm;

    let formData: any = this.filledForm
      ? { ...this.filledForm, ...this.formData.value }
      : this.formData.value;

    this.sendData(formData, isUpdate);
  }

  sendData(formData: any, isUpdate: boolean) {
    if (isUpdate) {
      this.productService.updateProduct(formData.id, formData).subscribe(() => {
        const dialogRef = this.creationDialog(isUpdate);
        dialogRef.afterClosed().subscribe(() => {
          this.closeForm();
        });
      });
    } else {
      this.productService.createProduct(formData).subscribe(() => {
        const dialogRef = this.creationDialog(isUpdate);
        dialogRef.afterClosed().subscribe(() => {
          this.closeForm();
        });
      });
    }
  }

  creationDialog(isUpdate: boolean) {
    return this.dialog.open(EditDialogComponent, {
      panelClass: 'custom-dialog',
      data: {
        message: isUpdate
          ? 'Produto editado com sucesso!'
          : 'Produto criado com sucesso!',
      },
    });
  }
}
