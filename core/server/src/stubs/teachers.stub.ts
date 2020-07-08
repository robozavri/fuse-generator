import * as _ from 'lodash';
import { cloneStub }  from '../helpers/stub-helpers';

const TeachersStub = {
  title: 'title',
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(TeachersStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    title: `title_${i}`,
  }));
}