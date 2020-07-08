'use strict';

import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import paths from '../paths';
import {getNameFromArgv, getDefFieldFromArgv, getDirFromArgv, firstUC, firstLC, plural} from '../helpers';
const $ = require('gulp-load-plugins')();
const argv = $.util.env;


gulp.task('api', (done) => {
  runSequence('generateApi', 'generateStub', 'inject', done);
});

gulp.task('generateApi', () => {
  const name = getNameFromArgv();
  const dir = getDirFromArgv();
  const src = paths.generatorTemplates.api;
  const dest = path.join(paths.server.src, 'api' + (dir ? '/' + dir : ''), plural(name));
  return insertTemplates(name, src, dest, true);
});

gulp.task('generateStub', () => {
  const name = getNameFromArgv();
  const src = paths.generatorTemplates.stub;
  const dest = path.join(paths.server.src, 'stubs');
  return insertTemplates(name, src, dest, true);
});

function insertTemplates(name, src, dest, defFieldIncluded) { 
  return gulp.src(src)
    .pipe($.template({
      nameUC: firstUC(name),
      nameLC: firstLC(name),
      namePlural: plural(name),
      defField: defFieldIncluded ? getDefFieldFromArgv() : null
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
