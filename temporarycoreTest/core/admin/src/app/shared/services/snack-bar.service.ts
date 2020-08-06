import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar,
  ) {}

  open(message) {
    this.snackBar.open(
      message,
      null,
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      }
    );
  }

}
