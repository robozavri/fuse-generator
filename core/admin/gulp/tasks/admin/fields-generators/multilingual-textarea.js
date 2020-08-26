import * as _ from 'lodash';
import {  availableLangs } from '../../fields';
import { buildMultilingual } from '../fields-helper'

export function multilingualTextarea(key) {
    // modalImports: '',
    // modalClassProperties: '',
    // modalConstructorArtuments: '',
    // modalOnInitBody: '',

    // listImports: '',
    // formInputs: '',
    // ListClassProperties: '',
    // listConstructorArtuments: '',
    // listOnInitBody: '',
    // listComponentBindParams: '',
    return {
        formEmptyObject:  buildEmpty(key),
        formGroupElement: buildFormGroup(key),
        html: buildHtml(key),
    }
}

function buildEmpty(key){
    return ` ${key}: {},`;
}

function buildFormGroup(key) {
    return `
            ${key}: this.fb.group({
                ${buildMultilingual(key)}
            }),`;
}

function buildHtml(key) {
    let templete = '';
    availableLangs.map((lang)=>{
templete += 
           `<mat-form-field appearance="outline" floatLabel="always" class="w-100-p">
                <mat-label> ${_.kebabCase(key)} ${lang} </mat-label>
                <textarea matInput placeholder="${_.kebabCase(key)} ${lang}" formControlName="${lang}" rows="5">
                </textarea>
            </mat-form-field>
            `;
    });
    return `
        <div formGroupName='${key}'>
            ${templete}
        </div>
    `;
}