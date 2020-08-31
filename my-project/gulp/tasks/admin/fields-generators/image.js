import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';
import { availableLangs } from '../../fields';

export function imageBuilder(key) {
    return {
        formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(key,"{}"),
        emptyObjectsForOpenModal:  buildForModalEmpty(key,"{}"),
        formComponentFormGroupArea: buildFormGroup(key),
        formComponentHtmlArea: buildHtml(key),
        formComponentClassBodyArea: imageMethodTemplate(key)
    }
}

function buildFormGroup(key) {
    return ` 
        ${key}: this.fb.group({
            url: [this.formData.${key}.url || '']
        }),`;
}

function buildHtml(key) {
    return  `
        <h3>${_.kebabCase(key)}</h3>
        <div class="inputs_container">
            <app-image-upload [image]="formData.${key}" (uploadComplete)="onUploadComplete${_.upperFirst(key)}($event)"></app-image-upload>
        </div>
      `;
}

function imageMethodTemplate(key) {
    return `
  onUploadComplete${_.upperFirst(key)}(data: any): void {
      this.form.get('${key}').get('url').markAsTouched();
      this.form.get('${key}').get('url').setValue(data.url);
  }
     `;
}