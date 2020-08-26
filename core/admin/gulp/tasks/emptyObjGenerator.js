import { availableLangs, refFields } from './fields';

export function generateEmptyObjModal(fields = false) {
    let template = 'meta: {},';
    if(!fields) {
        return '';
    }

    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingualSchema-quill-editor': template += `
      ${key}: {},`;
            break;
            case 'multmultilingualSchema-TextareailingualSchema': template += `
      ${key}: {},`;
            break;
            case 'multilingualSchema': template += `
      ${key}: {},`;
              break;
            case 'quill-editor':  template += `
      ${key}: '',`;
              break;
            case 'Textarea':  template += `
      ${key}: '',`;
              break;
            case 'String':  template += `
      ${key}: '',`;
              break;
            case 'Number': template += `
      ${key}: '',`;
              break;
            case 'imageSchema': template += `
      ${key}: {},`;
              break;
            case '[imageSchema]': template += `
      ${key}: [],`;
              break;
            case 'Date': template += `
      ${key}: new Date(),`;
              break;
            case 'Socials': template += `
      ${key}: [],`;
              break;
            case 'Reference':
                   template += detectReference(key);
              break;
        }
    });
    return template;
  }
  
  function detectReference(key) {
      if (refFields[key].referenceType === 'single') {
            return  `
            ${key}: '',`;
      }

      return  `
      ${key}: [],`;   
  }