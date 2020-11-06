import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldsComponent } from './fields.component';

const routes: Routes = [{
  path: '',
  component: FieldsComponent,
  children: []
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldsRoutingModule { }
