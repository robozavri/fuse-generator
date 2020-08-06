import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleModalComponent } from './modals/article/article-modal.component';
import { FormComponent } from './form/form.component';
import { ConfirmDeleteModalComponent } from '../../../../../shared/modals/confirm-delete/confirm-delete-modal.component';
import { SharedModule as _SharedModule } from '../../../../../shared/shared.module';


@NgModule({
   imports: [
      CommonModule,
      _SharedModule,
   ],
   exports: [_SharedModule, FormComponent],
   declarations: [FormComponent, ArticleModalComponent],
   entryComponents: [ArticleModalComponent, ConfirmDeleteModalComponent],
})
export class SharedModule { }