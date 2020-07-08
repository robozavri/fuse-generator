import * as _ from 'lodash';
import { cloneStub }  from '../helpers/stub-helpers';

const NewsStub = {
  isFeatured: true,
  createdAt: Date(),
  thumbnail: {url : ''},
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(NewsStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
  title: {
      en: `title_${i} ge`,
      ge: `title_${i} en`,
      ru: `title_${i} ru`
  },
  description: {
      en: `description_${i} ge`,
      ge: `description_${i} en`,
      ru: `description_${i} ru`
  },
  content: {
      en: `content_${i} ge`,
      ge: `content_${i} en`,
      ru: `content_${i} ru`
  },
  meta: {
    title: {
      en: `title_${i} ge`,
      ge: `title_${i} en`,
      ru: `title_${i} ru`
    },
    description: {
      en: `description_${i} ge`,
      ge: `description_${i} en`,
      ru: `description_${i} ru`
    },
    keywords: ['test','test2'],
    image: { url : '' },
  }


  }));
}
