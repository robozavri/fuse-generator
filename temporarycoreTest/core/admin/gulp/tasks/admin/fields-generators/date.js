import * as _ from 'lodash';

export class DateField {

  constructor(FieldsHelper) {
    this.FieldsHelper = FieldsHelper;
  }

  dateBuilder(key, nested = null) {
    return {
      formComponentClassOnInitBodyArea: this.FieldsHelper.buildCheckFormElementEmpty(key, nested,"''"),
      emptyObjectsForOpenModal:  this.FieldsHelper.buildForModalEmpty(key,"''"),
      formComponentFormGroupArea: this.buildFormGroup(key, nested),
      formComponentHtmlArea: this.buildHtml(key),
    }
  }
  
  buildFormGroup(key, nested = null) {
    if (nested === null) {
      nested = key;
    } else {
      nested += key;
    }
    return `
      ${key}: [this.formData.${nested} || new Date()],`;
  }
  
  buildHtml(key) {
    return `
      <div fxLayout="row" fxLayoutAlign="space-between">
        <mat-form-field appearance="outline" fxFlex="100">
          <mat-label> ${_.lowerCase(key)} </mat-label>
          <input matInput [matDatepicker]="startDatePicker" formControlName="${key}">
          <mat-datepicker-toggle matSuffix [for]="startDatePicker"></mat-datepicker-toggle>
          <mat-datepicker #startDatePicker></mat-datepicker>
        </mat-form-field>
      </div>
  `;
  }
}

