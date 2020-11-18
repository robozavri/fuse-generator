import * as _ from 'lodash';


export class MultilingualTextareaField {

  constructor(FieldsHelper, availableLangs) {
    this.FieldsHelper = FieldsHelper;
    this.availableLangs = availableLangs;
  }
 

  builder(key, nested = null) {
    return {
      formComponentClassOnInitBodyArea: this.FieldsHelper.buildCheckFormElementEmpty(key, nested, '{}'),
      emptyObjectsForOpenModal: this.FieldsHelper.buildForModalEmpty(key, '{}'),
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
          ${this.FieldsHelper.buildMultilingual(nested)}
      }),`;
  }

  buildHtml(key) {
    let template = '';
    this.availableLangs.map((lang) => {
      template +=
        `<mat-form-field appearance="outline" floatLabel="always" class="w-100-p">
          <mat-label> ${_.lowerCase(key)} ${lang} </mat-label>
          <textarea matInput placeholder="${_.lowerCase(key)} ${lang}" formControlName="${lang}" rows="5">
          </textarea>
        </mat-form-field>
        `;
    });
    return `
      <div formGroupName='${key}'>
        ${template}
      </div>
  `;
  }
}