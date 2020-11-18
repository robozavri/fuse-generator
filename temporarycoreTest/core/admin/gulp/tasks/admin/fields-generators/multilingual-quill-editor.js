import * as _ from 'lodash';


export class MultilingualQuillEditorField {

  constructor(FieldsHelper, availableLangs) {
    this.FieldsHelper = FieldsHelper;
    this.availableLangs = availableLangs;
  }
 
  Builder(key, nested) {
    return {
      formComponentClassOnInitBodyArea: this.FieldsHelper.buildCheckFormElementEmpty(key, nested, '{}'),
      emptyObjectsForOpenModal:  this.FieldsHelper.buildForModalEmpty(key, '{}'),
      formComponentFormGroupArea:  this.buildFormGroup(key, nested),
      formComponentHtmlArea:  this.buildHtml(key),
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
    let templete = '';
    this.availableLangs.map((lang) => {
      templete +=  `
        <label class="formLabel">${_.kebabCase(key)} ${lang}</label>
        <quill-editor formControlName="${lang}"></quill-editor>
  `;
    });
    return `
      <div formGroupName='${key}'>
          ${templete}
      </div>
  `;
  }
}