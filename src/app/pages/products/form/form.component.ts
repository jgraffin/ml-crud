import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NgxCurrencyDirective } from 'ngx-currency';
import { Product } from '../../../services/abstract-product.service';

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

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      id: [null],
      name: [null],
      thumb: [null],
      price: [null],
      status: [null],
      color: [null],
      quantity: [null],
      description: [null],
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

    console.log('filledForm', filledForm.characteristics?.screen);

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

  submitForm() {}
}
