'use strict';

import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import paths from '../paths';
import {getNameFromArgv, getDefFieldFromArgv, getDirFromArgv, firstUC, firstLC, plural, singular} from '../helpers';
const $ = require('gulp-load-plugins')();
const argv = $.util.env;


gulp.task('products', (done) => {
  runSequence('generateProductsAdminComponent', 'generateHttp', 'generateModel', done);
});

gulp.task('generateProductsAdminComponent', () => {
    insertProductsMainTemplate();
    insertProductMainTemplate();
});

function insertProductsMainTemplate(){
    const name = getNameFromArgv();
    const src = paths.adminGeneratorTemplates.products;
    const dest = path.join(paths.admin.adminModules, plural(name));
    return insertProductsTemplate(name, src, dest);
}

function insertProductMainTemplate(){
  const name = getNameFromArgv();
  const src = paths.adminGeneratorTemplates.product;
  const dest = path.join(paths.admin.adminModules, singular(name));
  return insertProductsTemplate(name, src, dest);
}

gulp.task('generateHttp', () => {
  const name = getNameFromArgv();
  const src = paths.adminGeneratorTemplates.http;
  const dest = paths.admin.http;
  return insertHttpTemplate(name, src, dest, true);
});

gulp.task('generateModel', () => {
  const name = getNameFromArgv();
  const src = paths.adminGeneratorTemplates.model;
  const dest = paths.admin.model;
  return insertModelTemplate(name, src, dest);
});

function insertProductsTemplate(name, src, dest) {
    return gulp.src(src)
        .pipe($.template({
            nameUC: firstUC(name),
            nameLC: firstLC(name),
            namePlural: plural(name),
            namePluralLC: plural(name.toLowerCase()),
            namePluralFUC: firstUC(plural(name)),
            nameSingularLC: singular(name),
            nameSingularFUC: firstUC(singular(name)),
            defField: getDefFieldFromArgv()
        }, {
            interpolate: /<%=([\s\S]+?)%>/g
        }))
        .pipe($.rename(path => {
            path.basename = getFileName(name, path.basename);
        }))
        .pipe(gulp.dest(dest));
}

function insertModelTemplate(name, src, dest) {
  return gulp.src(src)
    .pipe($.template({
      nameUC: firstUC(name),
      nameLC: firstLC(name),
      namePlural: plural(name),
      nameSingularUC: firstUC(singular(name)),
      defField: getDefFieldFromArgv()
    }, {
      interpolate: /<%=([\s\S]+?)%>/g
    }))
    .pipe($.rename(path => {
      path.basename = getFileName(singular(name), path.basename);
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
    }, {
      interpolate: /<%=([\s\S]+?)%>/g
    }))
    .pipe($.rename(path => {
      path.basename = getFileName(singular(name), path.basename);
    }))
    .pipe(gulp.dest(dest));
}

function getFileName(name, basename) {

  if (basename.includes('namePlural')) {
    return basename.replace('namePlural', plural(name));
  } else if (basename.includes('nameSingular')) {
    return basename.replace('nameSingular', singular(name));
  } else if (basename.includes('nameUC')) {
    return basename.replace('nameUC', firstUC(name));
  } else {
    return basename.replace('name', name);
  }
}
