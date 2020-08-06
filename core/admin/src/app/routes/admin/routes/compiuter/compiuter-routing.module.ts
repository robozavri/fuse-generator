import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompiuterComponent } from './compiuter.component';

const routes: Routes = [
  {
    path: '',
    component: CompiuterComponent,
    children: [],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompiuterRoutingModule { }
