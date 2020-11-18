import * as _ from 'lodash';


export class QuillEditorField {

  constructor(FieldsHelper) {
    this.FieldsHelper = FieldsHelper;
  }

  builder(key, nested = null) {
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
      <div>
        <label class="formLabel"> ${_.lowerCase(key)} </label>
        <quill-editor formControlName="${key}"></quill-editor>
      </div>
  `;
  }
}