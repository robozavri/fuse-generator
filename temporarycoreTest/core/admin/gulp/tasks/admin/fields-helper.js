// import {  availableLangs } from '../fields';

export class FieldsHelper {
    
  constructor(availableLangs) {
    this.availableLangs = availableLangs;
  }  

  buildForModalEmpty(key, value){
    return `
      ${key}: ${value},`;
  }

  buildCheckFormElementEmpty(key, nested = null, obj){
    if (nested === null) {
      nested = key;
    } else {
      nested += key;
    }
    return `
      this.formData.${nested} = this.formData.${nested} || ${obj};`;
  }

  buildMultilingual(key) {
    let template = '';
    this.availableLangs.map( (lang) => {
      template += `
        ${lang}: [this.formData.${key}.${lang} || ''],`;
    });
    return template;
  }
}

// export function buildForModalEmpty(key, value){
//   return `
//     ${key}: ${value},`;
// }

// export function buildCheckFormElementEmpty(key, nested = null, obj){
//   if (nested === null) {
//     nested = key;
//   } else {
//     nested += key;
//   }
//   return `
//     this.formData.${nested} = this.formData.${nested} || ${obj};`;
// }

// export function buildMultilingual(key) {
//   let template = '';
//   availableLangs.map( (lang) => {
//     template += `
//       ${lang}: [this.formData.${key}.${lang} || ''],`;
//   });
//   return template;
// }