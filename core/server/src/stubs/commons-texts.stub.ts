import * as _ from 'lodash';
import { cloneStub, generateImage, generateSocials }  from '../helpers/stub-helpers';



function getNameObject(i: number = 0): any {
    return 'name';
}

function getFullNameObject(i: number = 0): any {
    return 'fullName';
}

function getCategoryObject(i: number = 0): any {
    return ;
}
function getAboutObject(i: number = 0): any {
    return { contact: { title: {
        
        en: `title en ${i}`,
        ge: `title ge ${i}`,
    }, address: {
        
        en: `address en ${i}`,
        ge: `address ge ${i}`,
    },}, phone: 'phone', socialAccounts: [
          { account: generateSocials(), link: `https://www.${generateSocials()}.com/` },
          { account: generateSocials(), link: `https://www.${generateSocials()}.com/` },
          { account: generateSocials(), link: `https://www.${generateSocials()}.com/` }
    ],};
}

const CommonsTextsStub = {
    name: getNameObject(),
    fullName: getFullNameObject(),
    category: getCategoryObject(),
    about: getAboutObject(),
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(CommonsTextsStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    name: getNameObject(i),
    fullName: getFullNameObject(i),
    category: getCategoryObject(i),
    about: getAboutObject(i),
  }));
}
