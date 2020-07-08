import * as _ from 'lodash';
import { cloneStub }  from '../helpers/stub-helpers';

const AuthorsStub = {
  status: 'status',
  isFeatured: true,
  createdAt: Date(),
  thumbnail: {url : ''},
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(AuthorsStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    status: `status_${i}`,
    title: {
      en: `title_${i} en`,
      ge: `title_${i} ge`,
      ru: `title_${i} ru`
  },
  description: {
      en: `description_${i} en`,
      ge: `description_${i} ge`,
      ru: `description_${i} ru`
  },
  content: {
      ge: `content_${i} ge`,
      en: `content_${i} en`,
      ru: `content_${i} ru`
  },
  meta: {
    title: {
      en: `title_${i} en`,
      ge: `title_${i} ge`,
      ru: `title_${i} ru`
    },
    description: {
      en: `description_${i} en`,
      ge: `description_${i} ge`,
      ru: `description_${i} ru`
    },
    keywords: ['test','test2'],
    image: { url : '' },
  }
  }));
}
