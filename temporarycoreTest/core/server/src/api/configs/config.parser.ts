import * as _ from 'lodash';
import { Request, Response, NextFunction } from 'express';

// =============== POST ===============


export function parseUpdate(req: Request, res: Response, next: NextFunction) {
  req.body = parseCommon(req.body);
  next();
}


function parseCommon(body: any) {
  const parsedBody: any = {};

  if (body.langs) parsedBody.langs = body.langs;

  return parsedBody;
}