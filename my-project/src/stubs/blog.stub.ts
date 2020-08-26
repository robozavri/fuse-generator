import * as _ from 'lodash';
import { cloneStub, generateImage, generateSocials }  from '../helpers/stub-helpers';



function getNameObject(i: number = 0): any {
    return 'name';
}

function getTitleObject(i: number = 0): any {
    return {
        
        en: `title en ${i}`,
        ge: `title ge ${i}`,
    };
}

function getDescriptionObject(i: number = 0): any {
    return {
        
        en: `description en ${i}`,
        ge: `description ge ${i}`,
    };
}

function getSmallDescriptionObject(i: number = 0): any {
    return {
        
        en: `smallDescription en ${i}`,
        ge: `smallDescription ge ${i}`,
    };
}

function getContentObject(i: number = 0): any {
    return {
        
        en: `content en ${i}`,
        ge: `content ge ${i}`,
    };
}

function getAboutQuiliObject(i: number = 0): any {
    return 'aboutQuili';
}

function getAboutPrimitiveObject(i: number = 0): any {
    return 'aboutPrimitive';
}

function getCountObject(i: number = 0): any {
    return _.random(1, 20);
}

function getThumbnailObject(i: number = 0): any {
    return { url: generateImage()};
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
function getSocialAccountsObject(i: number = 0): any {
    const social = generateSocials();
    return [
          { account: social, link: `https://www.${social}.com/` },
          { account: social, link: `https://www.${social}.com/` },
          { account: social, link: `https://www.${social}.com/` }
    ];
}

function getCategoryObject(i: number = 0): any {
    return ;
}

function getBlogTypeObject(i: number = 0): any {
    return 'black';
}

function getMetaObject(i: number = 0): any {
    return {
      title : {
         
        en: `meta en ${i}`,
        ge: `meta ge ${i}`,
      },
      description : {
         
        en: `meta en ${i}`,
        ge: `meta ge ${i}`,
      },
      keywords: ['meta meta keyword1', 'meta meta keyword2', 'meta meta keyword3'],
      image: { url: generateImage() },
  };
}

const BlogStub = {
    name: getNameObject(),
    title: getTitleObject(),
    description: getDescriptionObject(),
    smallDescription: getSmallDescriptionObject(),
    content: getContentObject(),
    aboutQuili: getAboutQuiliObject(),
    aboutPrimitive: getAboutPrimitiveObject(),
    count: getCountObject(),
    thumbnail: getThumbnailObject(),
    images: getImagesObject(),
    createAt: getCreateAtObject(),
    socialAccounts: getSocialAccountsObject(),
    category: getCategoryObject(),
    blogType: getBlogTypeObject(),
    meta: getMetaObject(),
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
    smallDescription: getSmallDescriptionObject(i),
    content: getContentObject(i),
    aboutQuili: getAboutQuiliObject(i),
    aboutPrimitive: getAboutPrimitiveObject(i),
    count: getCountObject(i),
    thumbnail: getThumbnailObject(i),
    images: getImagesObject(i),
    createAt: getCreateAtObject(i),
    socialAccounts: getSocialAccountsObject(i),
    category: getCategoryObject(i),
    blogType: getBlogTypeObject(i),
    meta: getMetaObject(i),
  }));
}
