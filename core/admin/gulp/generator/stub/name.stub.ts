import * as _ from 'lodash';
import { cloneStub }  from '../helpers/stub-helpers';

const <%=nameUC%>Stub = {
  <%=defField%>: '<%=defField%>',
  isFeatured: true,
  createdAt: Date(),
  thumbnail: {url : ''},
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(<%=nameUC%>Stub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    <%=defField%>: `<%=defField%>_${i}`,
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
