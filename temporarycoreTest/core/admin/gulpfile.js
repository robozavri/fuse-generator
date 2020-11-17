'use strict';
var gulp = require('gulp');
var babel = require('gulp-babel');
var es2015 = require('babel-preset-es2015');
var _ = require('lodash');
var $ = require('gulp-load-plugins')();
var argv = $.util.env;
var log = $.util.log;
var colors = $.util.colors;

require('babel-register')({
  presets: [es2015],
  // "plugins": ["dynamic-import-node"]
});

require('require-dir')('./gulp/tasks');


gulp.task('babel', function() {

  let dir = argv.directory || argv.d;

  if(!dir) {
    return;
  }

  if (_.endsWith(dir, '.js')) {
    log(colors.red('Error: dir parameter must be directory'));
    process.exit(1);
  }

  if(dir) {    
    if (!_.endsWith(dir, '/')) {
      dir = dir + '/fields.js';
    } else {
      dir = dir + 'fields.js';
    }
  }
  
  return gulp.src(dir)
  .pipe(babel({
      presets: [es2015]
  }))
  .pipe(gulp.dest('./gulp/dist'));


    // return gulp.src('C:/Users/pc/Desktop/gulpFIleGenerator/fields.js')
    // .pipe(babel({
    //     presets: [es2015]
    // }))
    // .pipe(gulp.dest('./gulp/dist'));
});

/*
require('require-dir')('./gulp/tasks');

// function defaultTask(cb) {
//   // place code for your default task here
//   console.log('wowo works');
//   cb();
// }
gulp.task('default', function () { 
  console.log('Hello Gulp!') 
});

// exports.default = defaultTask
*/