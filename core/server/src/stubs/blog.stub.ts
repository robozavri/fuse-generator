import * as _ from 'lodash';
import { cloneStub, generateImage }  from '../helpers/stub-helpers';



function getNameObject(i: number = 0): any {
    return 'name';
}

function getTitleObject(i: number = 0): any {
    return {
        en: `title en ${i}`,
        ge: `title ge ${i}`,
        ru: `title ru ${i}`,
    };
}

function getDescriptionObject(i: number = 0): any {
    return {
        en: `description en ${i}`,
        ge: `description ge ${i}`,
        ru: `description ru ${i}`,
    };
}

function getCountObject(i: number = 0): any {
    return _.random(1, 20);
}

function getThumbnailObject(i: number = 0): any {
    return { url:  generateImage()};
}

function getImagesObject(i: number = 0): any {
    return [
        { url:  generateImage()},
        { url:  generateImage()},
        { url:  generateImage()}
    ];
}

function getCreateAtObject(i: number = 0): any {
    return new Date();
}

const BlogStub = {
    name: getNameObject(),
    title: getTitleObject(),
    description: getDescriptionObject(),
    count: getCountObject(),
    thumbnail: getThumbnailObject(),
    images: getImagesObject(),
    createAt: getCreateAtObject(),
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
    title: getTitleObject(i),
    description: getDescriptionObject(i),
    count: getCountObject(i),
    thumbnail: getThumbnailObject(i),
    images: getImagesObject(i),
    createAt: getCreateAtObject(i),
  }));
}
