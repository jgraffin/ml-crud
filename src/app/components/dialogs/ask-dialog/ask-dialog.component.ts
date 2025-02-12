import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-ask-dialog',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './ask-dialog.component.html',
  styleUrl: './ask-dialog.component.scss',
})
export class AskDialogComponent {
  id!: string;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; message: string; id: string }
  ) {
    this.id = data.id;
  }

  onDismiss() {
    this.dialogRef.close(false);
  }

  onProceed(id: string) {
    console.log('oiii', id);
    this.dialogRef.close(id);
  }
}
