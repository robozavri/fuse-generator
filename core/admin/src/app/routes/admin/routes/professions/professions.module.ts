import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessionsRoutingModule } from './professions-routing.module';
import { ProfessionsComponent } from './professions.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [ProfessionsComponent],
  imports: [
    CommonModule,
    ProfessionsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  exports: [],
})
export class ProfessionsModule { }
