import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';
import { availableLangs } from '../../fields';

export function stringBuilder(key) {
    return {
        formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(key,"''"),
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
            <mat-form-field appearance="outline" floatLabel="always" fxFlex="50">
                <mat-label> ${_.kebabCase(key)}</mat-label>
                <input matInput placeholder="${key}" formControlName="${key}">
            </mat-form-field>
        </div>
`;
}