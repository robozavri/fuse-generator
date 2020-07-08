import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './authors.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  exports: [AuthorsComponent],
})
export class AuthorsModule { }
