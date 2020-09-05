import * as _ from 'lodash';
import { 
    buildMultilingual,
    buildCheckFormElementEmpty,
    buildForModalEmpty
} from '../fields-helper';
import { availableLangs } from '../../fields';

export function imagesBuilder(key, nested = null) {
    if (nested === null) {
        nested = key;
    }
    return {
        formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(nested,"[]"),
        emptyObjectsForOpenModal:  buildForModalEmpty(key,"[]"),
        formComponentFormGroupArea: buildFormGroup(key),
        formComponentHtmlArea: buildHtml(key),
        formComponentClassBodyArea: imagesMethodTemplate(key, nested),
        formComponentClassPropertiesArea: properties()
    }
}

function properties(){
  return  `
  public images = [];
  public items: FormArray;
    `;
}

function buildFormGroup(key) {
    return  `
        ${key}: this.fb.array(this.formData.${key} || []),`;
}

function buildHtml(key) {
    return  `
        <h3>${_.kebabCase(key)}</h3>
        <div class="inputs_container">
            <app-images-upload *ngIf="images" [images]="images" (removeImage)="deleteImage${_.upperFirst(key)}($event)" (uploadComplete)="onUploadComplete${_.upperFirst(key)}($event)"></app-images-upload>
        </div>
  `;
}


function imagesMethodTemplate(key, nested) {
    return `
  // ${key} upload methods
  deleteImage${_.upperFirst(key)}(index: any): void {
     this.images.splice(index, 1);
     this.items = this.form.get('${nested}') as FormArray;
     this.items.removeAt(index);
  }

  createItem${_.upperFirst(key)}(url= ''): FormGroup {
       return this.fb.group({
           url: url,
       });
  }

  addItem${_.upperFirst(key)}(url: any): void {
       this.items = this.form.get('${nested}') as FormArray;
       this.items.push(this.createItem${_.upperFirst(key)}(url));
       this.images.push({ url: url });
  }

  onUploadComplete${_.upperFirst(key)}(data: any): void {
       this.addItem${_.upperFirst(key)}(data.url);
  }
   `
}