import * as _ from 'lodash';
import { 
  buildMultilingual,
  buildCheckFormElementEmpty,
  buildForModalEmpty
} from '../fields-helper';
import { availableLangs } from '../../fields';

export function multilingualSchemaBuilder(key, nested = null) {
  return {
    formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(key, nested, '{}'),
    emptyObjectsForOpenModal: buildForModalEmpty(key, '{}'),
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
    ${key}: this.fb.group({
        ${buildMultilingual(nested)}
    }),`;
}

function buildHtml(key) {
  let template = '';
  let fxFlexSize = 100;
  switch(availableLangs.length) {
    case 1: fxFlexSize = 100;
      break;
    case 2: fxFlexSize = 50;
      break;
    case 3: fxFlexSize = 30;
      break;
    case 4: fxFlexSize = 15;
      break;
  }

  availableLangs.map((lang) => {
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
