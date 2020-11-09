import { Router, Request, Response, NextFunction } from 'express';
import * as modulesDao from './modules.dao';
import * as fieldsDao from '../fields/fields.dao';
import * as configDao from '../configs/config.dao';
import * as modulesParser  from './modules.parser';
import * as auth from '../../auth';
import * as _ from 'lodash';

const modulesRouter = Router();

modulesRouter.get('/', modulesParser.parseGetByQuery, getByQuery);
modulesRouter.post('/', auth.isAdmin, modulesParser.parseCreate, create);
modulesRouter.post('/generate', auth.isAdmin, modulesParser.parseGenerate, generate);
modulesRouter.post('/fields', getFields);
modulesRouter.put('/:id', auth.isAdmin, modulesParser.parseUpdate, update);
modulesRouter.delete('/:id', auth.isAdmin, destroy);
modulesRouter.patch('/positions', modulesParser.parseUpdatePositions, updatePositions);

export default modulesRouter;

function findChild(fields: any, parentId: string) {
  const field = _.find(fields, { parent: parentId });
  if (!field) {
    return;
  }
  const subChild = findChild(fields, field._id);
  if (!subChild) {
    return field;
  }
  field[subChild.name] = subChild;
  // console.log('founded field', field);
  return field;
}


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

async function getFields(req: Request, res: Response, next: NextFunction) {
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
    const fieldsData = await fieldsDao.getByQuery({ find: { module: payload._id}, limit: 1000});
    const configs = await configDao.getOne();
    const fields = fieldsData.items;

    const nestedFields = [Array];

    fields.map((field) => {
      if (field.parent === null) {
        // console.log('passed parent id: ',  field._id);
        const child =  findChild(fields, field._id);
        if (!child) {
          nestedFields.push(field);
        } else {
          field[child.name] = child;
          nestedFields.push(field);
        }
      }
    });

    console.log('nestedFields', nestedFields);
    // console.log('module', module);
    // console.log('fields', fieldsData);

    // res.json(nestedFields);
    res.json(nestedFields);
    // res.json({
    //   configs: configs,
    //   module: module,
    //   fields: fieldsData,
    // } );
    // res.sendStatus(200);
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