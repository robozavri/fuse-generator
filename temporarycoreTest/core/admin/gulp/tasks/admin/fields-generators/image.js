import * as _ from 'lodash';

export class ImageField {

  constructor(FieldsHelper) {
    this.FieldsHelper = FieldsHelper;
  }
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200];

  builder(key, nested = null) {
    const rand = numbers[Math.floor(Math.random() * numbers.length)];

    return {
      formComponentClassOnInitBodyArea: this.FieldsHelper.buildCheckFormElementEmpty(key, nested,"{}"),
      emptyObjectsForOpenModal:  this.FieldsHelper.buildForModalEmpty(key,"{}"),
      formComponentFormGroupArea: this.buildFormGroup(key, nested),
      formComponentHtmlArea: this.buildHtml(key, nested, rand),
      formComponentClassBodyArea: this.imageMethodTemplate(key, nested, rand)
    }
  }

  buildFormGroup(key, nested = null) {
    if (nested === null) {
      nested = key;
    } else {
      nested += key;
    }
    return ` 
      ${key}: this.fb.group({
        url: [this.formData.${nested}.url || '']
      }),`;
  }

  buildHtml(key, nested = null, rand) {
    if (nested === null) {
      nested = key;
    } else {
      nested += key;
    }
    return `
      <h3> ${_.lowerCase(key)} </h3>
      <div class="inputs_container">
        <app-image-upload
          [image]="formData.${nested}"
          [imageHeight]="imageSize.height"
          [imageWidth]="imageSize.width"
          (uploadComplete)="onUploadComplete${_.upperFirst(key)}${rand}($event)">
        </app-image-upload>
      </div>`;
  }

  imageMethodTemplate(key, nested = null, rand) {
    if (nested === null) {
      nested = key;
    } else {
      nested += key;
    }
    return `
    onUploadComplete${_.upperFirst(key)}${rand}(data: any): void {
      this.form.get('${nested}').get('url').markAsTouched();
      this.form.get('${nested}').get('url').setValue(data.url);
    }`;
  }
}