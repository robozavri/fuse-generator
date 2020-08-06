import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompiutersComponent } from './compiuters.component';

const routes: Routes = [{
  path: '',
  component: CompiutersComponent,
  children: [],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompiutersRoutingModule { }
