import * as _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { parseOffsetAndLimit } from '../../helpers/parser-utils';

// =============== GET ===============

export function parseGetByQuery(req: Request, res: Response, next: NextFunction) {
  const { query } = req;
  req.query = {
    ...parseOffsetAndLimit(query),
    find: {
      ...parseId(query),
    },
    ...parseSearch(query),
  };
  next();
}

function parseId({ _id }: { _id?: any }) {
  return _id ? { _id } : {};
}

function parseSearch({ keyword }: { keyword?: string }) {
  return keyword ? {
    or: [
      { comment: { $regex: keyword, $options: 'i' } },
      { 'title.en': { $regex: keyword, $options: 'i' } },
      { 'title.ge': { $regex: keyword, $options: 'i' } },
      { 'title.ru': { $regex: keyword, $options: 'i' } },
      { 'description.en': { $regex: keyword, $options: 'i' } },
      { 'description.ge': { $regex: keyword, $options: 'i' } },
      { 'description.ru': { $regex: keyword, $options: 'i' } },
    ],
  } : {};
}

// =============== POST ===============

export function parseCreate(req: Request, res: Response, next: NextFunction) {
  req.body = parseBaseProps(req.body),
  next();
}

export function parseUpdate(req: Request, res: Response, next: NextFunction) {
  req.body = {
    _id: req.body._id,
    ...parseBaseProps(req.body)
  };
  next();
}

function parseBaseProps(body: any) {
  return _.pick(body, [
    'comment',
    'title',
    'description',
    'thumbnail',
    'createdAt',
    'meta',
    'position',
  ]);
}
