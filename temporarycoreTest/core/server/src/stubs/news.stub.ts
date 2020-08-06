import * as _ from 'lodash';
import { cloneStub }  from '../helpers/stub-helpers';

const NewsStub = {
  comment: 'comment',
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
    comment: `comment_${i}`,
    title: {
      en: `news title_${i} en`,
      ge: `news title_${i} ge`,
      ru: `news title_${i} ru`
  },
  description: {
      en: `news description_${i} en`,
      ge: `news description_${i} ge`,
      ru: `news description_${i} ru`
  },
  meta: {
    title: {
      en: `news title_${i} en`,
      ge: `news title_${i} ge`,
      ru: `news title_${i} ru`
    },
    description: {
      en: `news description_${i} en`,
      ge: `news description_${i} ge`,
      ru: `news description_${i} ru`
    },
    keywords: ['test','test2'],
    image: { url : '' },
  }
  }));
}
