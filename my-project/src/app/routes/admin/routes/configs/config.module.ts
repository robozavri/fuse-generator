import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    SharedModule,
  ],
  exports: [ConfigComponent]
})
export class ConfigsModule { }
