export function generateEmptyObjModal(fields = false) {
    let template = 'meta: {},';
    if(!fields) {
        return '';
    }

    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingualSchema': template += `
      ${key}: {},`;
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
        }
    });
    return template;
  }
  