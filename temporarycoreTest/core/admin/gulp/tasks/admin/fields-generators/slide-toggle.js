import * as _ from 'lodash';


export class SlideToggleField {

  constructor(FieldsHelper) {
    this.FieldsHelper = FieldsHelper;
  }

  builder(key, nested = null) {
    return {
      formComponentClassOnInitBodyArea: this.buildCheckEmptyObj(key, nested),
      emptyObjectsForOpenModal: this.FieldsHelper.buildForModalEmpty(key,"false"),
      formComponentFormGroupArea: this.buildFormGroup(key, nested),
      formComponentHtmlArea: this.buildHtml(key),
    }
  }

  buildCheckEmptyObj(key, nested = null) {
    if (nested === null) {
      nested = key;
    } else {
      nested += key;
    }
    return `
      this.formData.${nested} = this.formData.${nested} === undefined ? false : this.formData.${nested};`;
  }


  buildFormGroup(key, nested) {
    if (nested === null) {
      nested = key;
    } else {
      nested += key;
    }
    return  `
      ${key}: [this.formData.${nested}],`;
  }

  buildHtml(key) {
    return `
      <div class="custom-slide-toggle">
        <mat-slide-toggle formControlName="${key}"> ${_.kebabCase(key)} </mat-slide-toggle>
      </div>
  `;
  }
}