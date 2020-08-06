import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [CarsComponent],
  imports: [
    CommonModule,
    CarsRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  exports: [CarsComponent],
})
export class CarsModule { }
