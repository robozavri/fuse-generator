import * as _ from 'lodash';
import { cloneStub }  from '../helpers/stub-helpers';



function getLangsObject(i: number = 0): any {
    return ['en', 'ge', 'ru'];
}

const ConfigStub = {
    langs: getLangsObject(),
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(ConfigStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    langs: getLangsObject(i),
  }));
}
