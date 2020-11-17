import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { <%=namePluralFUC%>RoutingModule } from './<%=pluralFileName%>-routing.module';
import { <%=namePluralFUC%>Component } from './<%=pluralFileName%>.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [<%=namePluralFUC%>Component],
  imports: [
    CommonModule,
    <%=namePluralFUC%>RoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  exports: [],
})
export class <%=namePluralFUC%>Module { }
