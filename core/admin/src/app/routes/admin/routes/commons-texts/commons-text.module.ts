import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonsTextRoutingModule } from './commons-text-routing.module';
import { CommonsTextComponent } from './commons-text.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [CommonsTextComponent],
  imports: [
    CommonModule,
    CommonsTextRoutingModule,
    SharedModule,
  ],
  exports: [CommonsTextComponent]
})
export class CommonsTextsModule { }
