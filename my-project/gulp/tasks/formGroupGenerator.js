import * as _ from 'lodash';

export function generateImageMethods(fields = false) {
    let template = '';

    Object.keys(fields).map((key, index) => {
        if ( fields[key] == 'imageSchema') {
            template += imageMethodTemplate(key);
        }
    });

    return template;
}

export function generateImagesMethods(fields = false) {
    let template = '';

    Object.keys(fields).map((key, index) => {
        if ( fields[key] == '[imageSchema]') {
            template += imagesMethodTemplate(key);
        }
    });
    const properties = `
    public images = [];
    public items: FormArray;
    `;

    return {methods: template, properties: properties };
}

export function generateFormGroup(fields = false) {
    let formTemplate = '';
    if(!fields) {
        return '';
    }
    
    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingualSchema': formTemplate += `
            ${key}: this.fb.group({
                    ge: [this.formData.${key}.ge || ''],
                    en: [this.formData.${key}.en || ''],
                    ru: [this.formData.${key}.ru || ''],
            }),`;
            break;
            case 'String': formTemplate += `
            ${key}: [this.formData.${key} || ''],`;
            break;
            case 'Number': formTemplate += `
            ${key}: [this.formData.${key} || ''],`;
            break;
            case 'imageSchema': formTemplate += ` 
            ${key}: this.fb.group({
                url: [this.formData.${key}.url || '']
            }),`;
            break;
            case '[imageSchema]': formTemplate += `
            ${key}: this.fb.array(this.formData.${key} || []),`;
            break;
            case 'Date': formTemplate += `
            ${key}: [this.formData.${key} || new Date()],`;
            break;
        }
    });

    return `this.fb.group({
        ${formTemplate}
    });
    `;
}

export function generateFormEmptyObjects(fields = false) {
    let template = '';

    if(!fields) {
        return '';
    }

    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingualSchema': template += `
    this.formData.${key} = this.formData.${key} || {};`;
            break;
            case 'String':  template += `
    this.formData.${key} = this.formData.${key} || '';`;
            break;
            case 'Number':  template += `
    this.formData.${key} = this.formData.${key} || '';`;
            break;
            case 'imageSchema': template +=  `
    this.formData.${key} = this.formData.${key} || {};`;
            break;
            case '[imageSchema]':  template +=  `
    this.images = this.formData.${key} || [];`;
            break;
            case 'Date':  template += `
    this.formData.${key} = this.formData.${key} || new Date();`;
            break;
        }
    });
    return template;
}

function imageMethodTemplate(key) {
 return `
  onUploadComplete${_.upperFirst(key)}(data: any): void {
      this.form.get('${key}').get('url').markAsTouched();
      this.form.get('${key}').get('url').setValue(data.url);
  }`
}

function imagesMethodTemplate(key) {
    return `
  // ${key} upload methods
  deleteImage${_.upperFirst(key)}(index: any): void {
     this.images.splice(index, 1);
     this.items = this.form.get('${key}') as FormArray;
     this.items.removeAt(index);
  }

  createItem${_.upperFirst(key)}(url= ''): FormGroup {
       return this.fb.group({
           url: url,
       });
  }

  addItem${_.upperFirst(key)}(url: any): void {
       this.items = this.form.get('images') as FormArray;
       this.items.push(this.createItem${_.upperFirst(key)}(url));
       this.images.push({ url: url });
  }

  onUploadComplete${_.upperFirst(key)}(data: any): void {
       this.addItem${_.upperFirst(key)}(data.url);
  }
   `
   }