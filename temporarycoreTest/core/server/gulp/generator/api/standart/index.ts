import { Router, Request, Response, NextFunction } from 'express';
import * as <%=nameCamel%>Dao from './<%=nameLC%>.dao';
import * as <%=nameCamel%>Parser  from './<%=nameLC%>.parser';
import * as auth from '../../auth';


const <%=nameCamel%>Router = Router();

<%=nameCamel%>Router.get('/', <%=nameCamel%>Parser.parseGetByQuery, getByQuery);
<%=nameCamel%>Router.post('/', auth.isAdmin, <%=nameCamel%>Parser.parseCreate, create);
<%=nameCamel%>Router.put('/:id', auth.isAdmin, <%=nameCamel%>Parser.parseUpdate, update);
<%=nameCamel%>Router.delete('/:id', auth.isAdmin, destroy);
<%=nameCamel%>Router.patch('/positions', <%=nameCamel%>Parser.parseUpdatePositions, updatePositions);

export default <%=nameCamel%>Router;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const <%=nameCamel%>Data = await <%=nameCamel%>Dao.getByQuery(query);
    res.json(<%=nameCamel%>Data);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await <%=nameCamel%>Dao.create({ ...payload, position: 0 });
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await <%=nameCamel%>Dao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function updatePositions(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await payload.items.map((item: any) => {
      <%=nameCamel%>Dao.update(item._id, { position: item.position });
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await <%=nameCamel%>Dao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}