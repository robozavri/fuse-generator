import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonsTextComponent } from './commons-text.component';

const routes: Routes = [
  {
    path: '',
    component: CommonsTextComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonsTextRoutingModule { }
