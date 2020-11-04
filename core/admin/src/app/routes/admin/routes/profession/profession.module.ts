import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessionRoutingModule } from './profession-routing.module';
import { ProfessionComponent } from './profession.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [ProfessionComponent],
  imports: [
    CommonModule,
    ProfessionRoutingModule,
    SharedModule,
  ],
  exports: [ProfessionComponent]
})
export class ProfessionModule { }
