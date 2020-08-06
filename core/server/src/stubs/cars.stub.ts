import * as _ from 'lodash';
import { cloneStub }  from '../helpers/stub-helpers';

const CarsStub = {
  type: 'type',
  createdAt: Date(),
  thumbnail: {url : ''},
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(CarsStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    type: `type_${i}`,
    title: {
      en: `cars title_${i} en`,
      ge: `cars title_${i} ge`,
      ru: `cars title_${i} ru`
  },
  description: {
      en: `cars description_${i} en`,
      ge: `cars description_${i} ge`,
      ru: `cars description_${i} ru`
  },
  meta: {
    title: {
      en: `cars title_${i} en`,
      ge: `cars title_${i} ge`,
      ru: `cars title_${i} ru`
    },
    description: {
      en: `cars description_${i} en`,
      ge: `cars description_${i} ge`,
      ru: `cars description_${i} ru`
    },
    keywords: ['test','test2'],
    image: { url : '' },
  }
  }));
}
