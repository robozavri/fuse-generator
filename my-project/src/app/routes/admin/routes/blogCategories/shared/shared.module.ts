import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCategoryModalComponent } from './modals/modal/blog-category-modal.component';
import { FormComponent } from './form/form.component';
import { ConfirmDeleteModalComponent } from '../../../../../shared/modals/confirm-delete/confirm-delete-modal.component';
import { SharedModule as _SharedModule } from '../../../../../shared/shared.module';


@NgModule({
   imports: [
      CommonModule,
      _SharedModule,
   ],
   exports: [_SharedModule, FormComponent],
   declarations: [FormComponent, BlogCategoryModalComponent],
   entryComponents: [BlogCategoryModalComponent, ConfirmDeleteModalComponent],
})
export class SharedModule { }
