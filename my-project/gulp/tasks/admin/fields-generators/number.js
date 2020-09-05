import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';
import { availableLangs } from '../../fields';

export function numberBuilder(key, nested = null) {
    if (nested === null) {
        nested = key;
    }
    return {
        formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(nested,"''"),
        emptyObjectsForOpenModal:  buildForModalEmpty(key,"''"),
        formComponentFormGroupArea: buildFormGroup(key),
        formComponentHtmlArea: buildHtml(key),
    }
}

function buildFormGroup(key) {
    return `
        ${key}: [this.formData.${key} || ''],`;
}

function buildHtml(key) {
return  `
        <div fxLayout="row" fxLayoutAlign="space-between">
            <mat-form-field appearance="outline" floatLabel="always" fxFlex="20">
                <mat-label>${_.kebabCase(key)}</mat-label>
                <input matInput type="number" min="0" formControlName="${key}">
            </mat-form-field>
        </div>
`;
}