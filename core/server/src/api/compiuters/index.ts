import { Router, Request, Response, NextFunction } from 'express';
import * as compiutersDao from './compiuters.dao';
import * as compiutersParser  from './compiuters.parser';
import * as auth from '../../auth';


const compiutersRouter = Router();

compiutersRouter.get('/', compiutersParser.parseGetByQuery, getByQuery);
compiutersRouter.post('/', auth.isAdmin, compiutersParser.parseCreate, create);
compiutersRouter.put('/:id', auth.isAdmin, compiutersParser.parseUpdate, update);
compiutersRouter.delete('/:id', auth.isAdmin, destroy);

export default compiutersRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const compiutersData = await compiutersDao.getByQuery(query);
    res.json(compiutersData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await compiutersDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await compiutersDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await compiutersDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}