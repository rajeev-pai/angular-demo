import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface ModalData {
  title: string;
  description: string;
  deleteFunc?: () => void;
}

@Component({
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.scss']
})
export class DeleteConfirmationModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private dialogRef: MatDialogRef<DeleteConfirmationModalComponent>,
  ) { }

  onConfirm() {
    if (this.data.deleteFunc) {
      this.data.deleteFunc();
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
