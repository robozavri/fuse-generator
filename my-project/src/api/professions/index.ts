import { Router, Request, Response, NextFunction } from 'express';
import * as professionDao from './profession.dao';
import * as professionParser  from './profession.parser';
import * as auth from '../../auth';


const professionRouter = Router();

professionRouter.get('/', professionParser.parseGetByQuery, getByQuery);
professionRouter.post('/', auth.isAdmin, professionParser.parseCreate, create);
professionRouter.put('/:id', auth.isAdmin, professionParser.parseUpdate, update);
professionRouter.delete('/:id', auth.isAdmin, destroy);
professionRouter.patch('/positions', professionParser.parseUpdatePositions, updatePositions);

export default professionRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const professionData = await professionDao.getByQuery(query);
    res.json(professionData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await professionDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await professionDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function updatePositions(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await payload.items.map((item: any) => {
      professionDao.update(item._id, { position: item.position });
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await professionDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}