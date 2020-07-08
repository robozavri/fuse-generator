import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { fuseAnimations } from '@fuse/animations';

import { CalendarEventFormDialogComponent } from './components/event-form/event-form.component';
import { CalendarApiService } from 'app/shared/http/calendar-api.service';
import { ConfirmDeleteModalComponent } from 'app/shared/modals/confirm-delete/confirm-delete-modal.component';
import { filter, switchMap } from 'rxjs/operators';
import { CalendarEventModel } from 'app/shared/models/event.model';
import { ConfirmUpdateComponent } from './components/confirm-update/confirm-update.component';
import { SnackBarService } from 'app/shared/services/snack-bar.service';

import * as moment from 'moment';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CalendarComponent implements OnInit {
  actions: CalendarEventAction[];
  activeDayIsOpen: boolean;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  dialogRef: any;
  events: CalendarEventModel[];
  refresh: Subject<any> = new Subject();
  selectedDay: any;
  view: string;
  viewDate: Date;

  constructor(
    private _matDialog: MatDialog,
    private calendarApiservice: CalendarApiService,
    private snackBarService: SnackBarService,
  ) {
    this.view = 'month';
    this.viewDate = new Date();
    this.activeDayIsOpen = true;
    this.selectedDay = { date: startOfDay(new Date()) };

    this.actions = [
      {
        label: '<i class="material-icons s-16">edit</i>',
        onClick: ({ event }: { event: CalendarEventModel }): void => {
          this.editEvent('edit', event);
        }
      },
      {
        label: '<i class="material-icons s-16">delete</i>',
        onClick: ({ event }: { event: CalendarEventModel }): void => {
          this.deleteEvent(event);
        }
      }
    ];

    this.setEvents();
  }

  ngOnInit() {

    this.refresh.subscribe(updateDB => {
      if (updateDB) {
        this.setEvents();
      }
    });
  }

  setEvents(): void {
    this.calendarApiservice.getByQuery({ all: true }).subscribe(data => {
      this.events = data.items.map(item => {
        item.actions = this.actions;
        return new CalendarEventModel(item);
      })
    })
  }

  beforeMonthViewRender({ header, body }): void {
    const _selectedDay = body.find((_day) => {
      return _day.date.getTime() === this.selectedDay.date.getTime();
    });

    if (_selectedDay) {

      _selectedDay.cssClass = 'cal-selected';
    }

  }

  dayClicked(day: CalendarMonthViewDay): void {
    const date: Date = day.date;
    const events: CalendarEventModel[] = day.events;

    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      }
      else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
    this.selectedDay = day;
    this.refresh.next();
  }

  hourClicked(event) {
    console.log('hour clicked', event);

    const newEvent: CalendarEventModel = {
      start: event.date,
      color: {
        primary: '#039be5',
        secondary: '#D1E8FF',
      },
      actions: this.actions,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      title: 'new Event',
    }
    this.events.push(newEvent);
    this.refresh.next(true);

    console.log('all event', this.events);
  }


  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {

    let startTime = `${newStart.getHours() < 10 ? '0' + newStart.getHours() : newStart.getHours()}:${newStart.getMinutes() < 10 ? '0' + newStart.getMinutes() : newStart.getMinutes()}`;

    let endTime = `${newEnd.getHours() < 10 ? '0' + newEnd.getHours() : newEnd.getHours()}:${newEnd.getMinutes() < 10 ? '0' + newEnd.getMinutes() : newEnd.getMinutes()}`;

    let eventValue = {
      ...event,
      start: newStart,
      end: newEnd,
      startTime: startTime,
      endTime: endTime,
    }
    this.updateEventDate(eventValue);
    this.refresh.next(true);
  }

  updateEventDate(event) {
    this._matDialog.open(ConfirmUpdateComponent, { data: event }).afterClosed().subscribe((modalData) => {
      // update event if modalData returns true
      if (modalData) {
        this.calendarApiservice.update(event)
          .subscribe(
            () => this.snackBarService.open('Updated Successfully'),
            () => this.snackBarService.open('Update Failed'),
            () => { this.refresh.next(true); }
          );
      }
    })
  }


  deleteEvent(data): void {
    this._matDialog
      .open(ConfirmDeleteModalComponent, { data })
      .afterClosed()
      .pipe(
        filter(r => r),
        switchMap(() => this.calendarApiservice.delete(data._id)),
      )
      .subscribe(result => {
        if (result) {
          const eventIndex = this.events.indexOf(data);
          this.events.splice(eventIndex, 1);
          this.refresh.next(true);
        }
        this.confirmDialogRef = null;
      });
  }


  editEvent(action: string, event: CalendarEventModel): void {
    const eventIndex = this.events.indexOf(event);
    this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
      panelClass: 'event-form-dialog',
      data: {
        event: event,
        action: action
      }
    });

    this.dialogRef.afterClosed().subscribe(response => {
      if (!response) {
        return;
      }

      this.calendarApiservice.update(response[1].value)
        .subscribe(
          () => this.snackBarService.open('Updated Successfully'),
          () => this.snackBarService.open('Update Failed'),
        );

      const actionType: string = response[0];
      const formData: FormGroup = response[1];
      switch (actionType) {

        case 'save':
          this.events[eventIndex] = Object.assign(this.events[eventIndex], formData.getRawValue());
          this.refresh.next(true);
          break;

        case 'delete':
          this.deleteEvent(event);
          break;
      }
    })
  }

  addEvent(): void {
    this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
      panelClass: 'event-form-dialog',
      data: {
        action: 'new',
        date: this.selectedDay.date
      }
    });
    this.dialogRef.afterClosed()
      .subscribe((response: FormGroup) => {

        if (!response) {
          return;
        }
        const newEvent = response.getRawValue();
        newEvent.actions = this.actions;
        console.log('newEvent', newEvent);

        this.calendarApiservice.create(response.value).subscribe(() => {
          this.events.push(newEvent);
          this.refresh.next(true);
        })
      });
  }
}


