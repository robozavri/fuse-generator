import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <%=nameSingularFUC%>RoutingModule } from './<%=nameSingularLC%>-routing.module';
import { <%=nameSingularFUC%>Component } from './<%=nameSingularLC%>.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [<%=nameSingularFUC%>Component],
  imports: [
    CommonModule,
    <%=nameSingularFUC%>RoutingModule,
    SharedModule,
  ],
  exports: [<%=nameSingularFUC%>Component]
})
export class <%=nameSingularFUC%>Module { }
