import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogCategoriesRoutingModule } from './blogcategories-routing.module';
import { BlogCategoriesComponent } from './blogcategories.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [BlogCategoriesComponent],
  imports: [
    CommonModule,
    BlogCategoriesRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  exports: [],
})
export class BlogCategoriesModule { }
