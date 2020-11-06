import { Router, Request, Response, NextFunction } from 'express';
import * as configDao from './config.dao';
import * as configParser  from './config.parser';
import * as auth from '../../auth';


const configRouter = Router();

configRouter.get('/one', getOne);
configRouter.put('/one', auth.isAdmin, configParser.parseUpdate, update);

export default configRouter;

// =============== GET ===============

async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await configDao.getOne();
    res.json(data);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body; console.log('payload', payload)
    await configDao.update(payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
