import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-update',
  templateUrl: './confirm-update.component.html',
  styleUrls: ['./confirm-update.component.scss']
})
export class ConfirmUpdateComponent implements OnInit {

  constructor(
    public matDialogRef: MatDialogRef<ConfirmUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) { }

  ngOnInit() {

  }
  cancelUpdate() {
    this.matDialogRef.close();
  }
  confirmUpdate() {
    this.matDialogRef.close(true);
  }
}
