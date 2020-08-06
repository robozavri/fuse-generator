import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaComponent } from './meta.component';

const routes: Routes = [
  {
    path: '',
    component: MetaComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetaRoutingModule { }
