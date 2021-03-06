import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters/filters.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [FiltersComponent, ListComponent, HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
  ],
  exports: [FiltersComponent, ListComponent, DragDropModule, HeaderComponent]
})
export class ComponentsModule { }
