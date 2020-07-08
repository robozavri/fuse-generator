import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const children: Routes = [
  {
    path: 'admin',
    loadChildren: 'app/routes/admin/admin.module#AdminModule'
  },
  {
    path: 'admin/login',
    loadChildren: 'app/routes/login/login.module#LoginModule'
  }
];

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'admin', 
    pathMatch: 'full'
  },
  { 
    path: '',
    children: children
  },
  { 
    path: '**',
    redirectTo: 'admin'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}