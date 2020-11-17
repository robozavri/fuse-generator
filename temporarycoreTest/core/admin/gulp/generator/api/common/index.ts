import { Router, Request, Response, NextFunction } from 'express';
import * as <%=nameCamel%>Dao from './<%=nameLC%>.dao';
import * as <%=nameCamel%>Parser  from './<%=nameLC%>.parser';
import * as auth from '../../auth';
import { sendClientMessage } from './<%=nameLC%>.messages';


const <%=nameCamel%>Router = Router();

<%=nameCamel%>Router.get('/one', getOne);
<%=nameCamel%>Router.put('/one', auth.isAdmin, <%=nameCamel%>Parser.parseUpdate, update);
<%=nameCamel%>Router.post('/email/send', <%=nameCamel%>Parser.parseSendEmail, sendEmail);

export default <%=nameCamel%>Router;

// =============== GET ===============

async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await <%=nameCamel%>Dao.getOne();
    res.json(data);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await <%=nameCamel%>Dao.update(payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function sendEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const data: any = await <%=nameCamel%>Dao.getOne();
    await sendClientMessage(data.contact.adminEmail, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
