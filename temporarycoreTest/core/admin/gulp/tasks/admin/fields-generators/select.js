import * as _ from 'lodash';
import { 
  buildCheckFormElementEmpty,
  buildForModalEmpty
} from '../fields-helper';
import { selectFields } from '../../fields';
import { plural } from '../../../helpers';

export function selectBuilder(key, nested = null) {
  const selectType = selectFields[key].selectType === 'single' ? "''" : '[]';
  return {
    formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(key, nested, selectType),
    emptyObjectsForOpenModal:  buildForModalEmpty(key,selectType),
    formComponentFormGroupArea: buildFormGroup(key, nested),
    formComponentHtmlArea: buildHtml(key),
    formComponentClassPropertiesArea: generateSelectArray(key)
  }
}

function buildFormGroup(key, nested = null) {
  if (nested === null) {
    nested = key;
  } else {
    nested += key;
  }
  if (selectFields[key].selectType === 'single') {
    return `
    ${key}: [this.formData.${nested} || ''],`;
  }

  return `
    ${key}: [this.formData.${nested} || []],`;  
}

function buildHtml(key) {
  const pluralName = plural(key);
  const multiple = selectFields[key].selectType === 'multiple' ? 'multiple': '';

  return `
    <mat-form-field *ngIf="${pluralName}" fxFlex="100">
      <mat-label> ${_.lowerCase(key)} </mat-label>
      <mat-select formControlName="${key}" ${multiple}>
        <mat-option *ngFor="let item of ${pluralName}" [value]="item">{{ item }}</mat-option>
      </mat-select>
    </mat-form-field>
`;
}

function generateSelectArray(key) {
  let template = '';
  selectFields[key].values.map( (value) => {
    template += `'${value}', `;
  });
  return `

  ${ plural(key) } = [${template}];`;
}