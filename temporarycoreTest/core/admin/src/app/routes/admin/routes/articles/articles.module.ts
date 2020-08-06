import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  exports: [],
})
export class ArticlesModule { }
