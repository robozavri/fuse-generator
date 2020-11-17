import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule as _SharedModule } from '../../../../../shared/shared.module';
import { BasicInfoComponent } from './baisc-info/basic-info.component';
/** Insert additonal components here */

@NgModule({
  declarations: [BasicInfoComponent],
  imports: [
    CommonModule,
    _SharedModule,
  ],
  exports: [BasicInfoComponent, _SharedModule]
})
export class SharedModule { }
