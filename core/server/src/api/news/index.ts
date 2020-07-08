import { Router, Request, Response, NextFunction } from 'express';
import * as newsDao from './news.dao';
import * as newsParser  from './news.parser';
import * as auth from '../../auth';


const newsRouter = Router();

newsRouter.get('/', newsParser.parseGetByQuery, getByQuery);
newsRouter.post('/', auth.isAdmin, newsParser.parseCreate, create);
newsRouter.put('/:id', auth.isAdmin, newsParser.parseUpdate, update);
newsRouter.delete('/:id', auth.isAdmin, destroy);

export default newsRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const newsData = await newsDao.getByQuery(query);
    res.json(newsData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await newsDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await newsDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await newsDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}