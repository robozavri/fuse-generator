import Model from './commons-texts.model';
import Promise from 'bluebird';
import { assertFound } from '../../helpers/db-result-handler';

// =============== Getters ===============

export function getOne() {
  return Model.findOne({}).lean()
    .then(assertFound(`commonsTexts  was not found`));
}

// =============== Setters ===============

export function create(data: any) {
  return Model.create(data);
}

export function update(data: any) {
  return Model.updateMany({}, { $set: data });
}

export function destroyAll() {
  return Model.deleteMany({});
}

