'use strict';

import gulp from 'gulp';
import * as _ from 'lodash';
import axios from 'axios';
import ApiGenerator from './api/api-generator';
import { getModuleId } from '../helpers';
const $ = require('gulp-load-plugins')();

gulp.task('generate', (done) => {
  const moduleId = getModuleId();

  axios.post('http://localhost:4002/api/modules/fields', {
    _id: moduleId,
  })
  .then(function (response) {
    const { data } = response;
   
    if (!data) {
      throw 'ERROR: Did not recived data from api';
    }
    const apiGenerator = new ApiGenerator(data);
    apiGenerator.startGenerate();
  })
  .catch(function (error) {
    console.log(error);
  });
});