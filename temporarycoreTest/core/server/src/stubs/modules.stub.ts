import * as _ from 'lodash';
import { cloneStub }  from '../helpers/stub-helpers';

const moduleTypes = [
  'articles',
  'common',
];

function getTitleObject(i: number = 0): any {
    return `title ${i}`;
}

function getCmdTitleObject(i: number = 0): any {
    return `cmdTitle ${i}`;
}

function getIsGeneratedObject(i: number = 0): any {
    return false;
}

function getModuleTypeObject(i: number = 0): any {
    return moduleTypes[Math.floor(Math.random() * moduleTypes.length)];
}

function getEditPageObject(i: number = 0): any {
    return false;
}

const ModulesStub = {
    title: getTitleObject(),
    cmdTitle: getCmdTitleObject(),
    moduleType: getModuleTypeObject(),
    editPage: getEditPageObject(),
    isGenerated: getIsGeneratedObject(),
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
    moduleType: getModuleTypeObject(i),
    editPage: getEditPageObject(i),
    isGenerated: getIsGeneratedObject(i),
  }));
}
