import * as _ from 'lodash';
import { cloneStub }  from '../helpers/stub-helpers';

const CompiutersStub = {
  comment: 'comment',
  createdAt: Date(),
  thumbnail: {url : ''},
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(CompiutersStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    comment: `comment_${i}`,
    title: {
      en: `compiuters title_${i} en`,
      ge: `compiuters title_${i} ge`,
      ru: `compiuters title_${i} ru`
  },
  description: {
      en: `compiuters description_${i} en`,
      ge: `compiuters description_${i} ge`,
      ru: `compiuters description_${i} ru`
  },
  meta: {
    title: {
      en: `compiuters title_${i} en`,
      ge: `compiuters title_${i} ge`,
      ru: `compiuters title_${i} ru`
    },
    description: {
      en: `compiuters description_${i} en`,
      ge: `compiuters description_${i} ge`,
      ru: `compiuters description_${i} ru`
    },
    keywords: ['test','test2'],
    image: { url : '' },
  }
  }));
}
