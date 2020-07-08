import * as _ from 'lodash';
import { cloneStub }  from '../helpers/stub-helpers';

const <%=nameUC%>Stub = {
  <%=defField%>: '<%=defField%>',
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
  }));
}