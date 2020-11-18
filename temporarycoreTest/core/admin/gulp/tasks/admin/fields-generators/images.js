import * as _ from 'lodash';


export class ImagesField {

  constructor(FieldsHelper) {
    this.FieldsHelper = FieldsHelper;
  }


  builder(key, nested = null) {
    const rand = _.random(1,999);

    return {
      formComponentClassOnInitBodyArea: this.buildCheckImagesEmpty(key, nested,"[]", rand),
      emptyObjectsForOpenModal:  this.FieldsHelper.buildForModalEmpty(key,"[]"),
      formComponentFormGroupArea: this.buildFormGroup(key, nested),
      formComponentHtmlArea: this.buildHtml(key,rand),
      formComponentClassBodyArea: this.imagesMethodTemplate(key, nested,rand),
      formComponentClassPropertiesArea: this.properties(key,rand)
    }
  }

  properties(key,rand){
    return  `
    images${rand} = [];
    items${rand}: FormArray;`;
  }

  buildCheckImagesEmpty(key, nested = null, obj, rand){
    if (nested === null) {
      nested = key;
    } else {
      nested += key;
    }
    return `
      this.images${rand} = this.formData.${nested} || ${obj};`;
  }

  buildFormGroup(key, nested = null) {
    if (nested === null) {
      nested = key;
    } else {
      nested += key;
    }
    return  `
        ${key}: this.fb.array(this.formData.${nested} || []),`;
  }

  buildHtml(key,rand) {
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

  imagesMethodTemplate(key, nested, rand) {
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
}