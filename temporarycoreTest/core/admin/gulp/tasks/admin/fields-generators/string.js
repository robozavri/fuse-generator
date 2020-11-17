import * as _ from 'lodash';

export class StringField {

  constructor(FieldsHelper) {
    this.FieldsHelper = FieldsHelper;
  }

  stringBuilder(key, nested = null) { 
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
      ${key}: [this.formData.${nested} || ''],`;
  }
  
  buildHtml(key) {
    return `
      <div fxLayout="row" fxLayoutAlign="space-between">
        <mat-form-field appearance="outline" floatLabel="always" fxFlex="100">
          <mat-label> ${_.lowerCase(key)} </mat-label>
          <input matInput placeholder="${_.lowerCase(key)}" formControlName="${key}">
        </mat-form-field>
      </div>
  `;
  }
}