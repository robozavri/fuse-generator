import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminGuardService } from './admin-guard.service';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '../../../@fuse/components';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
    LayoutModule,

  ],
  declarations: [
    AdminComponent,
  ],
  providers: [
    AdminGuardService
  ],
})
export class AdminModule { }
