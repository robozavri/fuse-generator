import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters/filters.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FiltersComponent, ListComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [FiltersComponent, ListComponent],
})
export class ComponentsModule { }
