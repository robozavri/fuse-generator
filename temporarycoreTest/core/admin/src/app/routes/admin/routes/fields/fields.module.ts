import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldsRoutingModule } from './fields-routing.module';
import { FieldsComponent } from './fields.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [FieldsComponent],
  imports: [
    CommonModule,
    FieldsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  exports: [],
})
export class FieldsModule { }
