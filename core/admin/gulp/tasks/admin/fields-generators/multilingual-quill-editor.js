import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';
import { availableLangs } from '../../fields';

export function multilingualQuillEditorBuilder(key) {
    return {
        formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(key, '{}'),
        emptyObjectsForOpenModal:  buildForModalEmpty(key, '{}'),
        formComponentFormGroupArea: buildFormGroup(key),
        formComponentHtmlArea: buildHtml(key),
    }
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