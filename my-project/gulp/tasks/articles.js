'use strict';

import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import paths from '../paths';
import * as _ from 'lodash';
import { fields } from './fields';
import { generateListPropeties } from './adminHelper';
import { generateEmptyObjModal } from './emptyObjGenerator';
import { generateFormGroup, generateImageMethods, generateImagesMethods, generateFormEmptyObjects } from './formGroupGenerator';
import { generateFormHtml } from './htmlFormGenerator';
import { generateInterface } from './generateInterface';
import {getNameFromArgv, getDefFieldsFromArgv, getDirFromArgv, firstUC, firstLC, plural, singular} from '../helpers';
const $ = require('gulp-load-plugins')();
const argv = $.util.env;


gulp.task('articles', (done) => {
  runSequence('generateArticlesAdminComponent', 'generateHttp', 'generateModel', done);
});


gulp.task('generateArticlesAdminComponent', () => {
    insertArticleMainTemplate();
});

function insertArticleMainTemplate(){
    const name = getNameFromArgv();
    // const fields = getDefFieldsFromArgv();
    const src = paths.adminGeneratorTemplates.articles;
    const dest = path.join(paths.admin.adminModules, _.kebabCase(plural(name)));
    return insertArticlesTemplate(name, src, dest, fields);
}

gulp.task('generateHttp', () => {
  const name = getNameFromArgv();
  const src = paths.adminGeneratorTemplates.http;
  const dest = paths.admin.http; 
  return insertHttpTemplate(name, src, dest, true);
});

gulp.task('generateModel', () => {
  const name = getNameFromArgv();
  // const fields = getDefFieldsFromArgv();
  const src = paths.adminGeneratorTemplates.model;
  const dest = paths.admin.model;
  return insertModelTemplate(name, src, dest, fields);
});

function insertArticlesTemplate(name, src, dest, fields) {
    const imagesMethods = generateImagesMethods(fields);
    const listProperties = generateListPropeties();
    
    return gulp.src(src)
        .pipe($.template({
            nameUC: firstUC(name),
            nameLC: firstLC(name),
            namePlural: plural(name),
            namePluralLC: plural(name.toLowerCase()),
            namePluralFUC: firstUC(plural(name)),
            nameSingularLC: singular(name),
            nameSingularFUC: firstUC(singular(name)),
            singularFileName: _.kebabCase(singular(name)),
            pluralFileName: _.kebabCase(plural(name)),
            formModalEmptyObj: generateEmptyObjModal(fields),
            formGroup: generateFormGroup(fields),
            formEmptyObjects: generateFormEmptyObjects(fields),
            formHtml: generateFormHtml(fields),
            imageMethods: generateImageMethods(fields),
            imagesMethods: imagesMethods.methods,
            imagesProperties: imagesMethods.properties,
            listColumnsHtml: listProperties.template,
            listColumntTitles: listProperties.columns
        }, {
            interpolate: /<%=([\s\S]+?)%>/g
        }))
        .pipe($.rename(path => {
            path.basename = getFileName(name, path.basename);
        }))
        .pipe(gulp.dest(dest));
}

function insertModelTemplate(name, src, dest, fields) {
  return gulp.src(src)
    .pipe($.template({
      nameUC: firstUC(name),
      nameLC: firstLC(name),
      namePlural: plural(name),
      nameSingularUC: firstUC(singular(name)),
      singularFileName: _.kebabCase(singular(name)),
      pluralFileName: _.kebabCase(plural(name)),
      interfaceFields: generateInterface(fields),
    }, {
      interpolate: /<%=([\s\S]+?)%>/g
    }))
    .pipe($.rename(path => {
      path.basename = getFileName(name, path.basename);
    }))
    .pipe(gulp.dest(dest));
}

function insertHttpTemplate(name, src, dest) {
  return gulp.src(src)
    .pipe($.template({
      nameUC: firstUC(name),
      nameLC: firstLC(name),
      namePlural: plural(name),
      nameSingular: singular(name),
      nameSingularUC: firstUC(singular(name)),
      singularFileName: _.kebabCase(singular(name)),
      pluralFileName: _.kebabCase(plural(name)),
    }, {
      interpolate: /<%=([\s\S]+?)%>/g
    }))
    .pipe($.rename(path => {
      path.basename = getFileName(name, path.basename);
    }))
    .pipe(gulp.dest(dest));
}

function getFileName(name, basename) {
  if (basename.includes('pluralFileName')) {
    return basename.replace('pluralFileName', _.kebabCase(plural(name)));
  } else if (basename.includes('singularFileName')) {
    return basename.replace('singularFileName', _.kebabCase(singular(name)));
  } else if (basename.includes('nameUC')) {
    return basename.replace('nameUC', firstUC(name));
  } else {
    return basename.replace('name', name);
  }
}
