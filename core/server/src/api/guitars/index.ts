import { Router, Request, Response, NextFunction } from 'express';
import * as guitarsDao from './guitars.dao';
import * as guitarsParser  from './guitars.parser';
import * as auth from '../../auth';


const guitarsRouter = Router();

guitarsRouter.get('/', guitarsParser.parseGetByQuery, getByQuery);
guitarsRouter.post('/', auth.isAdmin, guitarsParser.parseCreate, create);
guitarsRouter.put('/:id', auth.isAdmin, guitarsParser.parseUpdate, update);
guitarsRouter.delete('/:id', auth.isAdmin, destroy);

export default guitarsRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const guitarsData = await guitarsDao.getByQuery(query);
    res.json(guitarsData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await guitarsDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await guitarsDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await guitarsDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}