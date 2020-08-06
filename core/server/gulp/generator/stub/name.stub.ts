import * as _ from 'lodash';
import { cloneStub }  from '../helpers/stub-helpers';

const <%=nameUC%>Stub = {
  <%=defField%>: '<%=defField%>',
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
      en: `<%=nameSingularLC%> title_${i} en`,
      ge: `<%=nameSingularLC%> title_${i} ge`,
      ru: `<%=nameSingularLC%> title_${i} ru`
  },
  description: {
      en: `<%=nameSingularLC%> description_${i} en`,
      ge: `<%=nameSingularLC%> description_${i} ge`,
      ru: `<%=nameSingularLC%> description_${i} ru`
  },
  meta: {
    title: {
      en: `<%=nameSingularLC%> title_${i} en`,
      ge: `<%=nameSingularLC%> title_${i} ge`,
      ru: `<%=nameSingularLC%> title_${i} ru`
    },
    description: {
      en: `<%=nameSingularLC%> description_${i} en`,
      ge: `<%=nameSingularLC%> description_${i} ge`,
      ru: `<%=nameSingularLC%> description_${i} ru`
    },
    keywords: ['test','test2'],
    image: { url : '' },
  }
  }));
}
