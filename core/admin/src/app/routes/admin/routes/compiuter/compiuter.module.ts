import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompiuterRoutingModule } from './compiuter-routing.module';
import { CompiuterComponent } from './compiuter.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [CompiuterComponent],
  imports: [
    CommonModule,
    CompiuterRoutingModule,
    SharedModule,
  ],
  exports: [CompiuterComponent]
})
export class CompiuterModule { }
