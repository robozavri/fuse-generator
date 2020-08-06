import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompiutersRoutingModule } from './compiuters-routing.module';
import { CompiutersComponent } from './compiuters.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [CompiutersComponent],
  imports: [
    CommonModule,
    CompiutersRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  exports: [CompiutersComponent],
})
export class CompiutersModule { }
