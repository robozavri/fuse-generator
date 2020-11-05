import { Router, Request, Response, NextFunction } from 'express';
import * as categoriesDao from './categories.dao';
import * as categoriesParser  from './categories.parser';
import * as auth from '../../auth';
import { slugify } from '../../helpers/text-helpers';
import * as _ from 'lodash';
// import axios from 'axios';
import Model from './categories.model';


const categoriesRouter = Router();

categoriesRouter.get('/', categoriesParser.parseGetByQuery, getByQuery);
categoriesRouter.post('/', categoriesParser.parseCreate, create);
categoriesRouter.put('/:id', categoriesParser.parseUpdate, update);
categoriesRouter.delete('/:id', destroy);

export default categoriesRouter;

// =============== GET ===============




async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const categoriesData = await categoriesDao.getByQuery(query);
    res.json(categoriesData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    // catId ში უნდა ჩაეწეროს ბოლოს
    const result = await categoriesDao.create(payload);
    res.status(201).send({ category: result._id });
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const payload = req.body;
    payload.parent = payload.parent === '' || payload.parent === null ? undefined : payload.parent;
    await categoriesDao.updateOne(id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    let result;
    const { id } = req.params;
    const err = await categoriesDao.destroy(id);
    if (err) {
      result = await categoriesDao.destroyAll({'ancestors._id': id});
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (e) {
    next(e);
  }
}
