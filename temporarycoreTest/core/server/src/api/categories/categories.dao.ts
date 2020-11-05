import Model from './categories.model';
import Promise from 'bluebird';
import { assertFound } from '../../helpers/db-result-handler';

// =============== Getters ===============

export function getByQuery({find = {}, populate = '', or = [{}], sort = {_id: -1}, offset = 0, limit = 10}) {
  return Promise.all([
    Model.find(find).populate(populate).lean().or(or).sort(sort).skip(offset).limit(limit),
    Model.find(find).lean().or(or).countDocuments()
  ]).spread((items: any[], numTotal: number) => ({items, numTotal}));
}

export function getById(id: any): any {
  return Model.findOne({_id: id}).lean()
    .then(assertFound(`Categories (id ${id}) was not found`));
}


export function find(find: any, select: any = {}): any {
  return Model.find(find).select(select).lean()
    .then(assertFound(`Categories was not found`));
}

// =============== Setters ===============

export function findOne(data: any, fields: any = {}) {
  return Model.findOne(data, fields);
}

export function create(data: any) {
  return Model.create(data);
}

export function insertMany(data: any) {
  return Model.insertMany(data);
}

export function updateOne(id: any, data: any) { console.log('updateOne dao:', data)
  return Model.findOneAndUpdate({_id: id}, {$set: data}) 
    .then(assertFound(`Could not update categories (id ${id})`));
}

export function update(idData: any, data: any, options: any = {multi: true}) {
  return Model.update(idData, {$set: data}, options)
    .then(assertFound(`Could not update categories (id ${idData})`));
}

export function destroy(id: any) {
  return Model.findOneAndRemove({_id: id})
    .then(assertFound(`Could not destroy categories (id ${id})`));
}

export function destroyAll(data: any = {}) {
  return Model.deleteMany(data);
}

