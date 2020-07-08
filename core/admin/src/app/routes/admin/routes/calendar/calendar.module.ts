import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';

import { CalendarComponent } from './calendar.component';
import { CalendarEventFormDialogComponent } from './components/event-form/event-form.component';
import { ConfirmDeleteModalComponent } from 'app/shared/modals/confirm-delete/confirm-delete-modal.component';
import { SharedModule } from 'app/shared/shared.module';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CalendarRoutingModule } from './calendar-routing.module';
import { ConfirmUpdateComponent } from './components/confirm-update/confirm-update.component';


@NgModule({
  declarations: [
    CalendarComponent,
    CalendarEventFormDialogComponent,
    ConfirmUpdateComponent
  ],
  imports: [
    CalendarRoutingModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,
    SharedModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,

    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ColorPickerModule,
    FuseSharedModule,
    FuseConfirmDialogModule
  ],
  entryComponents: [
    CalendarEventFormDialogComponent,
    ConfirmDeleteModalComponent,
    ConfirmUpdateComponent,
  ],
  exports: [ConfirmUpdateComponent]
})
export class CalendarModule {
}
