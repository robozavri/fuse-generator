import { Router, Request, Response, NextFunction } from 'express';
import * as modulesDao from './modules.dao';
import * as fieldsDao from '../fields/fields.dao';
import * as modulesParser  from './modules.parser';
import * as auth from '../../auth';


const modulesRouter = Router();

modulesRouter.get('/', modulesParser.parseGetByQuery, getByQuery);
modulesRouter.post('/', auth.isAdmin, modulesParser.parseCreate, create);
modulesRouter.post('/generate', auth.isAdmin, modulesParser.parseGenerate, generate);
modulesRouter.put('/:id', auth.isAdmin, modulesParser.parseUpdate, update);
modulesRouter.delete('/:id', auth.isAdmin, destroy);
modulesRouter.patch('/positions', modulesParser.parseUpdatePositions, updatePositions);

export default modulesRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const modulesData = await modulesDao.getByQuery(query);
    res.json(modulesData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function generate(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const module = await modulesDao.getById(payload._id);
    const fields = await fieldsDao.getByQuery({ find: { module: payload._id}, limit: 1000});
    console.log('module', module);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await modulesDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await modulesDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function updatePositions(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await payload.items.map((item: any) => {
      modulesDao.update(item._id, { position: item.position });
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await modulesDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}