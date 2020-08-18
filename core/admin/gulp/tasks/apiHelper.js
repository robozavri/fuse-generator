import * as _ from 'lodash';

export function generateSchema(fields = false) {
    if(!fields) {
        return '';
    }
    let template = '';

    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingualSchema':  template += build(key, 'multilingualSchema');
              break;
            case 'String': template += build(key, 'String');
              break;
            case 'Number': template += build(key, 'Number');
              break;
            case 'imageSchema':  template += build(key, 'imageSchema');
              break;
            case 'Date':  template += build(key, 'Date');
              break;
            case '[imageSchema]': template += build(key, '[imageSchema]');
              break;
        }
    });
    return template;
}

export function generateKeywordSearch(fields = false) {
    if(!fields) {
        return '';
    }
    let template = '';
    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingualSchema':  template += buildKeyword(key, 'multilingualSchema');
               break;
            case 'String': template += buildKeyword(key, 'String');
               break;
        }
    });
    return template;
}

export function generateBaseProps(fields = false) {
    if(!fields) {
        return '';
    }
    let template = '';

    Object.keys(fields).map((key, index) => {
        template += `
    '${key}',`;
    });
    
    return template;
}

export function generateSingleStub(fields = false) {
    if(!fields) {
        return  {objectNames: '', stubObjectMethods: ''};
    }
    let objectNames = '';
    let objectNamesWithI = '';
    let stubObjectMethods = '';

    Object.keys(fields).map((key, index) => {
      if (index == 0) {
        objectNames +=
          `  ${key}: get${_.upperFirst(key)}Object(),`;
   objectNamesWithI +=
          `${key}: get${_.upperFirst(key)}Object(i),`;
            stubObjectMethods += buildSingleStubObject(key, fields[key]);
      } else {
          objectNames += `
    ${key}: get${_.upperFirst(key)}Object(),`;
        objectNamesWithI += `
    ${key}: get${_.upperFirst(key)}Object(i),`;
            stubObjectMethods += buildSingleStubObject(key, fields[key]);
      }
    });
    
    return {objectNames: objectNames, objectNamesWithI: objectNamesWithI, stubObjectMethods: stubObjectMethods};
}

function build(key, value) {
    return `
  ${key}: ${value},`;
}

function buildKeyword(key, value) {
    if (value == 'String') {
        return `
        {  '${key}': { $regex: keyword, $options: 'i' } },`;
    }

    if (value == 'multilingualSchema') {
        return `
        { '${key}.en': { $regex: keyword, $options: 'i' } },
        { '${key}.ge': { $regex: keyword, $options: 'i' } },
        { '${key}.ru': { $regex: keyword, $options: 'i' } }, `;
    }
}

function buildSingleStubObject(key, type) {

    let templateContent = '';
    switch( type ) {
        case 'multilingualSchema':   
templateContent += `{
        en: \`${key} en \${i}\`,
        ge: \`${key} ge \${i}\`,
        ru: \`${key} ru \${i}\`,
    }`;
          break;

        case 'String':  templateContent += `'${key}'`;
          break;

        case 'Number':  templateContent += `_.random(1, 20)`;
          break;

        case 'imageSchema':  templateContent += `{ url:  generateImage()}`;
          break;

        case 'Date': templateContent += `new Date()`;
          break;

        case '[imageSchema]':  
    templateContent += `[
        { url:  generateImage()},
        { url:  generateImage()},
        { url:  generateImage()}
    ]`;
          break;
    }

   return `

function get${_.upperFirst(key)}Object(i: number = 0): any {
    return ${templateContent};
}`;
}


