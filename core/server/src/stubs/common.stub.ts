import * as _ from 'lodash';
import { cloneStub, generateImage, generateSocials }  from '../helpers/stub-helpers';



function getNameObject(i: number = 0): any {
    return 'name';
}
function getAboutObject(i: number = 0): any {
    return { contact: { street: { title: 'title', peoples: { human: { age: {
        
        en: `age en ${i}`,
        ge: `age ge ${i}`,
    }, age4: 'age4',}, isFeatured: false,}, desc: 'desc',}, image: { url: generateImage()},}, behemoth: { ambum: 'ambum', songs: { oneSong: {
        
        en: `oneSong en ${i}`,
        ge: `oneSong ge ${i}`,
    }, oneSong2: {
        
        en: `oneSong2 en ${i}`,
        ge: `oneSong2 ge ${i}`,
    },}, blackmetal: { images: [
        { url:  generateImage()},
        { url:  generateImage()},
        { url:  generateImage()}
    ],},}, socialAccounts: [
          { account: generateSocials(), link: `https://www.${generateSocials()}.com/` },
          { account: generateSocials(), link: `https://www.${generateSocials()}.com/` },
          { account: generateSocials(), link: `https://www.${generateSocials()}.com/` }
    ],};
}

const CommonStub = {
    name: getNameObject(),
    about: getAboutObject(),
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(CommonStub),
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
