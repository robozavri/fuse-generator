import * as _ from 'lodash';
import { cloneStub, generateImage, generateSocials }  from '../helpers/stub-helpers';



function getNameObject(i: number = 0): any {
    return 'name';
}
function getAboutObject(i: number = 0): any {
    return { contact: { street: { title: 'title', blogType: 'rock', peoples: { human: { age: {
        
        en: `age en ${i}`,
        ge: `age ge ${i}`,
    }, age4: {
        
        en: `age4 en ${i}`,
        ge: `age4 ge ${i}`,
    },}, anumal: { age2: {
        
        en: `age2 en ${i}`,
        ge: `age2 ge ${i}`,
    }, age3: {
        
        en: `age3 en ${i}`,
        ge: `age3 ge ${i}`,
    },},},}, images: [
        { url:  generateImage()},
        { url:  generateImage()},
        { url:  generateImage()}
    ],}, socialAccounts: [
          { account: generateSocials(), link: `https://www.${generateSocials()}.com/` },
          { account: generateSocials(), link: `https://www.${generateSocials()}.com/` },
          { account: generateSocials(), link: `https://www.${generateSocials()}.com/` }
    ],};
}

const BlogStub = {
    name: getNameObject(),
    about: getAboutObject(),
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(BlogStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    name: getNameObject(i),
    about: getAboutObject(i),
  }));
}
