import { Router, Request, Response, NextFunction } from 'express';
import * as videosDao from './videos.dao';
import * as videosParser  from './videos.parser';
import * as auth from '../../auth';


const videosRouter = Router();

videosRouter.get('/', videosParser.parseGetByQuery, getByQuery);
videosRouter.post('/', auth.isAdmin, videosParser.parseCreate, create);
videosRouter.put('/:id', auth.isAdmin, videosParser.parseUpdate, update);
videosRouter.delete('/:id', auth.isAdmin, destroy);

export default videosRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const videosData = await videosDao.getByQuery(query);
    res.json(videosData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await videosDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const payload = req.body;
    await videosDao.update(id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await videosDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}