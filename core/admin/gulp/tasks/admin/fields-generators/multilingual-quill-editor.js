import * as _ from 'lodash';
import { buildMultilingual } from '../fields-helper'
import {  availableLangs } from '../../fields';

export function multilingualQuillEditor(key) {
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
templete +=  `
            <label class="formLabel">${_.kebabCase(key)} ${lang}</label>
            <quill-editor formControlName="${lang}"></quill-editor>
            `;
    });
    return `
        <div formGroupName='${key}'>
            ${templete}
        </div>
        `;
}