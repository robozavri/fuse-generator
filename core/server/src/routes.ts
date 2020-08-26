import express from 'express';
import { Express, Response, Request, NextFunction } from 'express';
import path from 'path';
import config from './config/environment';
import logger from './helpers/logger';
import * as auth from './auth';
import * as locator from './helpers/locator';
import { AppError } from './errors';

import fileRouter from './api/files';
import userRouter from './api/users';
import commonRouter from './api/commons';
import metaRouter from './api/metas';
import articleRouter from './api/articles';
import eventRouter from './api/events';
import appLogsRouter from './api/appLogs';
import newsRouter from './api/news';
import booksRouter from './api/books';
import authorsRouter from './api/authors';
import videosRouter from './api/videos';
import carsRouter from './api/cars';
import compiutersRouter from './api/compiuters';
import blogCategoriesRouter from './api/blogCategories';
import blogRouter from './api/blogs';


import { getMetaTags } from './helpers/metaTagsHelper';

export function initRoutes(app: Express) {
  app.use(express.static(path.join(config.paths.uploads)));

  app.get('/admin', renderAdminHtml);
  app.get('/', renderClientHtml);
  app.use(express.static(path.join(config.root, '../client/dist')));
  app.use(express.static(path.join(config.root, '../admin/dist')));
  app.set('views', path.join(config.root, '../client/dist'));
  app.set('views', path.join(config.root, '../admin/dist'));

  app.use(auth.setUser);
  app.use(locator.setLocation);

  app.use('/api/users', userRouter);
  app.use('/api/files', fileRouter);
  app.use('/api/commons', commonRouter);
  app.use('/api/metas', metaRouter);
  app.use('/api/articles', articleRouter);
  app.use('/api/events', eventRouter);
  app.use('/api/appLogs', appLogsRouter);
  app.use('/api/news', newsRouter);
  app.use('/api/books', booksRouter);
  app.use('/api/authors', authorsRouter);
  app.use('/api/videos', videosRouter);
  app.use('/api/cars', carsRouter);
  app.use('/api/compiuters', compiutersRouter);
  app.use('/api/blog-categories', blogCategoriesRouter);
  app.use('/api/blogs', blogRouter);

  app.get('/admin/*', renderAdminHtml);
  app.get('/*', renderClientHtml);

  app.use(handleError);
}

function renderClientHtml(req: Request, res: Response) {
  res.render(path.join(config.root, '../client/dist/index.html'));
}

function renderAdminHtml(req: Request, res: Response) {
  res.render(path.join(config.root, '../admin/dist/index.html'));
}

async function setMetaTags(req: any, res: Response, next: NextFunction) {
  try {
    const { originalUrl: url } = req;
    req.metaTags = await getMetaTags(url);
    next();
  } catch (e) {
    next(e);
  }
}

function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
  try {
    const status = Object(err).httpStatusCode || 500;
    const data = Object(err).data;
    if (data) {
      res.json(data);
    } else {
      res.sendStatus(status);
    }
    if (err instanceof AppError) {
      logger.error(err.message);
    } else {
      logger.error(err);
    }
  } catch (error) {
    logger.error(error);
  }
}
