import { Router, Request, Response, NextFunction } from 'express';
import * as fieldsDao from './fields.dao';
import * as fieldsParser  from './fields.parser';
import * as auth from '../../auth';
import { slugify } from '../../helpers/text-helpers';
import * as _ from 'lodash';
// import axios from 'axios';
import Model from './fields.model';


const fieldsRouter = Router();

fieldsRouter.get('/', fieldsParser.parseGetByQuery, getByQuery);
fieldsRouter.post('/', fieldsParser.parseCreate, create);
fieldsRouter.put('/:id', fieldsParser.parseUpdate, update);
fieldsRouter.delete('/:id', destroy);

export default fieldsRouter;

// =============== GET ===============




async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const data = await fieldsDao.getByQuery(query);
    res.json(data);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    // catId ში უნდა ჩაეწეროს ბოლოს
    const result = await fieldsDao.create(payload);
    res.status(201).send({ field: result._id });
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const payload = req.body;
    payload.parent = payload.parent === '' || payload.parent === null ? undefined : payload.parent;
    await fieldsDao.updateOne(id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    let result;
    const { id } = req.params;
    const err = await fieldsDao.destroy(id);
    if (err) {
      result = await fieldsDao.destroyAll({'ancestors._id': id});
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (e) {
    next(e);
  }
}
