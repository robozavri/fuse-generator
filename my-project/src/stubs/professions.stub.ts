import * as _ from 'lodash';
import { cloneStub, generateImage, generateSocials }  from '../helpers/stub-helpers';



function getFullNameObject(i: number = 0): any {
    return 'fullName';
}

function getEmailObject(i: number = 0): any {
    return 'email';
}

function getPhoneNumberObject(i: number = 0): any {
    return 'phoneNumber';
}

function getSubjectObject(i: number = 0): any {
    return ;
}

function getLanguageObject(i: number = 0): any {
    return 'language';
}

function getSpotsObject(i: number = 0): any {
    return 'spots';
}

function getPriceObject(i: number = 0): any {
    return 'price';
}

function getAdditionalNoteObject(i: number = 0): any {
    return 'additionalNote';
}

const ProfessionsStub = {
    fullName: getFullNameObject(),
    email: getEmailObject(),
    phoneNumber: getPhoneNumberObject(),
    subject: getSubjectObject(),
    language: getLanguageObject(),
    spots: getSpotsObject(),
    price: getPriceObject(),
    additionalNote: getAdditionalNoteObject(),
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(ProfessionsStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    fullName: getFullNameObject(i),
    email: getEmailObject(i),
    phoneNumber: getPhoneNumberObject(i),
    subject: getSubjectObject(i),
    language: getLanguageObject(i),
    spots: getSpotsObject(i),
    price: getPriceObject(i),
    additionalNote: getAdditionalNoteObject(i),
  }));
}
