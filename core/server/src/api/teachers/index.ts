import { Router, Request, Response, NextFunction } from 'express';
import * as teachersDao from './teachers.dao';
import * as teachersParser  from './teachers.parser';
import * as auth from '../../auth';


const teachersRouter = Router();

teachersRouter.get('/', teachersParser.parseGetByQuery, getByQuery);
teachersRouter.post('/', auth.isAdmin, teachersParser.parseCreate, create);
teachersRouter.put('/:id', auth.isAdmin, teachersParser.parseUpdate, update);
teachersRouter.delete('/:id', auth.isAdmin, destroy);

export default teachersRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const teachersData = await teachersDao.getByQuery(query);
    res.json(teachersData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await teachersDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const payload = req.body;
    await teachersDao.update(id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await teachersDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}