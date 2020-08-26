import {  availableLangs } from '../fields';


export function buildMultilingual(key) {
    let template = '';
    availableLangs.map( (lang) => {
        template += 
        `
                ${lang}: [this.formData.${key}.${lang} || ''],`;
    });
    return template;
}