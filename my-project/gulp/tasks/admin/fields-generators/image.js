import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';
import { availableLangs } from '../../fields';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200];

export function imageBuilder(key, nested = null) {
    const rand = numbers[Math.floor(Math.random() * numbers.length)];

    return {
        formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(key, nested,"{}"),
        emptyObjectsForOpenModal:  buildForModalEmpty(key,"{}"),
        formComponentFormGroupArea: buildFormGroup(key, nested),
        formComponentHtmlArea: buildHtml(key, nested, rand),
        formComponentClassBodyArea: imageMethodTemplate(key, nested, rand)
    }
}

function buildFormGroup(key, nested = null) {
    if (nested === null) {
        nested = key;
    }else{
        nested += key;
    }
    return ` 
        ${key}: this.fb.group({
            url: [this.formData.${nested}.url || '']
        }),`;
}

function buildHtml(key, nested = null, rand) {
    if (nested === null) {
        nested = key;
    }else{
        nested += key;
    }
    return  `
        <h3>${_.kebabCase(key)}</h3>
        <div class="inputs_container">
            <app-image-upload [image]="formData.${nested}" (uploadComplete)="onUploadComplete${_.upperFirst(key)}${rand}($event)"></app-image-upload>
        </div>
      `;
}

function imageMethodTemplate(key, nested = null, rand) {
    if (nested === null) {
        nested = key;
    }else{
        nested += key;
    }
    return `
  onUploadComplete${_.upperFirst(key)}${rand}(data: any): void {
      this.form.get('${nested}').get('url').markAsTouched();
      this.form.get('${nested}').get('url').setValue(data.url);
  }
     `;
}