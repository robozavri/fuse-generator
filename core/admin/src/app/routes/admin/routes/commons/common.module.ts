import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonRoutingModule } from './common-routing.module';
import { CommonComponent } from './common.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [CommonComponent],
  imports: [
    CommonModule,
    CommonRoutingModule,
    SharedModule,
  ],
  exports: [CommonComponent]
})
export class CommonsModule { }
