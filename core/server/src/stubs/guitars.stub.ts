import * as _ from 'lodash';
import { cloneStub }  from '../helpers/stub-helpers';

const GuitarsStub = {
  comment: 'comment',
  createdAt: Date(),
  thumbnail: {url : ''},
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(GuitarsStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    comment: `comment_${i}`,
    title: {
      en: `guitar title_${i} en`,
      ge: `guitar title_${i} ge`,
      ru: `guitar title_${i} ru`
  },
  description: {
      en: `guitar description_${i} en`,
      ge: `guitar description_${i} ge`,
      ru: `guitar description_${i} ru`
  },
  meta: {
    title: {
      en: `guitar title_${i} en`,
      ge: `guitar title_${i} ge`,
      ru: `guitar title_${i} ru`
    },
    description: {
      en: `guitar description_${i} en`,
      ge: `guitar description_${i} ge`,
      ru: `guitar description_${i} ru`
    },
    keywords: ['test','test2'],
    image: { url : '' },
  }
  }));
}
