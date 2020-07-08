import { Router, Request, Response, NextFunction } from 'express';
import * as authorsDao from './authors.dao';
import * as authorsParser  from './authors.parser';
import * as auth from '../../auth';


const authorsRouter = Router();

authorsRouter.get('/', authorsParser.parseGetByQuery, getByQuery);
authorsRouter.post('/', auth.isAdmin, authorsParser.parseCreate, create);
authorsRouter.put('/:id', auth.isAdmin, authorsParser.parseUpdate, update);
authorsRouter.delete('/:id', auth.isAdmin, destroy);

export default authorsRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const authorsData = await authorsDao.getByQuery(query);
    res.json(authorsData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await authorsDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await authorsDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await authorsDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}