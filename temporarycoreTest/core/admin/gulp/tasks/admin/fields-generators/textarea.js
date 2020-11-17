import * as _ from 'lodash';


export class TextareaField {

  constructor(FieldsHelper) {
    this.FieldsHelper = FieldsHelper;
  }

  textareaBuilder(key, nested = null) {
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
        <mat-form-field appearance="outline" floatLabel="always" class="w-100-p">
          <mat-label> ${_.lowerCase(key)} </mat-label>
          <textarea matInput placeholder="${_.lowerCase(key)}" formControlName="${key}" rows="5">
          </textarea>
        </mat-form-field>
      </div>
  `;
  }
}
