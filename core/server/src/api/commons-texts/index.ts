import { Router, Request, Response, NextFunction } from 'express';
import * as commonsTextsDao from './commons-texts.dao';
import * as commonsTextsParser  from './commons-texts.parser';
import * as auth from '../../auth';
import { sendClientMessage } from './commons-texts.messages';


const commonsTextsRouter = Router();

commonsTextsRouter.get('/one', getOne);
commonsTextsRouter.put('/one', auth.isAdmin, commonsTextsParser.parseUpdate, update);
commonsTextsRouter.post('/email/send', commonsTextsParser.parseSendEmail, sendEmail);

export default commonsTextsRouter;

// =============== GET ===============

async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await commonsTextsDao.getOne();
    res.json(data);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await commonsTextsDao.update(payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function sendEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const data: any = await commonsTextsDao.getOne();
    await sendClientMessage(data.contact.adminEmail, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
