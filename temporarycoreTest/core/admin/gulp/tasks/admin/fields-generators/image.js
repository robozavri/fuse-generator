import * as _ from 'lodash';

export class ImageField {

  constructor(FieldsHelper) {
    this.FieldsHelper = FieldsHelper;
  }
  

  builder(key, nested = null) {
    const rand = _.random(1,999);

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