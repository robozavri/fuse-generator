import {  availableLangs } from '../fields';

export function buildForModalEmpty(key, value){
    return `
        ${key}: ${value},`;
}

export function buildCheckFormElementEmpty(key, obj){
    return `
    this.formData.${key} = this.formData.${key} || ${obj};`;
}

export function buildMultilingual(key) {
    let template = '';
    availableLangs.map( (lang) => {
        template += `
           ${lang}: [this.formData.${key}.${lang} || ''],`;
    });
    return template;
}