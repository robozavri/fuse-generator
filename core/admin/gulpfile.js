'use strict';
var gulp = require('gulp');
require('babel-register')({
  presets: ['es2015']
});
require('require-dir')('./gulp/tasks');
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