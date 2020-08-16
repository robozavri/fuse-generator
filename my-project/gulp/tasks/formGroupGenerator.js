import * as _ from 'lodash';

export function generateImageMethods(fields = false) {
    let template = '';
    let emptyObj = {};

    Object.keys(fields).map((key, index) => {
        if ( fields[key] == 'image') {
            emptyObj[key] = imageMethodTemplate(key);
        }
    });

    Object.keys(emptyObj).map((key, index) => {
        template += emptyObj[key];
    });

    return template;
}

export function generateFormGroup(fields = false) {
    let emptyObj = {};
    let formTemplate = '';

    if(!fields) {
        return '';
    }
    
    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingual':  emptyObj[key] = `
            ${key}: this.fb.group({
                    ge: [this.formData.${key}.ge || ''],
                    en: [this.formData.${key}.en || ''],
                    ru: [this.formData.${key}.ru || ''],
            }),`;
            break;
            case 'string':  emptyObj[key] = `
            ${key}: [this.formData.${key} || ''],`;
            break;
            case 'number':  emptyObj[key] = `
            ${key}: [this.formData.${key} || ''],`;
            break;
            case 'image':  emptyObj[key] = ` 
            ${key}: this.fb.group({
                url: [this.formData.${key}.url || '']
            }),`;
            break;
            // case 'images':  emptyObj[key]  = [];
            // break;
        }
    });

    Object.keys(emptyObj).map((key, index) => {
        formTemplate += emptyObj[key];
    });

    return `this.fb.group({
        ${formTemplate}
    });
    `;
}

function imageMethodTemplate(key) {
 return `
  onUploadComplete${_.upperFirst(key)}(data: any): void {
      this.form.get('${key}').get('url').markAsTouched();
      this.form.get('${key}').get('url').setValue(data.url);
  }
`
}