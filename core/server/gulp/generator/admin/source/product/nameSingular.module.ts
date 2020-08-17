import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <%=className%>RoutingModule } from './<%=fileName%>-routing.module';
import { <%=className%>Component } from './<%=fileName%>.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [<%=className%>Component],
  imports: [
    CommonModule,
    <%=className%>RoutingModule,
    SharedModule,
  ],
  exports: [<%=className%>Component]
})
export class <%=className%>Module { }
