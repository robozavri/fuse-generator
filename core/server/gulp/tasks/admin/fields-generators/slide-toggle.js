import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';

export function slideToggleBuilder(key, nested = null) {
    if (nested === null) {
        nested = key;
    }
    return {
        formComponentClassOnInitBodyArea: buildCheckEmptyObj(nested),
        emptyObjectsForOpenModal:  buildForModalEmpty(key,"false"),
        formComponentFormGroupArea: buildFormGroup(key),
        formComponentHtmlArea: buildHtml(key),
    }
}

function buildCheckEmptyObj(key) {
    return `
    this.formData.${key} = this.formData.${key} === undefined ? false : this.formData.${key};`;
}


function buildFormGroup(key) {
  return  `
        ${key}: [this.formData.${key}],`;
}

function buildHtml(key) {
    return `
        <div class="custom-slied-toggle">
            <mat-slide-toggle formControlName="${key}">${_.kebabCase(key)}</mat-slide-toggle>
        </div>
`;
}
