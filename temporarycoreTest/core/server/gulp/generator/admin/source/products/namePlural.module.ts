import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <%=namePluralFUC%>RoutingModule } from './<%=namePluralLC%>-routing.module';
import { <%=namePluralFUC%>Component } from './<%=namePluralLC%>.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [<%=namePluralFUC%>Component],
  imports: [
    CommonModule,
    <%=namePluralFUC%>RoutingModule,
    ComponentsModule,
    SharedModule
  ],
  exports: [<%=namePluralFUC%>Component],
})
export class <%=namePluralFUC%>Module { }
