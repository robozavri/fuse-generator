import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookModalComponent } from './modals/modal/book-modal.component';
import { FormComponent } from './form/form.component';
import { ConfirmDeleteModalComponent } from '../../../../../shared/modals/confirm-delete/confirm-delete-modal.component';
import { SharedModule as _SharedModule } from '../../../../../shared/shared.module';


@NgModule({
   imports: [
      CommonModule,
      _SharedModule,
   ],
   exports: [_SharedModule, FormComponent],
   declarations: [FormComponent, BookModalComponent],
   entryComponents: [BookModalComponent, ConfirmDeleteModalComponent],
})
export class SharedModule { }
