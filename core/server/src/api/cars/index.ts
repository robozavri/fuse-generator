import { Router, Request, Response, NextFunction } from 'express';
import * as carsDao from './cars.dao';
import * as carsParser  from './cars.parser';
import * as auth from '../../auth';


const carsRouter = Router();

carsRouter.get('/', carsParser.parseGetByQuery, getByQuery);
carsRouter.post('/', auth.isAdmin, carsParser.parseCreate, create);
carsRouter.put('/:id', auth.isAdmin, carsParser.parseUpdate, update);
carsRouter.delete('/:id', auth.isAdmin, destroy);

export default carsRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const carsData = await carsDao.getByQuery(query);
    res.json(carsData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await carsDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await carsDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await carsDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}