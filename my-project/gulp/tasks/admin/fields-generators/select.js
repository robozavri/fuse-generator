import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';
import { availableLangs, selectFields } from '../../fields';
import { plural } from '../../../helpers';



export function selectBuilder(key) {
    const selectType = selectFields[key].selectType === 'single' ? "''" : '[]';
    return {
        formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(key,selectType),
        emptyObjectsForOpenModal:  buildForModalEmpty(key,selectType),
        formComponentFormGroupArea: buildFormGroup(key),
        formComponentHtmlArea: buildHtml(key),
        formComponentClassPropertiesArea: generateSelectArray(key)
    }
}

// function buildcheckEmpty(key){
//     if (selectFields[key].selectType === 'single') {
//         return buildCheckFormElementEmpty(key,"''");
//     }
//     return buildCheckFormElementEmpty(key,"[]");
// }

function buildFormGroup(key) {
    if (selectFields[key].selectType === 'single') {
        return   `
        ${key}: [this.formData.${key} || ''],`;
  }

  return   `
        ${key}: [this.formData.${key} || []],`;  
}

function buildHtml(key) {
    const pluralName = plural(key);
    const multiple = selectFields[key].selectType === 'multiple' ? 'multiple': '';

    return `
        <mat-form-field [style.width.px]=500 *ngIf="${pluralName}">
            <mat-label>${_.kebabCase(key)}</mat-label>
            <mat-select formControlName="${key}" ${multiple}>
                <mat-option *ngFor="let item of ${pluralName}" [value]="item">{{ item }}</mat-option>
            </mat-select>
        </mat-form-field>
`;
}

function generateSelectArray(key) {
    let template = '';
    selectFields[key].values.map( (value) => {
      template += `'${value}',`;
    });
    return `
    
  ${ plural(key) } = [${template}];`;
}