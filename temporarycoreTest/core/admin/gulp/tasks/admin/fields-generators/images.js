import * as _ from 'lodash';
import { 
  buildForModalEmpty
} from '../fields-helper';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200];

export function imagesBuilder(key, nested = null) {
  const rand = _.random(1,999);

  return {
    formComponentClassOnInitBodyArea: buildCheckImagesEmpty(key, nested,"[]", rand),
    emptyObjectsForOpenModal:  buildForModalEmpty(key,"[]"),
    formComponentFormGroupArea: buildFormGroup(key, nested),
    formComponentHtmlArea: buildHtml(key,rand),
    formComponentClassBodyArea: imagesMethodTemplate(key, nested,rand),
    formComponentClassPropertiesArea: properties(key,rand)
  }
}

function properties(key,rand){
  return  `
  images${rand} = [];
  items${rand}: FormArray;`;
}

function buildCheckImagesEmpty(key, nested = null, obj, rand){
  if (nested === null) {
    nested = key;
  } else {
    nested += key;
  }
  return `
    this.images${rand} = this.formData.${nested} || ${obj};`;
}

function buildFormGroup(key, nested = null) {
  if (nested === null) {
    nested = key;
  } else {
    nested += key;
  }
  return  `
      ${key}: this.fb.array(this.formData.${nested} || []),`;
}

function buildHtml(key,rand) {
  return `
    <h3> ${_.lowerCase(key)} </h3>
    <div class="inputs_container">
      <app-images-upload
        *ngIf="images${rand}"
        [images]="images${rand}"
        [imageHeight]="imageSize.height"
        [imageWidth]="imageSize.width"
        (removeImage)="deleteImage${_.upperFirst(key)}${rand}($event)"
        (uploadComplete)="onUploadComplete${_.upperFirst(key)}${rand}($event)">
      </app-images-upload>
    </div>`;
}


function imagesMethodTemplate(key, nested, rand) {
  if (nested === null) {
    nested = key;
  } else {
    nested += key;
  }
  return `
  // ${key} upload methods
  deleteImage${_.upperFirst(key)}${rand}(index: any): void {
    this.images${rand}.splice(index, 1);
    this.items${rand} = this.form.get('${nested}') as FormArray;
    this.items${rand}.removeAt(index);
  }

  createItem${_.upperFirst(key)}${rand}(url= ''): FormGroup {
    return this.fb.group({
        url: url,
    });
  }

  addItem${_.upperFirst(key)}${rand}(url: any): void {
    this.items${rand} = this.form.get('${nested}') as FormArray;
    this.items${rand}.push(this.createItem${_.upperFirst(key)}${rand}(url));
    this.images${rand}.push({ url: url });
  }

  onUploadComplete${_.upperFirst(key)}${rand}(data: any): void {
    this.addItem${_.upperFirst(key)}${rand}(data.url);
  }`;
}