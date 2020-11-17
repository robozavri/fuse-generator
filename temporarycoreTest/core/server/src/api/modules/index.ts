import { Router, Request, Response, NextFunction } from 'express';
import * as modulesDao from './modules.dao';
import * as fieldsDao from '../fields/fields.dao';
import * as configDao from '../configs/config.dao';
import * as modulesParser  from './modules.parser';
import * as auth from '../../auth';
import * as _ from 'lodash';
import { exec } from 'child_process';


const modulesRouter = Router();

modulesRouter.get('/', modulesParser.parseGetByQuery, getByQuery);
modulesRouter.post('/', auth.isAdmin, modulesParser.parseCreate, create);
modulesRouter.post('/generate',  modulesParser.parseGenerate, generate);
modulesRouter.post('/fields', getPreparedFields);
modulesRouter.put('/:id', auth.isAdmin, modulesParser.parseUpdate, update);
modulesRouter.delete('/:id', auth.isAdmin, destroy);
modulesRouter.patch('/positions', modulesParser.parseUpdatePositions, updatePositions);

export default modulesRouter;

const listFields: any = {};
const refFields: any = {};
const selectFields: any = {};

// recursive search fub fields and build fields tree
function findChild(fields: any, parentId: string) {
  let preparedField: any = {};
  const childs = _.filter(fields, { parent: parentId });
  if (childs.length === 0) {
    return false;
  }

  childs.map((childField) => {
    const subChilds = _.filter(fields, { parent: childField._id });
    let preparedSubField: any = {};

    if (subChilds.length === 0) {
      preparedField[childField.name] = childField.fieldType;
      return false;
    }
    subChilds.map((subChildField) => {
      preparedSubField[subChildField.name] = subChildField.fieldType;
    });
    preparedField[childField.name] = preparedSubField;
  });
  return preparedField; 
}

function detectRefAndSelectTypes(field: any) {
  if (field.displayToList === true) {
    listFields[field.name] = field.fieldType;
  }
  switch (field.fieldType) {
    case 'Reference' : 
    refFields[field.name] = {
      reference: field.reference,
      referenceType: field.referenceType,
      value: field.value,
      displayFieldName: field.displayFieldName,
    };
    case 'Select' : 
    selectFields[field.name] = {
      selectType: field.selectType,
      values: field.values
    };
  }
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


// =============== POST ===============
async function generate(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const module = await modulesDao.getById(payload._id);

    // exec(`gulp generate --moduleId ${payload._id}`, (error, stdout, stderr) => {
    //     if (error) {
    //         console.log(`error: ${error.message}`);
    //         return;
    //     }
    //     if (stderr) {
    //         console.log(`stderr: ${stderr}`);
    //         return;
    //     }
    //     console.log(`stdout: ${stdout}`);
    // });

    exec(`cd ../admin && gulp generate --moduleId ${payload._id}`, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
  });
  
    res.json(module);
  } catch (e) {
    next(e);
  }
}

async function getPreparedFields(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const module = await modulesDao.getById(payload._id);
    const fieldsData = await fieldsDao.getByQuery({ find: { module: payload._id}, limit: 1000});
    const configs = await configDao.getOne();
    const fields = fieldsData.items;

    const nestedFields: any = {};

    fields.map((field) => {
      detectRefAndSelectTypes(field);
      if (!_.has(field, 'parent') || _.has(field, 'parent') === null) {
        const child = findChild(fields, field._id);
        if (!child) {
          nestedFields[field.name] = field.fieldType;
        } else {
          nestedFields[field.name] = child;
        }
      }
    });

    // res.json(nestedFields);
    res.json({
      listFields: listFields,
      refFields: refFields,
      selectFields: selectFields,

      configs: configs,
      module: module,
      fields: nestedFields,
    } );
    // res.sendStatus(200);
  } catch (e) {
    console.log(e);
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