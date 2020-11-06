import logger from '../helpers/logger';
import config from '../config/environment';
import { roles } from '../constants/user';
import * as _ from 'lodash';

import * as UserDao from '../api/users/user.dao';
import * as CommonDao from '../api/commons/common.dao';
import * as MetaDao from '../api/metas/meta.dao';
import * as ArticleDao from '../api/articles/article.dao';
import * as EventDao from '../api/events/event.dao';
import * as NewsDao from '../api/news/news.dao';
import * as ModulesDao from '../api/modules/modules.dao';
import * as ConfigsDao from '../api/configs/config.dao';

import * as UserStub from '../stubs/user.stub';
import * as CommonStub from '../stubs/common.stub';
import * as MetaStub from '../stubs/meta.stub';
import * as ArticleStub from '../stubs/article.stub';
import * as EventStub from '../stubs/event.stub';
import * as NewsStub from '../stubs/news.stub';
import * as ModulesStub from '../stubs/modules.stub';
import * as ConfigStub from '../stubs/config.stub';


export async function seedDB() {
  const { seedDB, env } = config;
  if (!seedDB) return;
  if (env === 'development') {
    await clearDBDevelopment();
    await seedDBDevelopment();
  }
  if (env === 'production') {
    await clearDBProduction();
    await seedDBProduction();
  }
}

export async function seedDBDevelopment() {
  await UserDao.insertMany(getAdmin());
  await MetaDao.create(MetaStub.getSingle());
  await CommonDao.create(CommonStub.getSingle());
  await ArticleDao.insertMany(ArticleStub.getMany(11));
  await EventDao.insertMany(EventStub.getMany(11));
  await NewsDao.insertMany(NewsStub.getMany(11));
  await ModulesDao.insertMany(ModulesStub.getMany(11));
  await ConfigsDao.create(ConfigStub.getSingle(11));

  logger.info('Seed DB development completed');
}

export async function seedDBProduction() {
  await UserDao.insertMany(getAdmin());
  await MetaDao.create(MetaStub.getSingle());
  await CommonDao.create(CommonStub.getSingle());
  await ArticleDao.insertMany(ArticleStub.getMany(11));
  await EventDao.insertMany(EventStub.getMany(11));

  logger.info('Seed DB production completed');
}

export async function clearDBDevelopment() {
  await UserDao.destroyAll();
  await MetaDao.destroyAll();
  await CommonDao.destroyAll();
  await ArticleDao.destroyAll();
  await EventDao.destroyAll();
  await ModulesDao.destroyAll();
}

export async function clearDBProduction() {
  await UserDao.destroyAll();
  await MetaDao.destroyAll();
  await CommonDao.destroyAll();
  await ArticleDao.destroyAll();
  await EventDao.destroyAll();
}

function getAdmin() {
  return [
    UserStub.getSingle({
      email: 'admin@project.com',
      name: 'Admin',
      role: roles.ADMIN,
      isActivated: true,
    })
  ];
}