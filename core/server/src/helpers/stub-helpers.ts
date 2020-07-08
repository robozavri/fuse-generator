import * as _ from 'lodash';
import * as uuid from 'uuid';

export function cloneStub(stub?: any, uniqueFields?: any) {
  uniqueFields = uniqueFields || [];
  stub = _.cloneDeep(stub);

  for (const field of uniqueFields) {
    const dot = field.indexOf('.');

    if (dot !== -1) {
      const field1 = field.substring(0, dot);
      const field2 = field.substring(dot + 1);
      stub[field1][field2] = `test-${uuid.v4()}`;
    } else {
      stub[field] = `test-${uuid.v4()}`;
    }
  }
  return stub;
}