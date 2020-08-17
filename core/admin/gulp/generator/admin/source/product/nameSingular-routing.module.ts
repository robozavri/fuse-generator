import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { <%=className%>Component } from './<%=fileName%>.component';

const routes: Routes = [
  {
    path: '',
    component: <%=className%>Component,
    children: [],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%=className%>RoutingModule { }
