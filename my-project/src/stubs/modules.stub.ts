import * as _ from 'lodash';
import { cloneStub, generateImage, generateSocials }  from '../helpers/stub-helpers';



function getTitleObject(i: number = 0): any {
    return 'title';
}

function getCmdTitleObject(i: number = 0): any {
    return 'cmdTitle';
}

function getEditPageObject(i: number = 0): any {
    return false;
}

const ModulesStub = {
    title: getTitleObject(),
    cmdTitle: getCmdTitleObject(),
    editPage: getEditPageObject(),
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(ModulesStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    title: getTitleObject(i),
    cmdTitle: getCmdTitleObject(i),
    editPage: getEditPageObject(i),
  }));
}
