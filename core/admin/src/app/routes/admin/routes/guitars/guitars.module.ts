import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuitarsRoutingModule } from './guitars-routing.module';
import { GuitarsComponent } from './guitars.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [GuitarsComponent],
  imports: [
    CommonModule,
    GuitarsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  exports: [],
})
export class GuitarsModule { }
