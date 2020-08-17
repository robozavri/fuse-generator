import * as _ from 'lodash';
import { cloneStub, generateImage }  from '../helpers/stub-helpers';

<%=stubObjectMethods%>

function getMeta(i: number = 0): any {
  return {
    title: { en: `service meta title en ${i}`, ge: `service meta title ge ${i}`},
    description: { en: `service meta description en ${i}`, ge: `service meta description ge ${i}`},
    keywords: ['service meta keyword1', 'service meta keyword2', 'service meta keyword3'],
    image: { url: '' },
  };
}

const <%=nameUC%>Stub = {
  <%=objectNames%>
    meta: getMeta(),
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
    <%=objectNamesWithI%>
    meta: getMeta(i),
  }));
}
