import { Router, Request, Response, NextFunction } from 'express';
import * as professionsDao from './professions.dao';
import * as professionsParser  from './professions.parser';
import * as auth from '../../auth';


const professionsRouter = Router();

professionsRouter.get('/', professionsParser.parseGetByQuery, getByQuery);
professionsRouter.post('/', auth.isAdmin, professionsParser.parseCreate, create);
professionsRouter.put('/:id', auth.isAdmin, professionsParser.parseUpdate, update);
professionsRouter.delete('/:id', auth.isAdmin, destroy);
professionsRouter.patch('/positions', professionsParser.parseUpdatePositions, updatePositions);

export default professionsRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const professionsData = await professionsDao.getByQuery(query);
    res.json(professionsData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await professionsDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await professionsDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function updatePositions(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await payload.items.map((item: any) => {
      professionsDao.update(item._id, { position: item.position });
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await professionsDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}