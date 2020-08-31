import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';

export function slideToggleBuilder(key) {
    return {
        formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(key,"''"),
        emptyObjectsForOpenModal:  buildForModalEmpty(key,"''"),
        formComponentFormGroupArea: buildFormGroup(key),
        formComponentHtmlArea: buildHtml(key),
    }
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
