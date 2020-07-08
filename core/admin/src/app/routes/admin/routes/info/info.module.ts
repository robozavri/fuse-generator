import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ContactsComponent } from './components/contacts/contacts.component';

@NgModule({
  declarations: [
    InfoComponent, 
    ContactsComponent
  ],
  imports: [
    CommonModule,
    InfoRoutingModule,
    SharedModule,
  ],
  exports: [InfoComponent]
})
export class InfoModule { }
