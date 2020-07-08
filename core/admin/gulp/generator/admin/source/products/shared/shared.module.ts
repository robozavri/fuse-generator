import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule as _SharedModule } from '../../../../../shared/shared.module';
import { ConfirmDeleteModalComponent } from '../../../../../shared/modals/confirm-delete/confirm-delete-modal.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    _SharedModule,
  ],
  exports: [_SharedModule],
  entryComponents: [ConfirmDeleteModalComponent],
})
export class SharedModule { }
