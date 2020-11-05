import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleComponent } from './module.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [ModuleComponent],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    SharedModule,
  ],
  exports: [ModuleComponent]
})
export class ModuleModule { }
