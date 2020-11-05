import * as _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { parseOffsetAndLimit } from '../../helpers/parser-utils';
import { slugify } from '../../helpers/text-helpers';

// =============== GET ===============

export function parseGetByQuery(req: Request, res: Response, next: NextFunction) {
  const { query } = req;
  req.query = {
    ...parseOffsetAndLimit(query),
    find: {
      ...parseId(query),
      ...parseSlag(query),
      ...parseParent(query),
    },
    ...parseSearch(query),
    ...parseQueryPopulate(query),
  };
  next();
}

function parseQueryPopulate({ populate }: any) {
  return populate ? { populate } : {};
}

function parseId({ _id }: { _id?: any }) {
  return _id ? { _id } : {};
}

function parseSlag({ slug }: { slug?: any }) {
  return slug ? { slug } : {};
}

function parseParent({ parent }: { parent?: any }) {
  if (parent) {
    return parent === 'null' ? { parent: undefined } : { parent };
  }
  return {};
}

function parseSearch({ keyword }: { keyword?: string }) {
  return keyword ? {
    or: [
      { name: { $regex: keyword, $options: 'i' } },
      { slug: { $regex: keyword, $options: 'i' } },
      { 'title.en': { $regex: keyword, $options: 'i' } },
      { 'title.ge': { $regex: keyword, $options: 'i' } },
      { 'title.ru': { $regex: keyword, $options: 'i' } },
    ],
  } : {};
}

// =============== POST ===============

export function parseCreate(req: Request, res: Response, next: NextFunction) {
  req.body.parent = req.body.parent ? req.body.parent : undefined;
  req.body = parseBaseProps(req.body),
  next();
}

export function parseUpdate(req: Request, res: Response, next: NextFunction) {
  req.body = parseBaseProps(req.body); console.log('parseUpdate dao:', req.body)
  next();
}

function parseBaseProps(body: any) {
  return _.pick(body, [
    'name',
    'parent',
    'module',
    'fieldType',
    'displayToList',
    'selectType',
    'values',
    'reference',
    'referenceType',
    'value',
    'displayFieldName',
  ]);
}