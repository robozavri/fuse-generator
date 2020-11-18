import * as _ from 'lodash';

export class MultilingualSchemaField {

  constructor(FieldsHelper, availableLangs) {
    this.FieldsHelper = FieldsHelper;
    this.availableLangs = availableLangs;
  }
 

  builder(key, nested = null) {
    return {
      formComponentClassOnInitBodyArea:  this.FieldsHelper.buildCheckFormElementEmpty(key, nested, '{}'),
      emptyObjectsForOpenModal:  this.FieldsHelper.buildForModalEmpty(key, '{}'),
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
      ${key}: this.fb.group({
          ${ this.FieldsHelper.buildMultilingual(nested)}
      }),`;
  }

  buildHtml(key) {
    let template = '';
    let fxFlexSize = 100;
    switch(this.availableLangs.length) {
      case 1: fxFlexSize = 100;
        break;
      case 2: fxFlexSize = 50;
        break;
      case 3: fxFlexSize = 30;
        break;
      case 4: fxFlexSize = 15;
        break;
    }

    this.availableLangs.map((lang) => {
      template += `
        <mat-form-field appearance="outline" floatLabel="always" fxFlex="${fxFlexSize}">
            <mat-label> ${_.lowerCase(key)} ${lang} </mat-label>
            <input matInput placeholder="${_.lowerCase(key)} ${lang}" formControlName="${lang}">
        </mat-form-field>
  `;
    });
    return `
      <div fxLayout="row" fxLayoutAlign="space-between" formGroupName='${key}'>
        ${template}
      </div>
  `;
  }
}