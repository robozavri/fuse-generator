import * as _ from 'lodash';
import { cloneStub, generateImage }  from '../helpers/stub-helpers';

<%=stubObjectMethods%>

function getMeta(i: number = 0): any {
  return {
    title: { en: `<%=nameUC%> meta title en ${i}`, ge: `<%=nameUC%> meta title ge ${i}`, ru: `<%=nameUC%> meta title ru ${i}`},
    description: { en: `<%=nameUC%> meta description en ${i}`, ge: `<%=nameUC%> meta description ge ${i}`, ru: `<%=nameUC%> meta description ru ${i}`},
    keywords: ['<%=nameUC%> meta keyword1', '<%=nameUC%> meta keyword2', '<%=nameUC%> meta keyword3'],
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
