import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResourceUrlPipe } from './pipes/resource-url.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangService } from './services/lang.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [ResourceUrlPipe],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ResourceUrlPipe,
    TranslateModule,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        LangService,
        TranslateService,
        CookieService,
      ]
    };
  }
}
