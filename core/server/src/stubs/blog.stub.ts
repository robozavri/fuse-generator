import * as _ from 'lodash';
import { cloneStub, generateImage, generateSocials }  from '../helpers/stub-helpers';



function getNameObject(i: number = 0): any {
    return 'name';
}

function getFullNameObject(i: number = 0): any {
    return 'fullName';
}

function getImagesObject(i: number = 0): any {
    return [
        { url:  generateImage()},
        { url:  generateImage()},
        { url:  generateImage()}
    ];
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

const BlogStub = {
    name: getNameObject(),
    fullName: getFullNameObject(),
    images: getImagesObject(),
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
    fullName: getFullNameObject(i),
    images: getImagesObject(i),
    about: getAboutObject(i),
  }));
}
