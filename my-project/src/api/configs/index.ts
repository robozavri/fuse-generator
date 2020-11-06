import { Router, Request, Response, NextFunction } from 'express';
import * as configDao from './config.dao';
import * as configParser  from './config.parser';
import * as auth from '../../auth';


const configRouter = Router();

configRouter.get('/', configParser.parseGetByQuery, getByQuery);
configRouter.post('/', auth.isAdmin, configParser.parseCreate, create);
configRouter.put('/:id', auth.isAdmin, configParser.parseUpdate, update);
configRouter.delete('/:id', auth.isAdmin, destroy);
configRouter.patch('/positions', configParser.parseUpdatePositions, updatePositions);

export default configRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const configData = await configDao.getByQuery(query);
    res.json(configData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await configDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await configDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function updatePositions(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await payload.items.map((item: any) => {
      configDao.update(item._id, { position: item.position });
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await configDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}