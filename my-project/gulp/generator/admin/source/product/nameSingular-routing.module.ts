import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { <%=nameSingularFUC%>Component } from './<%=nameSingularLC%>.component';

const routes: Routes = [
  {
    path: '',
    component: <%=nameSingularFUC%>Component,
    children: [],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%=nameSingularFUC%>RoutingModule { }
