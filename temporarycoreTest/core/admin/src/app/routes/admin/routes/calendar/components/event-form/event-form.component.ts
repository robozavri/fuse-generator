import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatColors } from '@fuse/mat-colors';
import { CalendarEventModel } from 'app/shared/models/event.model';


@Component({
    selector: 'calendar-event-form-dialog',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss'],
    encapsulation: ViewEncapsulation.None,

})

export class CalendarEventFormDialogComponent implements OnInit {
    action: string;
    event: CalendarEventModel;
    eventForm: FormGroup;
    dialogTitle: string;
    draggable: Boolean;
    presetColors = MatColors.presets;

    /**
     * @param {MatDialogRef<CalendarEventFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<CalendarEventFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder
    ) {
        this.event = _data.event;
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = this.event.title;
        }
        else {
            this.dialogTitle = 'New Event';
            this.event = new CalendarEventModel({
                start: _data.date,
                end: _data.date,
                draggable: _data.draggable,
            });
        }

        this.eventForm = this.createEventForm();
    }

    ngOnInit() {
        this.eventForm.controls.startTime.valueChanges.subscribe(value => {
            this.startTimeChange(value);
        })
        this.eventForm.controls.endTime.valueChanges.subscribe(value => {
            this.endTimeChange(value);
        })
    }
    /**
     * Create the event form
     *
     * @returns {FormGroup}
     */
    createEventForm(): FormGroup {
        if (this.event.startTime) {
            let time = this.event.startTime.split(":").map(function (item) {
                return parseInt(item, 10);
            });
            var startDateVal = new Date(this.event.start.getFullYear(), this.event.start.getMonth(), this.event.start.getDate(), time[0], time[1])
        }

        if (this.event.endTime) {
            let time = this.event.endTime.split(":").map(function (item) {
                return parseInt(item, 10);
            });
            var endDateVal = new Date(this.event.end.getFullYear(), this.event.end.getMonth(), this.event.end.getDate(), time[0], time[1])
        }

        return this.fb.group({
            _id: this.event._id,
            title: this.event.title,
            start: startDateVal || this.event.start,
            end: endDateVal || this.event.end,
            color: this.fb.group({
                primary: this.event.color.primary,
            }),
            meta: this.fb.group({
                notes: this.event.meta.notes
            }),
            draggable: this.event.draggable || false,
            startTime: this.event.startTime || '',
            endTime: this.event.endTime || '',
        });
    }

    startTimeChange(time) {
        let start = this.eventForm.get('start').value;
        var starthourAndMinute = time.split(":").map(function (item) {
            return parseInt(item, 10);
        });
        let newTime = new Date(start.getFullYear(), start.getMonth(), start.getDate(), starthourAndMinute[0], starthourAndMinute[1])
        this.eventForm.get('start').setValue(newTime);
    }

    endTimeChange(time) {
        let end = this.eventForm.get('end').value;
        var hourAndMinute = time.split(":").map(function (item) {
            return parseInt(item, 10);
        });
        let newTime = new Date(end.getFullYear(), end.getMonth(), end.getDate(), hourAndMinute[0], hourAndMinute[1])
        this.eventForm.get('end').setValue(newTime);
    }
}