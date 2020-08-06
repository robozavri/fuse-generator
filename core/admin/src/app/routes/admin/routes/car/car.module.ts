import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { CarComponent } from './car.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [CarComponent],
  imports: [
    CommonModule,
    CarRoutingModule,
    SharedModule,
  ],
  exports: [CarComponent]
})
export class CarModule { }
