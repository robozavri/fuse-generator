import { Router, Request, Response, NextFunction } from 'express';
import * as <%=nameLC%>Dao from './<%=nameLC%>.dao';
import * as <%=nameLC%>Parser  from './<%=nameLC%>.parser';
import * as auth from '../../auth';
import { sendClientMessage } from './common.messages';
import { langs } from '../../constants/common';


const <%=nameLC%>Router = Router();

<%=nameLC%>Router.get('/one', getOne);
<%=nameLC%>Router.put('/one', auth.isAdmin, <%=nameLC%>Parser.parseUpdate, update);
<%=nameLC%>Router.post('/email/send', <%=nameLC%>Parser.parseSendEmail, sendEmail);

export default <%=nameLC%>Router;

// =============== GET ===============

async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await <%=nameLC%>Dao.getOne();
    res.json(data);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await <%=nameLC%>Dao.update(payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function sendEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const commonData: any = await <%=nameLC%>Dao.getOne();
    await sendClientMessage(commonData.contact.adminEmail, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
