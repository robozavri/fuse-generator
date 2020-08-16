import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogCategoriesComponent } from './blogcategories.component';

const routes: Routes = [{
  path: '',
  component: BlogCategoriesComponent,
  children: []
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogCategoriesRoutingModule { }
