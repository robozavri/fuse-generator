import * as _ from 'lodash';
import { cloneStub, generateImage, generateSocials }  from '../helpers/stub-helpers';



function getTitleObject(i: number = 0): any {
    return {
        
        en: `title en ${i}`,
        ge: `title ge ${i}`,
    };
}

function getMeta(i: number = 0): any {
  return {
    title: { en: `BlogCategories meta title en ${i}`, ge: `BlogCategories meta title ge ${i}`, ru: `BlogCategories meta title ru ${i}`},
    description: { en: `BlogCategories meta description en ${i}`, ge: `BlogCategories meta description ge ${i}`, ru: `BlogCategories meta description ru ${i}`},
    keywords: ['BlogCategories meta keyword1', 'BlogCategories meta keyword2', 'BlogCategories meta keyword3'],
    image: { url: '' },
  };
}

const BlogCategoriesStub = {
    title: getTitleObject(),
    meta: getMeta(),
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(BlogCategoriesStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    title: getTitleObject(i),
    meta: getMeta(i),
  }));
}
