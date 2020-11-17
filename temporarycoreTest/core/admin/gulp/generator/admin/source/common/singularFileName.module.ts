import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { <%=nameSingularUC%>RoutingModule } from './<%=singularFileName%>-routing.module';
import { <%=nameSingularUC%>Component } from './<%=singularFileName%>.component';

@NgModule({
  declarations: [<%=nameSingularUC%>Component],
  imports: [
    CommonModule,
    <%=nameSingularUC%>RoutingModule,
    SharedModule,
  ],
  exports: [<%=nameSingularUC%>Component]
})
export class <%=namePluralFUC%>Module { }
