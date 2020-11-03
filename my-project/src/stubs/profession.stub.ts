import * as _ from 'lodash';
import { cloneStub, generateImage, generateSocials }  from '../helpers/stub-helpers';



function getTitleObject(i: number = 0): any {
    return 'title';
}

function getFullnameObject(i: number = 0): any {
    return 'fullname';
}

function getDescriptionObject(i: number = 0): any {
    return 'description';
}

function getCommentObject(i: number = 0): any {
    return 'comment';
}

const ProfessionStub = {
    title: getTitleObject(),
    fullname: getFullnameObject(),
    description: getDescriptionObject(),
    comment: getCommentObject(),
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(ProfessionStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    title: getTitleObject(i),
    fullname: getFullnameObject(i),
    description: getDescriptionObject(i),
    comment: getCommentObject(i),
  }));
}
