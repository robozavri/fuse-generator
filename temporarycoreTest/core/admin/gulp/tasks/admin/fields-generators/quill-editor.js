import * as _ from 'lodash';
import { 
  buildCheckFormElementEmpty,
  buildForModalEmpty
} from '../fields-helper';

export function quillEditorBuilder(key, nested = null) {
  return {
    formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(key, nested,"''"),
    emptyObjectsForOpenModal:  buildForModalEmpty(key,"''"),
    formComponentFormGroupArea: buildFormGroup(key, nested),
    formComponentHtmlArea: buildHtml(key),
  }
}

function buildFormGroup(key, nested = null) {
  if (nested === null) {
    nested = key;
  } else {
    nested += key;
  }
  return `
    ${key}: [this.formData.${nested} || ''],`;
}

function buildHtml(key) {
  return `
    <div>
      <label class="formLabel"> ${_.lowerCase(key)} </label>
      <quill-editor formControlName="${key}"></quill-editor>
    </div>
`;
}