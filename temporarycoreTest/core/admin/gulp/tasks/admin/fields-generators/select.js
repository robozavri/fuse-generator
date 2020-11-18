import * as _ from 'lodash';
import { plural } from '../../../helpers';

export class SelectField {

  constructor(FieldsHelper, selectFields) {
    this.FieldsHelper = FieldsHelper;
    this.selectFields = selectFields;
  }

  builder(key, nested = null) {
    const selectType = this.selectFields[key].selectType === 'single' ? "''" : '[]';
    return {
      formComponentClassOnInitBodyArea: this.FieldsHelper.buildCheckFormElementEmpty(key, nested, selectType),
      emptyObjectsForOpenModal:  this.FieldsHelper.buildForModalEmpty(key,selectType),
      formComponentFormGroupArea: this.buildFormGroup(key, nested),
      formComponentHtmlArea: this.buildHtml(key),
      formComponentClassPropertiesArea: this.generateSelectArray(key)
    }
  }

  buildFormGroup(key, nested = null) {
    if (nested === null) {
      nested = key;
    } else {
      nested += key;
    }
    if (this.selectFields[key].selectType === 'single') {
      return `
      ${key}: [this.formData.${nested} || ''],`;
    }

    return `
      ${key}: [this.formData.${nested} || []],`;  
  }

  buildHtml(key) {
    const pluralName = plural(key);
    const multiple = this.selectFields[key].selectType === 'multiple' ? 'multiple': '';

    return `
      <mat-form-field *ngIf="${pluralName}" fxFlex="100">
        <mat-label> ${_.lowerCase(key)} </mat-label>
        <mat-select formControlName="${key}" ${multiple}>
          <mat-option *ngFor="let item of ${pluralName}" [value]="item">{{ item }}</mat-option>
        </mat-select>
      </mat-form-field>
  `;
  }

  generateSelectArray(key) {
    let template = '';
    this.selectFields[key].values.map( (value) => {
      template += `'${value}', `;
    });
    return `

    ${ plural(key) } = [${template}];`;
  }
}