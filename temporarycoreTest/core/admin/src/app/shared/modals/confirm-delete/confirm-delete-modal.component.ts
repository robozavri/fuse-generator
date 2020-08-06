import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

}
