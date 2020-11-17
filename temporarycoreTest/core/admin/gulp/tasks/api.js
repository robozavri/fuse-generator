'use strict';
import * as _ from 'lodash';
import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import paths from '../paths';
import { fields } from './fields'
import { generateSchema, generateKeywordSearch, generateBaseProps, generateSingleStub } from './api/generator'
import {getNameFromArgv,  getDirFromArgv, firstUC, firstLC, plural, singular} from '../helpers';
const $ = require('gulp-load-plugins')();

// commons
gulp.task('api-commons', (done) => {
  runSequence('generateApiCommon', 'generateCommonStub', done);
});

gulp.task('generateApiCommon', () => {
  const name = getNameFromArgv();
  const dir = getDirFromArgv();
  const src = paths.generatorTemplates.api.common;
  const dest = path.join(paths.server.src, 'api' + (dir ? '/' + dir : ''), plural(name));
  return insertCommonsTemplates(name, src, dest, true);
});

function insertCommonsTemplates(name, src, dest) { 
  const singleStub = generateSingleStub(fields);

  return gulp.src(src)
    .pipe($.template({
      nameUC: firstUC(name),
      nameFUCCamel: firstUC(_.camelCase(name)),
      nameCamel: _.camelCase(name),
      nameLC: firstLC(name),
      namePlural: plural(name),
      namePluralLC: plural(name.toLowerCase()),
      namePluralFUC: firstUC(plural(name)),
      nameSingularLC: singular(name),
      nameSingularFUC: firstUC(singular(name)),
      schema: generateSchema(fields),
      keywords: generateKeywordSearch(fields),
      keybaseProps: generateBaseProps(fields),
      objectNames: singleStub.objectNames,
      stubObjectMethods: singleStub.stubObjectMethods,
      objectNamesWithI: singleStub.objectNamesWithI,
      defField: ''
    }, {
      interpolate: /<%=([\s\S]+?)%>/g
    }))
    .pipe($.rename(path => {
      path.basename = getFileName(name, path.basename);
    }))
    .pipe(gulp.dest(dest));
}

gulp.task('generateCommonStub', () => {
  const name = getNameFromArgv();
  const src = paths.generatorTemplates.stub;
  const dest = path.join(paths.server.src, 'stubs');
  return insertTemplates(name, src, dest, true);
});


// articles with edit page
gulp.task('api', (done) => {
  runSequence('generateApi', 'generateStub', done);
});

gulp.task('generateApi', () => {
  const name = getNameFromArgv();
  const dir = getDirFromArgv();
  const src = paths.generatorTemplates.api.standart;
  const dest = path.join(paths.server.src, 'api' + (dir ? '/' + dir : ''), plural(name));
  return insertTemplates(name, src, dest, true);
});

gulp.task('generateStub', () => {
  const name = getNameFromArgv();
  const src = paths.generatorTemplates.stub;
  const dest = path.join(paths.server.src, 'stubs');
  return insertTemplates(name, src, dest, true);
});

function insertTemplates(name, src, dest) { 
  const singleStub = generateSingleStub(fields);

  return gulp.src(src)
    .pipe($.template({
      nameFUCCamel: firstUC(_.camelCase(name)),
      nameCamel: _.camelCase(name),
      nameUC: firstUC(name),
      nameLC: firstLC(name),
      namePlural: plural(name),
      namePluralLC: plural(name.toLowerCase()),
      namePluralFUC: firstUC(plural(name)),
      nameSingularLC: singular(name),
      nameSingularFUC: firstUC(singular(name)),
      schema: generateSchema(fields),
      keywords: generateKeywordSearch(fields),
      keybaseProps: generateBaseProps(fields),
      objectNames: singleStub.objectNames,
      stubObjectMethods: singleStub.stubObjectMethods,
      objectNamesWithI: singleStub.objectNamesWithI,
      defField: ''
    }, {
      interpolate: /<%=([\s\S]+?)%>/g
    }))
    .pipe($.rename(path => {
      path.basename = getFileName(name, path.basename);
    }))
    .pipe(gulp.dest(dest));
}

function getFileName(name, basename) {
  if (basename.includes('namePlural')) {
    return basename.replace('namePlural', plural(name));
  } else if (basename.includes('nameUC')) {
    return basename.replace('nameUC', firstUC(name));
  } else {
    return basename.replace('name', name);
  }
}